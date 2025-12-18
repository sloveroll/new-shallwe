'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";

type CampaignItem = {
  id: number;
  type: string;
  dDay: string;
  brand: string;
  product: string;
  total: number;
  current: number;
};

interface SnsCampaignTabProps {
  tabName: "youtube" | "instagram" | "blog";
}

export default function SnsCampaignTab({ tabName }: SnsCampaignTabProps) {
  // 상태 관리
  const [items, setItems] = useState<CampaignItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // 필터 상태
  const [format, setFormat] = useState<string>("쇼츠"); // 기본값
  const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false);
  const formatDropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const dropdownOptions =
    tabName === "instagram"
      ? ["피드", "릴스"]
      : tabName === "blog"
      ? ["포스팅", "정보성"]
      : ["쇼츠", "롱폼"]; // youtube

  // 초기 포맷 설정
  useEffect(() => {
    setFormat(dropdownOptions[0]);
  }, [tabName]);

  // 더미 데이터 로딩
  const loadCampaigns = async (nextPage: number) => {
    if (isLoading) return;

    setIsLoading(true);

    // 시뮬레이션 딜레이
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 더미 데이터 생성
    setItems((prev) => {
      const startIndex = prev.length;
      const newItems: CampaignItem[] = Array.from(
        { length: nextPage === 0 ? 4 : 10 },
        (_, i) => {
          const index = startIndex + i;
          let typeStr = "";
          
          if (tabName === "youtube") {
            typeStr = index % 3 === 0 ? "쇼츠" : "롱폼";
          } else if (tabName === "instagram") {
            typeStr = index % 3 === 0 ? "릴스" : "피드";
          } else {
            typeStr = "블로그";
          }

          return {
            id: index + 1,
            type: typeStr,
            dDay: `D-${(index % 10) + 1}`,
            brand: [
              "아르마니 뷰티",
              "정샘물",
              "듀오버스터",
              "LANCOME",
              "DERMATORY",
            ][index % 5],
            product: [
              "NEW 파워 패브릭 PRO 파운데이션",
              "에센셜 물 마이크로 피팅 미스트",
              "민트 볼",
              "수분 크림",
              "포어 클리어 블랙 패드",
            ][index % 5],
            total: 100,
            current: Math.floor(Math.random() * 50) + 20,
          };
        }
      );

      const uniqueNewItems = newItems.filter(
        (newItem) => !prev.some((existing) => existing.id === newItem.id)
      );

      return nextPage === 0 ? newItems : [...prev, ...uniqueNewItems];
    });

    setPage(nextPage);
    setHasMore((nextPage === 0 ? 4 : 10) === 10);
    setIsLoading(false);
  };

  // 초기 로딩
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      loadCampaigns(0);
    }
  }, []); // 의존성 배열 비움 (마운트 시 1회 실행, 탭 변경 시 컴포넌트가 재마운트됨)

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formatDropdownRef.current &&
        !formatDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFormatDropdownOpen(false);
      }
    };

    if (isFormatDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormatDropdownOpen]);

  // 무한 스크롤 Observer
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadCampaigns(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, page]);

  return (
    <section className="px-5 pb-20">
      {/* 상단 필터 */}
      <div className="flex flex-wrap items-center gap-2 my-3">
        {/* 드롭다운 (블로그 탭에서는 숨김) */}
        {tabName !== "blog" && (
          <div className="relative" ref={formatDropdownRef}>
            <button
              onClick={() => setIsFormatDropdownOpen(!isFormatDropdownOpen)}
              className="
                px-[10px] py-1
                bg-white text-black
                text-[12px]
                flex items-center gap-1
              "
            >
              {format} <span className="text-[10px]">▼</span>
            </button>

            {isFormatDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-black rounded-lg shadow-lg z-50 min-w-[80px]">
                {dropdownOptions.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFormat(opt);
                      setIsFormatDropdownOpen(false);
                    }}
                    className={`
                      w-full px-[10px] py-2 text-[12px] text-left
                      hover:bg-gray-100
                      ${idx === 0 ? "rounded-t-lg" : ""}
                      ${idx === dropdownOptions.length - 1 ? "rounded-b-lg" : ""}
                      ${format === opt ? "bg-gray-50 font-bold" : ""}
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 카테고리 칩 */}
        {(tabName === "youtube"
          ? ["all", "skincare", "makeup", "etc"]
          : ["all", "skincare", "food", "etc"]
        ).map((label) => {
          const isSelected = selectedCategory === label;
          return (
            <button
              key={label}
              onClick={() => setSelectedCategory(label)}
              className={`
                px-[10px] py-1
                rounded-full
                border border-black
                text-[12px]
                transition-colors
                ${
                  isSelected
                    ? "bg-[#a5ff3f] border-[#a5ff3f]"
                    : "bg-white text-black"
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 리스트 */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-3">
        {items.map((item) => (
          <article key={`${tabName}-${item.id}`} className="text-[12px]">
            {/* 이미지 */}
            <div className="w-full mb-2 bg-[#f0f0f0] aspect-[3/4]">
              <Image
                src="/images/sample.png"
                alt="상품 이미지"
                width={300}
                height={400}
                className="block w-full h-full object-contain"
              />
            </div>

            {/* 정보 */}
            <div className="flex justify-between mb-1">
              <span className="text-[#555]">{item.type}</span>
              <span className="px-[6px] py-[2px] text-[11px] rounded bg-[#a5ff3f] font-bold">
                {item.dDay}
              </span>
            </div>

            <div className="mb-[2px] text-[13px] font-bold">{item.brand}</div>
            <div className="mb-1">{item.product}</div>

            <div>
              {item.total}명 | <b>{item.current}명</b>
            </div>
          </article>
        ))}
      </div>

      {/* 무한 스크롤 타겟 */}
      <div ref={observerTarget} className="h-10" />

      {/* 로딩 */}
      {isLoading && <LoadingSpinner />}
    </section>
  );
}
