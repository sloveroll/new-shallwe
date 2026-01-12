import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users_sns } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userIdx } = body;

    if (!userIdx) {
      return NextResponse.json(
        { error: "Missing userIdx" },
        { status: 400 }
      );
    }

    // Delete the YouTube link for this user
    await db
      .delete(users_sns)
      .where(
        and(
          eq(users_sns.user_idx, userIdx),
          eq(users_sns.provider_type, "youtube")
        )
      );

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("YouTube Disconnect Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
