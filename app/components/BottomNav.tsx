"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const tabs = [
  { href: "/", label: "홈", icon: "/images/bottom-my-home.png" },
  { href: "/my-cash", label: "내 캐시", icon: "/images/bottom-my-cash.png" },
  { href: "/my-collab", label: "내 협업", icon: "/images/bottom-my-collab.png" },
  { href: "/my-alerts", label: "알림", icon: "/images/bottom-my-alerts.png" },
  { href: "/my-page", label: "내 정보", icon: "/images/bottom-my-page.png" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed left-1/2 bottom-0
        -translate-x-1/2
        w-full max-w-[430px]
        border-t border-[#eee]
        bg-white
        py-2 pb-2.5
      "
    >
      <div
        className="
          flex justify-around
          text-[11px]
        "
      >
        {tabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                no-underline
                ${active ? "text-black" : "text-[#999]"}
              `}
            >
              <div className="text-center">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={17}
                  height={17}
                  className={`
                    block mx-auto mb-1
                    transition-opacity duration-200
                    ${active
                      ? "filter brightness-[0] saturate-[100%]"
                      : "filter brightness-[0] saturate-[30%] opacity-30"
                    }
                  `}
                />

                {/* 라벨 */}
                <div className={active ? "font-bold" : "font-normal"}>
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
