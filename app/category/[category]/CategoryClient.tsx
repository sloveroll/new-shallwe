"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SubPageHeader from "../../components/common/SubPageHeader";

// 카테고리 타입
export type CategoryType =
  | "skincare"
  | "makeup"
  | "body"
  | "hair"
  | "health"
  | "food"
  | "etc";

// 캠페인 아이템 타입
type CampaignItem = {
  id: number;
  type: string;
  dDay: string;
  brand: string;
  product: string;
  total: number;
  current: number;
};

const CATEGORIES: CategoryType[] = [
  "skincare",
  "makeup",
  "body",
  "hair",
  "health",
  "food",
  "etc",
];

const CATEGORY_LABELS: Record<CategoryType, string> = {
  skincare: "skincare",
  makeup: "makeup",
  body: "body",
  hair: "hair",
  health: "health",
  food: "food",
  etc: "etc",
};

interface CategoryClientProps {
  initialCategory: CategoryType;
}

export default function CategoryClient({
  initialCategory,
}: CategoryClientProps) {
  const router = useRouter();

  // URL 파라미터로 받은 초기 카테고리를 state로 설정
  // 만약 유효하지 않은 카테고리라면 기본값 "skincare"
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    initialCategory && CATEGORIES.includes(initialCategory)
      ? initialCategory
      : "skincare"
  );

  const [campaignItems, setCampaignItems] = useState<CampaignItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement | null>(null);

  // 필터 한글 매핑
  const filterLabels: Record<string, string> = {
    전체: "전체",
    YouTube: "유튜브",
    Instagram: "인스타그램",
    Blog: "블로그",
  };

  // props로 전달된 category가 변경되면 state 업데이트 (클라이언트 라우팅 이동 시)
  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      setSelectedCategory(initialCategory);
      // 카테고리 변경 시 목록 초기화
      setCampaignItems([]);
      setPage(0);
      setHasMore(true);
      // 데이터 로딩은 아래 infinity scroll logic or initial load effect에서 처리
    }
  }, [initialCategory]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };

    if (isFilterDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterDropdownOpen]);

  // 카테고리 클릭 시 URL 변경
  const handleCategoryClick = (cat: CategoryType) => {
    // 얕은 라우팅보다는 실제 URL 변경을 통해 페이지 컴포넌트가 다시 렌더링되게 하거나
    // 클라이언트 상태만 변경하고 URL을 업데이트 할 수 있음.
    // 여기서는 router.push로 URL을 변경하여 Server Component -> Client Component flow를 유지
    router.push(`/category/${cat}`);
  };

  // 캠페인 데이터 로딩 함수
  const loadCampaigns = async (nextPage: number) => {
    if (isLoading) return;

    setIsLoading(true);

    // 임시: 시뮬레이션을 위한 딜레이
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 임시 더미 데이터 생성
    setCampaignItems((prev) => {
      // 페이지가 0이면 초기화 후 추가, 아니면 기존에 추가
      // (단, 여기 logic은 setCampaignItems([])를 useEffect에서 먼저 호출하므로
      //  prev는 비어있거나 기존 데이터임)
      const currentLength = nextPage === 0 ? 0 : prev.length;

      const newItems: CampaignItem[] = Array.from(
        { length: nextPage === 0 ? 4 : 10 },
        (_, i) => {
          const index = currentLength + i;
          return {
            id: index + 1,
            type: index % 3 === 0 ? "쇼츠" : index % 3 === 1 ? "피드" : "릴스",
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

      return nextPage === 0 ? newItems : [...prev, ...newItems];
    });

    setPage(nextPage);
    setHasMore((nextPage === 0 ? 4 : 10) === 10); // 임시 hasMore 로직
    setIsLoading(false);
  };

  // 초기 데이터 로딩 (카테고리가 바뀌거나 아이템이 없을 때)
  useEffect(() => {
    // selectedCategory가 바뀌면 items를 리셋하는 useEffect가 위에 있음.
    // 리셋된 후 (length === 0) 로딩 시작.
    if (campaignItems.length === 0 && !isLoading) {
      loadCampaigns(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, campaignItems.length]);

  // 무한 스크롤: Intersection Observer로 스크롤 감지
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
    <main className="min-h-screen bg-white">
      {/* 상단 헤더 - SubPageHeader 사용 */}
      <SubPageHeader title="카테고리" />

      <section className="px-5 pb-20">
        {/* 카테고리 버튼 영역 - 위 3개, 아래 4개 */}
        <div className="my-4">
          {/* 첫 번째 행: 3개 */}
          <div className="flex flex-wrap gap-2 mb-2">
            {CATEGORIES.slice(0, 3).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`
                    rounded-full
                    border
                    px-3 py-[6px]
                    text-[12px]
                    transition-colors
                    ${
                      isSelected
                        ? "bg-[#a5ff3f] border-[#a5ff3f] text-black"
                        : "bg-white border-black text-black"
                    }
                  `}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
          {/* 두 번째 행: 4개 */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.slice(3, 7).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`
                    rounded-full
                    border
                    px-3 py-[6px]
                    text-[12px]
                    transition-colors
                    ${
                      isSelected
                        ? "bg-[#a5ff3f] border-[#a5ff3f] text-black"
                        : "bg-white border-black text-black"
                    }
                  `}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 필터 영역 */}
        <div className="flex flex-wrap items-center gap-2 my-3">
          {/* 전체 드롭다운 */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="
                px-[10px] py-1
                bg-white text-black
                text-[12px]
                flex items-center gap-1
              "
            >
              {filterLabels[selectedFilter] || selectedFilter}{" "}
              <span className="text-[10px]">▼</span>
            </button>

            {/* 드롭다운 메뉴 */}
            {isFilterDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-black rounded-lg shadow-lg z-50 min-w-[80px]">
                {["전체", "YouTube", "Instagram", "Blog"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`
                      w-full px-[10px] py-2 text-[12px] text-left
                      first:rounded-t-lg last:rounded-b-lg
                      hover:bg-gray-100
                      ${selectedFilter === filter ? "bg-gray-50 font-bold" : ""}
                    `}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 카드 리스트 2열 */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-3">
          {campaignItems.map((item) => (
            <article key={item.id} className="text-[12px]">
              {/* 이미지 영역 */}
              <div className="w-full mb-2 bg-[#f0f0f0] aspect-[3/4]">
                <Image
                  src="/images/sample.png"
                  alt="상품 이미지"
                  width={300}
                  height={400}
                  className="block w-full h-full object-contain"
                />
              </div>

              {/* 채널/상태 라인 */}
              <div className="flex justify-between mb-1">
                <span className="text-[#555]">{item.type}</span>
                <span className="px-[6px] py-[2px] text-[11px] rounded bg-[#a5ff3f] font-bold">
                  {item.dDay}
                </span>
              </div>

              {/* 타이틀 */}
              <div className="mb-[2px] text-[13px] font-bold">{item.brand}</div>
              <div className="mb-1">{item.product}</div>

              {/* 인원 정보 */}
              <div>
                {item.total}명 | <b>{item.current}명</b>
              </div>
            </article>
          ))}
        </div>

        {/* 무한 스크롤 감지용 타겟 */}
        <div ref={observerTarget} className="h-10" />

        {/* 로딩 스피너 */}
        {isLoading && <LoadingSpinner />}
      </section>
    </main>
  );
}
