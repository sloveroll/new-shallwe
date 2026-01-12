// components/my-page/ChannelLinkedCard.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  platform: "Youtube" | "Instagram" | "Blog";
  nickname: string;
  items: { label: string; desc: string }[];
  onRemove?: () => void;
};

export default function ChannelLinkedCard({
  platform,
  nickname,
  items,
  onRemove,
}: Props) {
  const processingCodeRef = useRef<string | null>(null);

  const platformConfig = {
    Youtube: {
      badge: "/images/my-page/ic-youtube.png",
    },
    Instagram: {
      badge: "/images/my-page/ic-instagram.png",
    },
    Blog: {
      badge: "/images/my-page/ic-blog.png",
    },
  }[platform];

  useEffect(() => {
    // Listen for messages from the popup
    const handleMessage = (event: MessageEvent) => {
      // Security check: Accept messages from our own origin
      if (event.origin !== window.location.origin) return;

      // Only the Instagram card should handle Instagram auth events
      if (platform !== "Instagram") return;

      if (event.data?.type === "INSTAGRAM_AUTH_SUCCESS") {
        const { code } = event.data;
        // Prevent double submission (React Strict Mode or fast events)
        if (processingCodeRef.current === code) return;
        processingCodeRef.current = code;

        handleServerExchange(code);
      } else if (event.data?.type === "INSTAGRAM_AUTH_ERROR") {
        alert(`인스타그램 연동 실패: ${event.data.error}`);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleServerExchange = async (code: string) => {
    try {
      const res = await fetch("/api/sns/instagram/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code,
          redirect_uri: window.location.origin + "/instagram/callback",
          userIdx: 1, // TODO: Replace with actual User Context
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(
          `인스타그램 연동 성공: ${data.username}\n\nToken: ${data.accessToken}`
        );
        window.location.reload();
      } else {
        if (data.error === "No connected Instagram Business Account found.") {
          alert(
            "연동된 인스타그램 비즈니스 계정을 찾을 수 없습니다.\n\n인스타그램 설정에서 '프로페셔널 계정'으로 전환하고,\n페이스북 페이지와 연결한 뒤 다시 시도해주세요."
          );
        } else {
          const tokenMsg = data.accessToken
            ? `\n\nToken: ${data.accessToken}`
            : "";
          alert(`연동 실패: ${data.error || "알 수 없는 오류"}${tokenMsg}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  const handleConnect = () => {
    if (platform === "Instagram") {
      if (!process.env.NEXT_PUBLIC_FACEBOOK_APP_ID) {
        alert(
          "NEXT_PUBLIC_FACEBOOK_APP_ID가 설정되지 않았습니다! .env.local 파일을 확인해주세요."
        );
        return;
      }

      // Popup Flow
      const redirectUri =
        typeof window !== "undefined"
          ? window.location.origin + "/instagram/callback"
          : "";

      // Facebook Business Login (Popup Flow)
      // Note: We use 'config_id' which bundles the permissions (instagram_business_basic, insights, etc.)
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        redirect_uri: redirectUri,
        // config_id: process.env.NEXT_PUBLIC_FACEBOOK_CONFIG_ID || "", // Config ID causing issues?
        scope:
          "pages_show_list,instagram_basic,pages_read_engagement,business_management",
        response_type: "code",
      });

      const url = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;

      // Calculate center position for popup
      const width = 600;
      const height = 800;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      window.open(
        url,
        "instagram_oauth",
        `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no`
      );
    } else {
      alert("해당 플랫폼 연동 기능은 준비 중입니다.");
    }
  };

  const handleDisconnect = async () => {
    if (!confirm("정말 인스타그램 연동을 해제하시겠습니까?")) return;

    try {
      const res = await fetch("/api/sns/instagram/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIdx: 1, // TODO: Replace with actual User Context
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("인스타그램 연동이 해제되었습니다.");
        window.location.reload();
      } else {
        alert(`해제 실패: ${data.error || "알 수 없는 오류"}`);
      }
    } catch (err) {
      console.error(err);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="mb-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
      {/* --- Row 1: 플랫폼 배지 + 해제 버튼 --- */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            src={platformConfig.badge}
            alt={platform}
            width={60}
            height={18}
            className="h-[18px] w-auto"
          />
        </div>

        {/* Connection Management Buttons */}
        <div className="flex gap-2">
          {/* Show Connect button if likely not connected (nickname is empty?) or logic based on props */}
          {/* Assuming for now we show both for demo as user requested "Enable button" */}
          <button
            onClick={handleConnect}
            className="
                rounded-md border border-[#ccc] 
                px-3 py-[3px]
                text-[11px] text-[#666]
              "
          >
            연동
          </button>

          <button
            onClick={handleDisconnect}
            className="
                rounded-md border border-[#ccc] 
                px-3 py-[3px]
                text-[11px] text-[#666]
              "
          >
            해제
          </button>
        </div>
      </div>

      {/* --- Row 2: 플랫폼 공통 로고 + 채널명 --- */}
      <div className="mb-3 flex items-center gap-2">
        <Image
          src="/images/common/ic-lookinglogo.png"
          alt="logo"
          width={15}
          height={15}
        />

        <span className="text-[15px] font-semibold text-[#333]">
          {nickname || "미연동"}
        </span>
      </div>

      {/* --- Row 3+: 카테고리 설명 --- */}
      <div className="border-t mb-2"></div>
      <div className="space-y-2 text-[12px] leading-[1.45]">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span>{item.label}</span>
            <span className="text-right">
              <b>{item.desc}</b>
            </span>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-[#aaa] py-2">
            연동된 정보가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
