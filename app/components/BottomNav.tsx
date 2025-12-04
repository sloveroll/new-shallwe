"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

  const tabs = [
    { href: "/", label: "홈", icon: "/images/bottom-my-home.png" },
    { href: "/my-cash", label: "내 캐시", icon: "/images/bottom-my-cash.png" },
    { href: "/my-collab", label: "내 협업", icon: "/images/bottom-my-collab.png", },
    { href: "/my-alerts", label: "알림", icon: "/images/bottom-my-alerts.png" },
    { href: "/my-page", label: "내 정보", icon: "/images/bottom-my-page.png" },
  ];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        borderTop: "1px solid #eee",
        background: "#fff",
        padding: "8px 0 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontSize: "11px",
        }}
      >
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                textDecoration: "none",
                color: active ? "#000" : "#999", // 텍스트 색
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={17}
                  height={17}
                  style={{
                    display: "block",
                    margin: "0 auto 4px",
                    filter: active
      ? "brightness(0) saturate(100%)" // 선택됨 = 검정 강조
      : "brightness(0) saturate(30%) opacity(0.3)", // 선택안됨도 동일 색 기반
                    transition: "opacity 0.2s ease",
                  }}
                />

                {/* 라벨 */}
                <div
                  style={{
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {tab.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
