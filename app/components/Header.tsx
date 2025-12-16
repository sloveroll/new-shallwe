"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMainTab } from "../MainTabContext";

export default function Header() {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const router = useRouter();
  const { mainTab, setMainTab } = useMainTab();

  useEffect(() => {
    const ON = 200;
    const OFF = 40;

    const handleScroll = () => {
      const y = window.scrollY;

      setIsCompact((prev) => {
        if (!prev && y > ON) return true;
        if (prev && y < OFF) return false;
        return prev;
      });
    };

    handleScroll(); // 초기 상태 한 번 계산
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  if (pathname.startsWith("/search")) {
    return null;
  }

   return (
    <header
      className="
        bg-white
        transition-all duration-200 ease-in-out
      "
    >
      {/* 로고 + 문구 */}
      <div className={isCompact ? "px-5 py-2" : "px-5 pt-4 pb-0"}>
        <Image
          src={isCompact ? "/images/scroll-logo.png" : "/images/main-logo.svg"}
          width={isCompact ? 150 : 420}
          height={100}
          alt="Shallwe Logo"
          className={`
            h-auto
            transition-all duration-200 ease-in-out
            ${isCompact ? "w-[150px]" : "w-full"}
          `}
        />

        {!isCompact && (
          <p className="mt-2 mb-6 text-sm text-[#555] leading-snug">
            마이크로 인플루언서의{" "}
            <span className="font-bold">올인원 협업 플랫폼</span>
          </p>
        )}
      </div>

      {/* 네비 */}
      <nav
        className="
          flex
          gap-4
          px-5 pt-1 pb-3
          text-sm
        "
      >
        <button
          type="button"
          onClick={() => setMainTab("youtube")}
          className={`
            border-0 bg-transparent cursor-pointer
            pb-0.5
            ${
              mainTab === "youtube"
                ? "font-bold text-black border-b-2 border-[#AFFF33]"
                : "font-normal text-[#888] border-b-2 border-transparent"
            }
          `}
        >
          Youtube
        </button>

        <button
          type="button"
          onClick={() => setMainTab("instagram")}
          className={`
            border-0 bg-transparent cursor-pointer
            pb-0.5
            ${
              mainTab === "instagram"
                ? "font-bold text-black border-b-2 border-[#AFFF33]"
                : "font-normal text-[#888] border-b-2 border-transparent"
            }
          `}
        >
          Instagram
        </button>

        <button
          type="button"
          onClick={() => setMainTab("blog")}
          className={`
            border-0 bg-transparent cursor-pointer
            pb-0.5
            ${
              mainTab === "blog"
                ? "font-bold text-black border-b-2 border-[#AFFF33]"
                : "font-normal text-[#888] border-b-2 border-transparent"
            }
          `}
        >
          Blog
        </button>

        <button
          type="button"
          onClick={() => router.push("/search")}
          className="
            ml-auto
            border-0 bg-transparent cursor-pointer
          "
        >
          <Image
            src="/images/search-icon.png"
            width={16}
            height={16}
            alt="검색"
            className="w-4 h-4"
          />
        </button>
      </nav>
    </header>
  );
}
