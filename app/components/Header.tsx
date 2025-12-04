"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
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

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/search")) {
    return null;
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#fff",
        transition: "all 0.2s ease",
      }}
    >
      {/* 로고 + 문구 */}
      <div style={{ padding: isCompact ? "8px 20px" : "16px 20px 0px" }}>
        <Image
          src={isCompact ? "/images/scroll-logo.png" : "/images/main-logo.svg"}
          width={isCompact ? 150 : 420}
          height={100}
          alt="Shallwe Logo"
          style={{
            width: isCompact ? "150px" : "100%",
            height: "auto",
            transition: "all 0.2s ease",
          }}
        />

        {!isCompact && (
          <p
            style={{
              marginTop: "8px",
              marginBottom: "24px",
              fontSize: "14px",
              color: "#555",
              lineHeight: 1.4,
            }}
          >
            마이크로 인플루언서의{" "}
            <span style={{ fontWeight: 700 }}>올인원 협업 플랫폼</span>
          </p>
        )}
      </div>

      {/* 네비 */}
      <nav
        style={{
          display: "flex",
          gap: "16px",
          padding: "4px 20px 12px",
          fontSize: "14px",
        }}
      >
        <button
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontWeight: mainTab === "home" ? 700 : 400,
            color: mainTab === "home" ? "#000" : "#888",
            borderBottom:
              mainTab === "home" ? "2px solid #000" : "2px solid transparent",
            paddingBottom: "2px",
          }}
          onClick={() => setMainTab("home")}
        >
          Home
        </button>

        <button
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontWeight: mainTab === "youtube" ? 700 : 400,
            color: mainTab === "youtube" ? "#000" : "#888",
            borderBottom:
              mainTab === "youtube"
                ? "2px solid #000"
                : "2px solid transparent",
            paddingBottom: "2px",
          }}
          onClick={() => setMainTab("youtube")}
        >
          Youtube
        </button>

        <button
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontWeight: mainTab === "instagram" ? 700 : 400,
            color: mainTab === "instagram" ? "#000" : "#888",
            borderBottom:
              mainTab === "instagram"
                ? "2px solid #000"
                : "2px solid transparent",
            paddingBottom: "2px",
          }}
          onClick={() => setMainTab("instagram")}
        >
          Instagram
        </button>

        <button
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontWeight: mainTab === "blog" ? 700 : 400,
            color: mainTab === "blog" ? "#000" : "#888",
            borderBottom:
              mainTab === "blog" ? "2px solid #000" : "2px solid transparent",
            paddingBottom: "2px",
          }}
          onClick={() => setMainTab("blog")}
        >
          Blog
        </button>

        <button
          style={{
            marginLeft: "auto",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={() => router.push("/search")}
        >
          <Image
            src="/images/search-icon.png"
            width={16}
            height={16}
            alt="검색"
          />
        </button>
      </nav>
    </header>
  );
}
