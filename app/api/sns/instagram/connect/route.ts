import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust path if needed
import { users_sns } from "@/lib/schema";
import { eq, and, ne, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  let accessToken = "";
  try {
    const body = await req.json();
    const { code, userIdx, redirect_uri } = body;

    if (!code || !userIdx || !redirect_uri) {
      return NextResponse.json(
        { error: "Missing code, userIdx, or redirect_uri" },
        { status: 400 }
      );
    }

    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Missing config: APP_ID or CLIENT_SECRET");
      return NextResponse.json(
        { error: "Server Configuration Error" },
        { status: 500 }
      );
    }

    // 1. Exchange Code for Short-Lived Access Token
    const redirectUri = redirect_uri; // Using variable for clarity

    // 1. Exchange Code for Short-Lived Access Token
    const shortTokenParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      code: code,
    });
    
    const shortTokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?${shortTokenParams.toString()}`;
    const shortTokenRes = await fetch(shortTokenUrl);
    const shortTokenData = await shortTokenRes.json();

    if (shortTokenData.error) {
      console.error("Short Token Error:", shortTokenData.error);
      return NextResponse.json(
        { 
          error: "Failed to get access token", 
          details: shortTokenData.error,
          // Sending more info for client debugging
          debug_message: shortTokenData.error.message || JSON.stringify(shortTokenData.error)
        },
        { status: 400 }
      );
    }

    const shortLivedAccessToken = shortTokenData.access_token;

    // 2. Exchange Short-Lived Token for Long-Lived Access Token
    const longTokenParams = new URLSearchParams({
      grant_type: "fb_exchange_token",
      client_id: clientId,
      client_secret: clientSecret,
      fb_exchange_token: shortLivedAccessToken,
    });

    const longTokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?${longTokenParams.toString()}`;
    const longTokenRes = await fetch(longTokenUrl);
    const longTokenData = await longTokenRes.json();

    if (longTokenData.error) {
      console.error("Long Token Error:", longTokenData.error);
      return NextResponse.json(
        { 
          error: "Failed to exchange for long-lived token", 
          details: longTokenData.error,
          debug_message: longTokenData.error.message 
        },
        { status: 400 }
      );
    }

    accessToken = longTokenData.access_token;

    // 3. Instagram Graph API Call (Get Pages)
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

    // Get the User ID from /me
    const meUrl = `https://graph.facebook.com/v19.0/me?access_token=${accessToken}`;
    const meRes = await fetch(meUrl);
    const meData = await meRes.json();

    // Safety check for ID
    const meta_asid = meData?.id; 
    
    if (!meta_asid) {
       console.warn("Facebook User ID not found in meData", meData);
    }

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
    
    // ... (Use existing select logic)
    const userSns = await db
      .select()
      .from(users_sns)
      .where(
        and(
            eq(users_sns.user_idx, userIdx),
            eq(users_sns.provider_type, "instagram")
        )
      );

    const commonValues = {
        provider_name: username,
        provider_user_id: instagramId,
        sns_facebook_id: facebookPageId,
        sns_token: accessToken,
        follow_count: followers_count,
        post_count: media_count,
        meta_asid: meta_asid || null, // Ensure null if undefined
    };

    if (userSns.length === 0) {
      // INSERT
      await db.insert(users_sns).values({
        user_idx: userIdx,
        provider_type: "instagram",
        ...commonValues,
        in_date: new Date(),
        up_date: new Date()
      });
    } else {
      // UPDATE
      await db
        .update(users_sns)
        .set({
            ...commonValues,
            up_date: new Date(),
        })
        .where(
            and(
                eq(users_sns.user_idx, userIdx),
                eq(users_sns.provider_type, "instagram")
            )
        );
    }

    return NextResponse.json({ success: true, username, instagramId, accessToken });

  } catch (error: any) {
    console.error("Connect Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message, accessToken },
      { status: 500 }
    );
  }
}
