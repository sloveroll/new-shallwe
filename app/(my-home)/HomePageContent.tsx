'use client';

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMainTab } from "../MainTabContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

// 카테고리 목록 (컴포넌트 외부로 이동하여 hydration 오류 방지)
const CATEGORIES = [
  { key: "skincare", label: "skincare" },
  { key: "makeup", label: "makeup" },
  { key: "body", label: "body" },
  { key: "hair", label: "hair" },
  { key: "health", label: "health" },
  { key: "food", label: "food" },
  { key: "etc", label: "etc" },
];

// YouTube 캠페인 아이템 타입
type CampaignItem = {
  id: number;
  type: string;
  dDay: string;
  brand: string;
  product: string;
  total: number;
  current: number;
};

export default function HomePageContent() {
  const { mainTab } = useMainTab();
  const router = useRouter();
  const [bestIndex, setBestIndex] = useState(0);
  const bestListRef = useRef<HTMLDivElement | null>(null);
  
  // YouTube 탭 무한 스크롤 관련 상태
  const [youtubeItems, setYoutubeItems] = useState<CampaignItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  
  // YouTube 탭 필터 상태
  const [youtubeFormat, setYoutubeFormat] = useState<"쇼츠" | "롱폼">("쇼츠");
  const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false);
  const formatDropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleBestScroll = () => {
    const el = bestListRef.current;
    if (!el) return;

    const totalCards = 4;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (maxScroll <= 0) {
      setBestIndex(0);
      return;
    }

    const ratio = el.scrollLeft / maxScroll;
    const idx = Math.round(ratio * (totalCards - 1));
    setBestIndex(idx);
  };

  // YouTube 캠페인 데이터 로딩 함수
  const loadYoutubeCampaigns = async (nextPage: number) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // TODO: 실제 API 호출로 변경
    // const response = await fetch(`/api/campaigns/youtube?page=${nextPage}&limit=10`);
    // const data = await response.json();
    
    // 임시: 시뮬레이션을 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 임시 더미 데이터 생성
    setYoutubeItems(prev => {
      const startIndex = prev.length;
      const newItems: CampaignItem[] = Array.from({ length: nextPage === 0 ? 4 : 10 }, (_, i) => {
        const index = startIndex + i;
        return {
          id: index + 1,
          type: index % 3 === 0 ? "쇼츠" : index % 3 === 1 ? "피드" : "릴스",
          dDay: `D-${(index % 10) + 1}`,
          brand: ["아르마니 뷰티", "정샘물", "듀오버스터", "LANCOME", "DERMATORY"][index % 5],
          product: ["NEW 파워 패브릭 PRO 파운데이션", "에센셜 물 마이크로 피팅 미스트", "민트 볼", "수분 크림", "포어 클리어 블랙 패드"][index % 5],
          total: 100,
          current: Math.floor(Math.random() * 50) + 20,
        };
      });

      return nextPage === 0 ? newItems : [...prev, ...newItems];
    });
    
    setPage(nextPage);
    setHasMore((nextPage === 0 ? 4 : 10) === 10); // 10개 미만이면 더 이상 없음
    setIsLoading(false);
  };

  // mainTab이 변경될 때 YouTube 탭 상태 초기화
  useEffect(() => {
    if (mainTab !== "youtube") {
      // YouTube 탭이 아닐 때는 상태 초기화
      setYoutubeItems([]);
      setPage(0);
      setHasMore(true);
      setIsLoading(false);
      setIsFormatDropdownOpen(false);
    }
  }, [mainTab]);

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

  // 초기 데이터 로딩 (4개)
  useEffect(() => {
    if (mainTab === "youtube" && youtubeItems.length === 0 && !isLoading) {
      loadYoutubeCampaigns(0);
    }
  }, [mainTab, youtubeItems.length, isLoading]);

  // 무한 스크롤: Intersection Observer로 스크롤 감지
  useEffect(() => {
    if (mainTab !== "youtube" || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadYoutubeCampaigns(page + 1);
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
  }, [mainTab, hasMore, isLoading, page]);

  return (
    <main>
      {/* 🔥 1. Home 탭 */}
      {mainTab === "home" && (
        <section className="px-5">
          {/* 상단 배너 카드 */}
          <div className="relative w-full mb-4 overflow-hidden rounded-[24px]">
            <Image
              src="/images/shallwe-banner.png"
              alt="쉘위 사용 설명서 배너"
              width={1140}
              height={768}
              className="block w-full h-auto"
              priority
            />
          </div>

          {/* 카테고리 버튼 영역 (태그들) - 위 3개, 아래 4개 */}
          <div className="mb-6">
            {/* 첫 번째 행: 3개 */}
            <div className="flex flex-wrap gap-2 mb-2">
              {CATEGORIES.slice(0, 3).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => router.push(`/category/${key}`)}
                  className="rounded-full border border-black px-3 py-[6px] text-[12px] bg-white cursor-pointer hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}
            </div>
            {/* 두 번째 행: 4개 */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.slice(3, 7).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => router.push(`/category/${key}`)}
                  className="rounded-full border border-black px-3 py-[6px] text-[12px] bg-white cursor-pointer hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Best Campaign 영역 */}
          <section className="mt-8 -mx-5 bg-[#262626] px-5 pt-6 pb-7">
            {/* 제목 */}
            <h2 className="mb-4 text-[20px] font-semibold text-white">
              Best Campaign
            </h2>

            {/* 카드 슬라이드 영역 */}
            <div
              ref={bestListRef}
              onScroll={handleBestScroll}
              className="flex gap-4 overflow-x-auto pb-4 no-scrollbar"
            >
              {[1, 2, 3, 4].map((no) => (
                <a
                  key={no}
                  href="/campaign-detail"
                  className="
                    no-underline
                    min-w-[180px] h-[360px]
                    overflow-hidden
                    bg-white
                    flex flex-col justify-between
                    text-[#333]
                  "
                >
                  {/* 상단: 이미지 + 숫자 */}
                  <div className="relative flex items-center justify-center h-[60%] overflow-hidden">
                    <div className="absolute top-4 left-[18px] text-[32px] font-extrabold text-[#a5ff3f] drop-shadow-[2px_2px_0_#000]">
                      {no}
                    </div>
                    <img
                      src="/images/sample.png"
                      alt="상품"
                      className="block w-full h-full object-contain"
                    />
                  </div>

                  {/* 하단: 텍스트 영역 */}
                  <div className="flex flex-col justify-start h-[40%] px-5 pt-4 pb-[18px]">
                    <strong className="mb-1 text-[15px] font-bold">
                      브랜드명
                    </strong>
                    <div className="mb-2 text-[13px]">상품명 텍스트</div>
                    <div className="text-[13px]">
                      100명 | <span className="font-bold">45명</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* 하단 페이지 인디케이터 */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((i) => {
                const active = bestIndex === i;
                return (
                  <span
                    key={i}
                    className={`inline-block h-[6px] transition-all duration-200 ${
                      active
                        ? "w-[18px] rounded-full bg-[#a5ff3f]"
                        : "w-[6px] rounded-full bg-[#666]"
                    }`}
                  />
                );
              })}
            </div>
          </section>

          {/* New 캠페인 리스트 섹션 */}
          <section className="py-5 rounded-[16px]">
            {/* 상단 제목 */}
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-semibold">New Campaign</h2>
            </div>

            {/* 카드 리스트 (3열 그리드) */}
            <div className="grid grid-cols-3 gap-y-8 gap-x-3 mt-2">
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const variant = (i - 1) % 3; // 0,1,2
                const shapeVariantClass =
                  variant === 1
                    ? "rounded-full"
                    : variant === 2
                    ? "rounded-[0_0_0_999px]"
                    : "";

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center p-0 bg-transparent shadow-none"
                  >
                    {/* 상단: 배경 도형 + 이미지 */}
                    <div
                      className={`
                        w-full h-[112px]
                        bg-[#e7e7e7]
                        relative overflow-hidden
                        ${shapeVariantClass}
                      `}
                    >
                      <img
                        src="/images/sample.png"
                        alt="상품 이미지"
                        className="
                          absolute top-1/2 left-1/2
                          w-full h-full
                          -translate-x-1/2 -translate-y-1/2
                          object-contain
                          block
                        "
                      />
                    </div>

                    {/* 하단: 텍스트 영역 */}
                    <div className="w-full mt-2 text-center">
                      <div className="mb-[2px] text-[12px] font-semibold text-[#555]">
                        브랜드명
                      </div>
                      <div className="text-[13px] font-medium text-[#222]">
                        상품명 텍스트
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* shallwe 구분선 */}
          <div
            className="mx-[-20px] h-10 bg-black"
            style={{
              backgroundImage: 'url("/images/shallwe-line.png")',
              backgroundRepeat: "repeat-x",
              backgroundPosition: "0px center",
              backgroundSize: "auto 30px",
            }}
          />

          {/* Recommend 섹션 */}
          <section className="-mx-5 bg-[#ededed] px-5 pt-7 pb-10">
            <h2 className="mb-5 text-[18px] font-semibold">Recommend</h2>

            {/* 1) 메인 대형 카드 1개 */}
            <div className="bg-transparent rounded-[16px] overflow-hidden shadow-none">
              <div className="relative w-full bg-white aspect-[5/2]">
                <img
                  src="/images/sample.png"
                  alt="추천 메인 상품"
                  className="
                    absolute top-1/2 left-1/2
                    w-full h-full
                    -translate-x-1/2 -translate-y-1/2
                    object-contain
                  "
                />
              </div>

              <div className="px-4 pt-[14px] pb-4">
                <div className="flex items-center justify-between mb-[6px] text-[11px]">
                  <span className="px-[6px] py-[2px] rounded bg-[#f2f2f2]">
                    유튜브
                  </span>
                  <span className="px-[6px] py-[2px] rounded bg-[#a5ff3f] font-bold">
                    마감임박!
                  </span>
                </div>

                <div className="mb-[2px] text-[13px] font-bold">동아제약</div>
                <div className="mb-[6px] text-[12px] text-[#333]">
                  아일로 화이트치윤 30포 세트
                </div>

                <div className="text-[11px] text-[#444]">
                  50명 | <b>25명</b>
                </div>
              </div>
            </div>

            {/* 2) 아래 작은 카드들 – 2열 그리드 */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-3 mt-6">
              {[1, 2, 3, 4].map((i) => {
                const shapeVariant = i % 2; // 0,1
                const shapeClass =
                  shapeVariant === 0
                    ? "rounded-full"
                    : "[clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%,35%_50%)]";

                return (
                  <div key={i} className="bg-transparent">
                    {/* 도형 + 이미지 */}
                    <div
                      className={`
                        w-full h-[110px]
                        bg-white
                        relative overflow-hidden
                        ${shapeClass}
                      `}
                    >
                      <img
                        src="/images/sample.png"
                        alt="추천 상품"
                        className="
                          absolute top-1/2 left-1/2
                          w-full h-full
                          -translate-x-1/2 -translate-y-1/2
                          object-contain
                        "
                      />
                    </div>

                    {/* 텍스트 */}
                    <div className="mt-2">
                      <div className="flex justify-between mb-1 text-[11px]">
                        <span className="text-[#555]">웰스</span>
                        <span className="font-bold">D-10</span>
                      </div>
                      <div className="mb-[2px] text-[12px] font-semibold">
                        브랜드명
                      </div>
                      <div className="mb-1 text-[12px] text-[#333]">
                        상품명 텍스트 두줄 정도 입력
                      </div>
                      <div className="text-[11px] text-[#555]">
                        100명 | <b>36명</b>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white pt-6 pb-10 text-[12px] text-[#777]">
            {/* 로고 */}
            <div className="mb-4">
              <img
                src="/images/scroll-logo.png"
                alt="Shallwe Logo"
                className="block w-[75px] h-auto"
              />
            </div>

            {/* 회사 정보 */}
            <div className="space-y-1">
              <p>상호 : 두산매거진</p>
              <p>주소 : 서울특별시 강남구 언주로 726 (논현동, 두산빌딩)</p>
              <p>대표 : 송현승 | 사업자등록번호 : 211-85-51635</p>
              <p>
                통신판매업신고번호 : 강남-15934호 |{" "}
                <span className="font-semibold text-[#555]">
                  사업자정보확인
                </span>
              </p>
              <p>메일 : shallwe@doosan.com</p>
              <p>호스팅 : 케이티 클라우드 (KT Cloud)</p>
            </div>

            {/* 링크들 */}
            <div className="mt-[18px] mb-[10px] text-[13px] font-medium text-[#333] flex flex-wrap items-center gap-2">
              <span>이용약관</span>
              <span className="text-[#ccc] mx-2">|</span>
              <span>개인정보 처리방침</span>
              <span className="text-[#ccc] mx-2">|</span>
              <span>광고/제휴문의</span>
            </div>

            {/* 카피라이트 */}
            <p className="m-0 text-[11px] text-[#999]">
              COPYRIGHT © DOOSAN MAGAZINE. INC. ALL RIGHTS RESERVED
            </p>
          </footer>
        </section>
      )}

      {/* 2. Youtube 탭 */}
      {mainTab === "youtube" && (
        <section className="px-5 pb-20">
          {/* 상단 필터 (쇼츠 + 칩들) */}
          <div className="flex flex-wrap items-center gap-2 my-3">
            {/* 쇼츠/롱폼 드롭다운 */}
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
                {youtubeFormat} <span className="text-[10px]">▼</span>
              </button>
              
              {/* 드롭다운 메뉴 */}
              {isFormatDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-black rounded-lg shadow-lg z-50 min-w-[80px]">
                  <button
                    onClick={() => {
                      setYoutubeFormat("쇼츠");
                      setIsFormatDropdownOpen(false);
                    }}
                    className={`
                      w-full px-[10px] py-2 text-[12px] text-left
                      first:rounded-t-lg last:rounded-b-lg
                      hover:bg-gray-100
                      ${youtubeFormat === "쇼츠" ? "bg-gray-50 font-bold" : ""}
                    `}
                  >
                    쇼츠
                  </button>
                  <button
                    onClick={() => {
                      setYoutubeFormat("롱폼");
                      setIsFormatDropdownOpen(false);
                    }}
                    className={`
                      w-full px-[10px] py-2 text-[12px] text-left
                      first:rounded-t-lg last:rounded-b-lg
                      hover:bg-gray-100
                      ${youtubeFormat === "롱폼" ? "bg-gray-50 font-bold" : ""}
                    `}
                  >
                    롱폼
                  </button>
                </div>
              )}
            </div>

            {["all", "skincare", "makeup", "etc"].map((label) => {
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
                    ${isSelected 
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

          {/* 카드 리스트 2열 */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-3">
            {youtubeItems.map((item) => (
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
                <div className="mb-[2px] text-[13px] font-bold">
                  {item.brand}
                </div>
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
      )}

      {/* 3. Instagram / Blog 탭 자리 */}
      {mainTab === "instagram" && (
        <section className="px-5 py-4">Instagram 탭 내용 넣을 자리</section>
      )}

      {mainTab === "blog" && (
        <section className="px-5 py-4">Blog 탭 내용 넣을 자리</section>
      )}
    </main>
  );
}

