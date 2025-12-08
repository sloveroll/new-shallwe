"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();

  const recentKeywords = ["더마비", "AHC", "토니모리", "토니모리"];

  return (
    <main>
      <section className="px-[20px] pt-[12px] pb-[80px]">
        {/* 상단 검색바 영역 */}
        <div className="flex items-center mb-[20px]">
          {/* 뒤로가기 */}
          <button
            onClick={() => router.back()}
            className="
              border-0 bg-transparent cursor-pointer
              mr-[8px]
              text-[18px]
            "
          >
            ←
          </button>

          {/* 검색 인풋 + 돋보기 */}
          <div
            className="
              flex items-center flex-1
              rounded-full
              border border-[#ccc]
              px-[10px] py-[6px]
              bg-white
            "
          >
            <input
              type="text"
              placeholder="캠페인 키워드 검색"
              className="
                flex-1
                border-0 outline-none
                text-[14px]
              "
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
          className="
            flex items-center justify-between
            mb-[12px]
            text-[14px]
          "
        >
          <span className="font-semibold">최근 검색어</span>
          <button
            className="
              border-0 bg-transparent cursor-pointer
              text-[12px] text-[#888]
            "
          >
            전체 삭제
          </button>
        </div>

        {/* 최근 검색어 칩 */}
        <div className="flex flex-wrap gap-[8px]">
          {recentKeywords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              className="
                px-[14px] py-[6px]
                rounded-full
                border border-[#ccc]
                bg-white
                text-[13px]
                cursor-pointer
              "
            >
              {word}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
