import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users_sns } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    // TODO: In a real app, verify authentication via Session/JWT
    const body = await req.json();
    const { userIdx } = body;

    if (!userIdx) {
      return NextResponse.json(
        { error: "User Index is required" },
        { status: 400 }
      );
    }

    const result = await db
      .delete(users_sns)
      .where(
        and(
          eq(users_sns.user_idx, userIdx),
          eq(users_sns.provider_type, "naver_blog")
        )
      );

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Disconnect Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
