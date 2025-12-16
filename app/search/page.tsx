"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

const STORAGE_KEY = "shallwe_recent_keywords";
const MAX_KEYWORDS = 10; // 최대 저장 개수

export default function SearchPage() {
  const router = useRouter();
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const keywords = JSON.parse(stored);
        setRecentKeywords(Array.isArray(keywords) ? keywords : []);
      } catch (e) {
        setRecentKeywords([]);
      }
    }
  }, []);

  // 검색어 저장 함수
  const saveKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    const trimmedKeyword = keyword.trim();
    setRecentKeywords((prev) => {
      // 중복 제거 (기존 항목 제거 후 맨 앞에 추가)
      const filtered = prev.filter((k) => k !== trimmedKeyword);
      const updated = [trimmedKeyword, ...filtered].slice(0, MAX_KEYWORDS);
      
      // localStorage에 저장
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // 검색 실행
  const handleSearch = (keyword?: string) => {
    const searchTerm = keyword || searchInput.trim();
    if (!searchTerm) return;

    saveKeyword(searchTerm);
    setSearchInput("");
    
    // TODO: 실제 검색 API 호출
    console.log("검색:", searchTerm);
    // router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 최근 검색어 클릭
  const handleKeywordClick = (keyword: string) => {
    handleSearch(keyword);
  };

  // 개별 검색어 삭제
  const handleDeleteKeyword = (keyword: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 버블링 방지
    setRecentKeywords((prev) => {
      const updated = prev.filter((k) => k !== keyword);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // 전체 삭제
  const handleClearAll = () => {
    setRecentKeywords([]);
    localStorage.removeItem(STORAGE_KEY);
  };

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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="캠페인 키워드 검색"
              className="
                flex-1
                border-0 outline-none
                text-[14px]
              "
            />
            <button
              type="button"
              onClick={() => handleSearch()}
              className="border-0 bg-transparent cursor-pointer p-0"
            >
              <Image
                src="/images/search-icon.png"
                alt="검색"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>

        {/* 최근 검색어 타이틀 */}
        {recentKeywords.length > 0 && (
          <>
            <div
              className="
                flex items-center justify-between
                mb-[12px]
                text-[14px]
              "
            >
              <span className="font-semibold">최근 검색어</span>
              <button
                onClick={handleClearAll}
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
                <div
                  key={`${word}-${idx}`}
                  onClick={() => handleKeywordClick(word)}
                  className="
                    relative
                    px-[14px] py-[6px]
                    pr-[28px]
                    rounded-full
                    border border-[#ccc]
                    bg-white
                    text-[13px]
                    cursor-pointer
                    hover:bg-[#f5f5f5]
                  "
                >
                  {word}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteKeyword(word, e)}
                    className="
                      absolute right-[8px] top-1/2 -translate-y-1/2
                      w-[16px] h-[16px]
                      flex items-center justify-center
                      border-0 bg-transparent
                      text-[#999] text-[12px]
                      cursor-pointer
                      hover:text-[#333]
                    "
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
