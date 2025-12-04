"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();

  const recentKeywords = ["더마비", "AHC", "토니모리", "토니모리"];

  return (
    <main>
      <section style={{ padding: "12px 20px 80px" }}>
        {/* 상단 검색바 영역 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {/* 뒤로가기 */}
          <button
            onClick={() => router.back()}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              marginRight: "8px",
              fontSize: "18px",
            }}
          >
            ←
          </button>

          {/* 검색 인풋 + 돋보기 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              borderRadius: "999px",
              border: "1px solid #ccc",
              padding: "6px 10px",
              background: "#fff",
            }}
          >
            <input
              type="text"
              placeholder="캠페인 키워드 검색"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <Image
              src="/images/search-icon.png"
              alt="검색"
              width={16}
              height={16}
            />
          </div>
        </div>

        {/* 최근 검색어 타이틀 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            fontSize: "14px",
          }}
        >
          <span style={{ fontWeight: 600 }}>최근 검색어</span>
          <button
            style={{
              border: "none",
              background: "transparent",
              fontSize: "12px",
              color: "#888",
              cursor: "pointer",
            }}
          >
            전체 삭제
          </button>
        </div>

        {/* 최근 검색어 칩들 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {recentKeywords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid #ccc",
                background: "#fff",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {word}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
