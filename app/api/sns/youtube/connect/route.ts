import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users_sns } from "@/lib/schema";
import { eq, and, ne, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  let tokens: { access_token?: string; refresh_token?: string } = {};
  
  try {
    const body = await req.json();
    const { code, userIdx, redirect_uri } = body;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!code || !userIdx || !redirect_uri) {
        return NextResponse.json(
            { error: "Missing required parameters (code, userIdx, redirect_uri)" },
            { status: 400 }
        );
    }
    
    if (!clientId || !clientSecret) {
        return NextResponse.json(
             { error: "Server Configuration Error: Google Client ID/Secret missing" },
             { status: 500 }
        );
    }

    // 1. Exchange Code for Access Token & Refresh Token
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const tokenParams = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    });

    const tokenRes = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams,
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error("Google Token Error:", tokenData);
      return NextResponse.json(
        { error: "Failed to get access token", details: tokenData.error_description || tokenData.error },
        { status: 400 }
      );
    }

    const { access_token, refresh_token } = tokenData;
    tokens = { access_token, refresh_token };

    // 2. Get YouTube Channel Info (mine=true)
    // https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true
    const channelUrl = "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true";
    const channelRes = await fetch(channelUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    const channelData = await channelRes.json();
    
    if (channelData.error) {
         console.error("YouTube Channel Error:", channelData);
         return NextResponse.json(
            { error: "Failed to fetch YouTube channel", details: channelData.error.message, tokens },
            { status: 400 }
         );
    }

    const items = channelData.items;
    if (!items || items.length === 0) {
         return NextResponse.json(
            { error: "No YouTube channel found for this Google account.", tokens },
            { status: 404 }
         );
    }

    const channel = items[0];
    const channelId = channel.id;
    const title = channel.snippet?.title;
    const description = channel.snippet?.description;
    const thumbnail = channel.snippet?.thumbnails?.default?.url;
    
    // Statistics
    const subscriberCount = parseInt(channel.statistics?.subscriberCount || "0", 10);
    const videoCount = parseInt(channel.statistics?.videoCount || "0", 10);
    // viewCount is also available: channel.statistics?.viewCount

    // 3. Check for Duplication
    const existing = await db
      .select({ count: sql<number>`count(*)` })
      .from(users_sns)
      .where(
        and(
          ne(users_sns.user_idx, userIdx),
          eq(users_sns.provider_type, "youtube"),
          eq(users_sns.provider_user_id, channelId)
        )
      );

    if (existing[0].count > 0) {
      return NextResponse.json(
        { error: "Already registered by another user.", tokens },
        { status: 409 }
      );
    }

    // 4. Upsert Logic
    const userSns = await db
      .select()
      .from(users_sns)
      .where(
        and(
            eq(users_sns.user_idx, userIdx),
            eq(users_sns.provider_type, "youtube")
        )
      );

    const commonValues = {
        provider_name: title, // Channel Name
        provider_user_id: channelId, // Channel ID
        sns_token: refresh_token || access_token, // Store refresh token if available, else access token (Note: access token is short lived)
        
        follow_count: subscriberCount,
        post_count: videoCount,
        sns_facebook_id: null, // Not used for YT
        meta_asid: null // Not used for YT
    };
    
    if (userSns.length === 0) {
      // INSERT
      await db.insert(users_sns).values({
        user_idx: userIdx,
        provider_type: "youtube",
        ...commonValues,
        sns_token: refresh_token || access_token, // Preference
        in_date: new Date(),
        up_date: new Date()
      });
    } else {
      // UPDATE
      
      const newToken = refresh_token || access_token;
      
      await db
        .update(users_sns)
        .set({
            ...commonValues,
            sns_token: newToken, 
            up_date: new Date(),
        })
        .where(
            and(
                eq(users_sns.user_idx, userIdx),
                eq(users_sns.provider_type, "youtube")
            )
        );
    }

    return NextResponse.json({ success: true, channelName: title, channelId, tokens });

  } catch (error: any) {
    console.error("YouTube Connect Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message, tokens },
      { status: 500 }
    );
  }
}
