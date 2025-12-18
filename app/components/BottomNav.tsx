"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { useMainTab } from "../MainTabContext";

const tabs = [
  { href: "/", label: "홈", icon: "/images/gnb/bottom-my-home.png", isHome: true },
  { href: "/my-cash", label: "내 캐시", icon: "/images/gnb/bottom-my-cash.png", isHome: false },
  { href: "/my-collab", label: "내 협업", icon: "/images/gnb/bottom-my-collab.png", isHome: false },
  { href: "/my-alerts", label: "알림", icon: "/images/gnb/bottom-my-alerts.png", isHome: false },
  { href: "/my-page", label: "내 정보", icon: "/images/gnb/bottom-my-page.png", isHome: false },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { mainTab, setMainTab } = useMainTab();

  // 홈 페이지로 이동하면 mainTab을 "home"으로 리셋
  useEffect(() => {
    if (pathname === "/") {
      setMainTab("home");
    }
  }, [pathname, setMainTab]);

  const handleHomeClick = (e: React.MouseEvent) => {
    // 홈 버튼 클릭 시 항상 mainTab을 "home"으로 설정
    setMainTab("home");
    
    // 이미 홈 페이지에 있으면 기본 링크 동작 방지
    if (pathname === "/") {
      e.preventDefault();
    }
  };

  return (
    <nav
      className="
        fixed left-1/2 bottom-0
        -translate-x-1/2
        w-full max-w-[530px] 
        border-t border-[#eee]
        bg-white
        py-2 pb-2.5
      "
    >
      <div
        className="
          flex justify-around items-center
          text-[11px]
        "
      >
        {tabs.map((tab) => {
          const active = tab.isHome 
            ? pathname === tab.href && mainTab === "home"
            : pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={tab.isHome ? handleHomeClick : undefined}
              className={`
                no-underline flex flex-col items-center
                ${active ? "text-black" : "text-[#999]"}
              `}
            >
              <div className="h-[20px] flex items-center justify-center mb-1">
                <Image
                  src={
                    active
                      ? tab.icon.replace(".png", "_selected.png")
                      : tab.icon
                  }
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="w-auto h-full max-h-[20px] block"
                />
              </div>

              {/* 라벨 */}
              <div className={active ? "font-bold" : "font-normal"}>
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
