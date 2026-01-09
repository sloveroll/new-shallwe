import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust path if needed
import { users_sns } from "@/lib/schema";
import { eq, and, ne, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessToken, userIdx } = body;

    if (!accessToken || !userIdx) {
      return NextResponse.json(
        { error: "Missing accessToken or userIdx" },
        { status: 400 }
      );
    }

    // 1. Instagram Graph API Call
    // Get Pages with Instagram Business Account
    const graphUrl = `https://graph.facebook.com/v19.0/me/accounts?fields=instagram_business_account{id,username,name,followers_count,media_count},id,name,access_token&access_token=${accessToken}`;
    
    const response = await fetch(graphUrl);
    const data = await response.json();

    if (!data || data.error) {
      console.error("Graph API Error:", data.error);
      return NextResponse.json(
        { error: "Instagram API Error", details: data.error },
        { status: 500 }
      );
    }

    // Find the first page with a connected Instagram Business Account
    const pageItem = data.data?.find((item: any) => item.instagram_business_account);

    if (!pageItem) {
      return NextResponse.json(
        { error: "No connected Instagram Business Account found." },
        { status: 404 }
      );
    }

    const meta_asid = data.id; // Facebook User ID
    const { instagram_business_account, id: facebookPageId } = pageItem;
    const { id: instagramId, username, followers_count, media_count } = instagram_business_account;

    // 2. Check for duplication (Legacy Logic)
    // Check if THIS instagram account is already linked by ANOTHER user
    const existing = await db
      .select({ count: sql<number>`count(*)` })
      .from(users_sns)
      .where(
        and(
          ne(users_sns.user_idx, userIdx),
          eq(users_sns.provider_type, "instagram"),
          eq(users_sns.provider_user_id, instagramId)
        )
      );

    if (existing[0].count > 0) {
      return NextResponse.json(
        { error: "Already registered by another user." },
        { status: 409 }
      );
    }

    // 3. Upsert Logic (Insert or Update)
    // Check if current user already has this integration?
    // Legacy logic updates or inserts based on user_idx + provider_type (ONLY ONE IG per user allowed in legacy logic?)
    // "SELECT user_idx FROM users_sns WHERE user_idx = ? AND provider_type = ?"
    
    const userSns = await db
      .select()
      .from(users_sns)
      .where(
        and(
            eq(users_sns.user_idx, userIdx),
            eq(users_sns.provider_type, "instagram")
        )
      );

    if (userSns.length === 0) {
      // INSERT
      await db.insert(users_sns).values({
        user_idx: userIdx,
        provider_type: "instagram",
        provider_name: username,
        provider_user_id: instagramId,
        sns_facebook_id: facebookPageId,
        sns_token: accessToken,
        follow_count: followers_count,
        post_count: media_count,
        meta_asid: meta_asid,
      });
    } else {
      // UPDATE
      await db
        .update(users_sns)
        .set({
            provider_name: username,
            provider_user_id: instagramId,
            sns_facebook_id: facebookPageId,
            sns_token: accessToken,
            follow_count: followers_count,
            post_count: media_count,
            meta_asid: meta_asid,
            up_date: new Date(),
        })
        .where(
            and(
                eq(users_sns.user_idx, userIdx),
                eq(users_sns.provider_type, "instagram")
            )
        );
    }

    return NextResponse.json({ success: true, username, instagramId });

  } catch (error: any) {
    console.error("Connect Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
