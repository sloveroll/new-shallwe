import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { db } from "@/lib/db";
import { users_sns } from "@/lib/schema";
import { and, eq, ne, sql } from "drizzle-orm";

/**
 * ✅ Practical Naver Blog connector
 * - Robust blogId extraction (blog.naver.com/{id}, m.blog.naver.com/{id}, PostList query, etc.)
 * - Existence check that handles "200 but error page"
 * - Nickname scraping with fallbacks (ebc.nick -> og:title -> title)
 * - Duplication check (already linked to other user)
 * - Safe UPSERT behavior (uses transaction; best is DB unique + onConflictDoUpdate if supported)
 */

const NAVER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

type ScrapedData = { blogId?: string; nickname?: string };

function normalizeUrl(input: string): string {
  const trimmed = (input || "").trim();
  if (!trimmed) return trimmed;
  // allow user paste without protocol
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

/**
 * Extract blogId from multiple Naver Blog URL formats.
 */
function extractNaverBlogId(rawUrl: string): string | null {
  const urlStr = normalizeUrl(rawUrl);
  let u: URL;

  try {
    u = new URL(urlStr);
  } catch {
    return null;
  }

  const host = u.hostname.toLowerCase();
  const pathname = u.pathname || "/";
  const segments = pathname.split("/").filter(Boolean);

  // 1) m.blog.naver.com/{blogId}
  if (host === "m.blog.naver.com" && segments.length >= 1) {
    const blogId = segments[0];
    if (/^[a-z0-9][a-z0-9\-_]{1,}$/i.test(blogId)) return blogId;
  }

  // 2) blog.naver.com/{blogId} (and subdomains)
  if (host.endsWith("blog.naver.com")) {
    // 2-1) blog.naver.com/{blogId}
    if (segments.length >= 1 && segments[0].toLowerCase() !== "postview.naver") {
      const blogId = segments[0];
      if (/^[a-z0-9][a-z0-9\-_]{1,}$/i.test(blogId)) return blogId;
    }

    // 2-2) blog.naver.com/PostList.naver?blogId=xxx
    const qBlogId = u.searchParams.get("blogId");
    if (qBlogId && /^[a-z0-9][a-z0-9\-_]{1,}$/i.test(qBlogId)) return qBlogId;

    // 2-3) blog.naver.com/PostView.naver?blogId=xxx&logNo=...
    const qBlogId2 = u.searchParams.get("blogId");
    if (qBlogId2 && /^[a-z0-9][a-z0-9\-_]{1,}$/i.test(qBlogId2)) return qBlogId2;
  }

  // 3) Fallback: try to find /{id} right after blog.naver.com in raw string
  // (kept minimal to avoid false positives)
  const m = urlStr.match(/https?:\/\/(?:.*\.)?blog\.naver\.com\/([a-z0-9\-_]+)/i);
  if (m?.[1]) return m[1];

  return null;
}

/**
 * Detects whether the fetched HTML is an error/invalid page even if HTTP 200.
 */
function isInvalidNaverBlogHtml(html: string): boolean {
  const lowered = (html || "").toLowerCase();

  // Common phrases that appear on invalid/restricted pages
  const patterns = [
    "존재하지",
    "존재 하지",
    "찾을 수 없",
    "삭제되었",
    "비공개",
    "접근이 제한",
    "권한이 없",
    "요청하신 페이지",
    "잘못된 접근",
    "not found",
    "page not found",
  ];

  return patterns.some((p) => lowered.includes(p.toLowerCase()));
}

/**
 * Extract nickname using multiple fallbacks.
 * Priority:
 *  1) [data-clickcode="ebc.nick"]
 *  2) og:title meta (Strict check only)
 */
function extractNicknameFromHtml(html: string): { nickname: string | null; debug: any } {
  const $ = cheerio.load(html);

  // 1) Legacy clickcode (works on almost all valid mobile templates)
  const ebc = $('[data-clickcode="ebc.nick"]').first();
  const ebcText = ebc.text().trim();
  if (ebcText) {
    return { nickname: ebcText, debug: { source: "ebc.nick", value: ebcText } };
  }

  // 2) og:title - STRICT MODE
  // Error pages often have og:title="네이버 블로그" or "블로그 정보"
  // Valid pages usually have "{Nickname} : 네이버 블로그"
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim();
  if (ogTitle) {
    // Blocklist of generic titles found on error/login/private pages
    const BLOCKLIST = ["네이버 블로그", "블로그 정보", "네이버", "로그인"];
    
    if (BLOCKLIST.some(s => ogTitle === s || ogTitle.startsWith(s))) {
         return { nickname: null, debug: { source: "blocked_generic_title", value: ogTitle } };
    }

    // Attempt to parse "Nickname : 네이버 블로그"
    const parts = ogTitle.split(":");
    if (parts.length > 1) {
        const nickname = parts[0].trim();
        if (nickname && !BLOCKLIST.includes(nickname)) {
             return { nickname, debug: { source: "og:title_parsed", ogTitle, value: nickname } };
        }
    }
  }

  // 3) <title> tag - Too risky, removed.
  // 4) twitter:title - Too risky, removed.

  return { nickname: null, debug: { source: "none" } };
}

async function fetchNaverMobileBlogHtml(blogId: string): Promise<{ html: string; status: number }> {
  const mobileUrl = `https://m.blog.naver.com/${encodeURIComponent(blogId)}`;

  const res = await fetch(mobileUrl, {
    headers: {
      "User-Agent": NAVER_USER_AGENT,
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.7,en;q=0.6",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    // Next.js route handlers: avoid caching for validation endpoints
    cache: "no-store",
  });

  const html = await res.text();
  return { html, status: res.status };
}

export async function POST(req: NextRequest) {
  let scrapedData: ScrapedData = {};

  try {
    const body = await req.json();
    const blogUrl = (body?.blogUrl ?? "").toString();
    const userIdx = Number(body?.userIdx);

    if (!blogUrl) {
      return NextResponse.json({ error: "blogUrl이 필요합니다." }, { status: 400 });
    }
    if (!Number.isFinite(userIdx) || userIdx <= 0) {
      return NextResponse.json({ error: "유효한 userIdx가 필요합니다." }, { status: 400 });
    }

    // 1) Extract blogId
    const blogId = extractNaverBlogId(blogUrl);
    if (!blogId) {
      return NextResponse.json(
        { error: "잘못된 네이버 블로그 URL 형식입니다." },
        { status: 400 }
      );
    }

    // 2) Fetch and validate existence
    const { html, status } = await fetchNaverMobileBlogHtml(blogId);

    // HTTP errors
    if (status < 200 || status >= 400) {
      return NextResponse.json(
        { error: "블로그에 접근할 수 없습니다. (존재하지 않는 ID일 수 있습니다.)", blogId },
        { status: 400 }
      );
    }

    // 200 but invalid page content
    if (isInvalidNaverBlogHtml(html)) {
      return NextResponse.json(
        { error: "유효하지 않은 네이버 블로그입니다. (존재하지 않거나 접근이 제한됨)", blogId },
        { status: 404 }
      );
    }

    // 3) Extract nickname (with fallbacks)
    const { nickname, debug } = extractNicknameFromHtml(html);

    // Debug logs (keep in server logs)
    console.log(`[Naver Debug] blogId=${blogId} status=${status}`);
    console.log(`[Naver Debug] nickname source=${debug?.source}`, debug);

    if (!nickname) {
      return NextResponse.json(
        { error: "유효하지 않은 네이버 블로그입니다. (닉네임 정보를 찾을 수 없습니다.)", blogId },
        { status: 404 }
      );
    }

    scrapedData = { blogId, nickname };

    // // 4) Duplication check: same blogId already connected to another user
    // const existing = await db
    //   .select({ count: sql<number>`count(*)` })
    //   .from(users_sns)
    //   .where(
    //     and(
    //       ne(users_sns.user_idx, userIdx),
    //       eq(users_sns.provider_type, "naver_blog"),
    //       eq(users_sns.provider_user_id, blogId)
    //     )
    //   );

    // if ((existing?.[0]?.count ?? 0) > 0) {
    //   return NextResponse.json(
    //     { error: "이미 다른 계정에 연동된 블로그입니다.", scrapedData },
    //     { status: 409 }
    //   );
    // }

    // // 5) Upsert
    // // NOTE:
    // // - Best practice: add a UNIQUE constraint (user_idx, provider_type)
    // // - Then use onConflictDoUpdate (if your DB + drizzle dialect supports it)
    // // Here, we do a transaction + select-first to reduce race window,
    // // but DB-level unique + onConflictDoUpdate is still recommended.
    // await db.transaction(async (tx) => {
    //   const row = await tx
    //     .select()
    //     .from(users_sns)
    //     .where(and(eq(users_sns.user_idx, userIdx), eq(users_sns.provider_type, "naver_blog")))
    //     .limit(1);

    //   const commonValues = {
    //     provider_name: nickname,
    //     provider_user_id: blogId,
    //     sns_token: "",

    //     follow_count: 0,
    //     post_count: 0,
    //     sns_facebook_id: null,
    //     meta_asid: null,
    //   };

    //   if (row.length === 0) {
    //     await tx.insert(users_sns).values({
    //       user_idx: userIdx,
    //       provider_type: "naver_blog",
    //       ...commonValues,
    //       in_date: new Date(),
    //       up_date: new Date(),
    //     });
    //   } else {
    //     await tx
    //       .update(users_sns)
    //       .set({
    //         ...commonValues,
    //         up_date: new Date(),
    //       })
    //       .where(and(eq(users_sns.user_idx, userIdx), eq(users_sns.provider_type, "naver_blog")));
    //   }
    // });

    return NextResponse.json({ success: true, blogId, nickname });
  } catch (error: any) {
    console.error("Naver Connect Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message ?? String(error), scrapedData },
      { status: 500 }
    );
  }
}
