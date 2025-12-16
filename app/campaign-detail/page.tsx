// app/campaign-detail/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Tab = "info" | "guide";

export default function CampaignDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const COLLAPSED_HEIGHT = 300;
  const [bannerHeight, setBannerHeight] = useState(COLLAPSED_HEIGHT);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [isRefOpen, setIsRefOpen] = useState(false);

  useEffect(() => {
    if (!bannerRef.current) return;

    if (isBannerOpen) {
      const fullHeight = bannerRef.current.scrollHeight;
      setBannerHeight(fullHeight);
    } else {
      setBannerHeight(COLLAPSED_HEIGHT);
    }
  }, [isBannerOpen]);

  return (
    <main className="min-h-screen bg-white pb-[90px]">
      {/* 안쪽 모바일 캔버스 */}
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen pb-[30px] box-border">
        {/* 상단: 뒤로가기 + 대표 이미지 */}
        <section className="relative bg-[#f5f5f5]">
          {/* 뒤로가기 */}
          <button
            onClick={() => router.back()}
            className="
              absolute top-[12px] left-[12px] z-10
              border-0
              bg-black/50 text-white
              w-[32px] h-[32px]
              rounded-full
              cursor-pointer
              text-[18px]
              flex items-center justify-center
            "
          >
            ←
          </button>

          {/* 상품 이미지 영역 */}
          <div className="w-full h-[360px] relative">
            <Image
              src="/images/sample.png"
              alt="캠페인 상품 이미지"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>

        {/* 캠페인 기본 정보 */}
        <section className="px-5 pt-4 pb-4">
          {/* 태그/지원자수/D-day */}
          {/* 태그/지원자수/D-day */}
          <div className="flex items-center gap-2 mb-3">
            {/* 쇼츠 뱃지 (블랙/화이트 반전 스타일이 자주 쓰이나, 기존 유지하되 내용 확인) */}
            <span
              className="
                flex items-center gap-[2px]
                text-[11px] font-bold
                px-[6px] py-[2px]
                rounded-[4px]
                bg-[#333] text-white
              "
            >
              <Image
                src="/images/common/ic-shorts.png"
                alt="쇼츠"
                width={14}
                height={14}
                className="w-[14px] h-[14px] invert" 
              />
              쇼츠
            </span>

            {/* 모집 인원 (10명 | 1명) */}
            <span
              className="
                text-[12px] font-medium
                px-[6px] py-[2px]
                border border-[#333]
                rounded-[4px]
                bg-white text-[#333]
              "
            >
              10명 | <strong>1명</strong>
            </span>

            {/* 마감임박 뱃지 */}
            <span
              className="
                text-[11px] font-bold
                px-[6px] py-[2px]
                rounded-[4px]
                bg-[#AFFF33] text-black
              "
            >
              마감임박!
            </span>
          </div>

          {/* 상품명/제품 */}
          <div className="text-[18px] font-bold mb-1 text-black">아르마니 뷰티</div>

          <div className="text-[16px] leading-[1.4] mb-6 text-[#111]">
            NEW 파워 패브릭 PRO 파운데이션
          </div>

          {/* 정보 리스트 (Grid Layout) */}
          <div className="flex flex-col gap-2 text-[13px] text-[#333]">
            {/* 지급 캐시 */}
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">지급 캐시</span>
              <span className="font-medium">
                <span className="text-[#AFFF33] font-bold underline cursor-pointer mr-1">로그인</span> 
                후 확인 가능
              </span>
            </div>

            {/* 콘텐츠 등록기간 */}
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">콘텐츠 등록기간</span>
              <span className="font-medium">11/16(일) - 11/27(목)</span>
            </div>

            {/* 사전 검수 마감일 */}
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">사전 검수 마감일</span>
              <span className="font-medium">11/27(목)까지</span>
            </div>

            {/* 캐시 지급일 */}
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">캐시 지급일</span>
              <span className="font-medium">11/27(목)까지</span>
            </div>

            {/* 콘텐츠 유지 기간 */}
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">콘텐츠 유지 기간</span>
              <span className="font-medium">60일</span>
            </div>
          </div>
        </section>

        {/* 탭 영역 */}
        <section className="px-5">
          <div className="flex border-b border-[#eee] mb-4">
            <button
              onClick={() => setActiveTab("info")}
              className={`
                flex-1 py-3
                border-0 bg-transparent
                text-[14px]
                cursor-pointer
                border-b-0 border-r border-[#eee]
                ${
                  activeTab === "info"
                    ? "font-bold text-[#111] border-t-2 border-t-[#AFFF33]"
                    : "font-medium text-[#888] border-t-2 border-t-transparent"
                }
              `}
            >
              캠페인 정보
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`
                flex-1 py-3
                border-0 bg-transparent
                text-[14px]
                cursor-pointer
                ${
                  activeTab === "guide"
                    ? "font-bold text-[#111] border-t-2 border-t-[#AFFF33]"
                    : "font-medium text-[#888] border-t-2 border-t-transparent"
                }
              `}
            >
              콘텐츠 가이드
            </button>
          </div>

          {/* 탭 내용 */}
          {activeTab === "info" ? (
            <>
              {/* 희망 크리에이터 */}
              <div className="border border-[#e8e9eb] rounded-[3px] p-[14px] mb-3">
                <div className="flex items-center gap-[5px] mb-1.5">
                  <Image
                    src="/images/common/ic-winklogo.png"
                    alt="희망 크리에이터"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                  <div className="text-[14px] font-bold">
                    희망 크리에이터
                  </div>
                </div>
                <p className="text-[12px] text-[#666] mb-2">
                  브랜드는 이런 크리에이터님을 선호해요!
                </p>

                <ul className="text-[12px] leading-[1.8] m-0 pl-4 text-[#444] list-disc">
                  <li>피부 타입: 복합성, 민감성</li>
                  <li>피부 고민: 여드름, 주름, 기미</li>
                  <li>시청자 타겟 연령대&성별: 18-24, 여성</li>
                </ul>
              </div>

              {/* 유의사항 */}
              <div className="border border-[#e8e9eb] rounded-[3px] p-[14px] mb-4">
                <div className="flex items-center gap-[5px] mb-1.5">
                  <Image
                    src="/images/common/ic-lookinglogo.png"
                    alt="유의사항"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                  <div className="text-[14px] font-bold">
                    유의사항
                  </div>
                </div>
                
                {/* 플래그 영역 */}
                <div className="mb-2 space-y-1.5">
                  <div className="flex items-center">
                    <span
                      className="
                        px-2 py-1
                        rounded-[2px]
                        bg-[#edffd0]
                        border-[0.3px] border-[#afafaf]
                        text-[11px] font-medium
                        mr-2
                      "
                    >
                      ✅ 2차 활용
                    </span>
                    <span className="text-[12px] text-[#5d5d5d]">
                      협업 영상이 상업적으로 활용될 수 있습니다.
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span
                      className="
                        px-2 py-1
                        rounded-[2px]
                        bg-[#edffd0]
                        border-[0.3px] border-[#afafaf]
                        text-[11px] font-medium
                        mr-2
                      "
                    >
                      ✅ 클린본 제출
                    </span>
                    <span className="text-[12px] text-[#5d5d5d]">
                      BGM, 효과음 등을 제거한 영상 제출이 필수입니다.
                    </span>
                  </div>
                </div>

                <ul className="text-[12px] leading-[1.7] m-0 pl-4 text-[#444] list-disc">
                  <li>유튜브 제품 태그 필수</li>
                  <li>추가 제공품 노출 필수</li>
                  <li>협업금에 2차 활용 비용 포함</li>
                </ul>
              </div>

              {/* 협업 제품 / 단순 선물 카드 2개 */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 border border-[#edefef] rounded-[5px] p-[10px] relative">
                  {/* 제품 플래그 */}
                  <div className="absolute top-[5px] left-[4px] bg-[#ffdada] border-[0.3px] border-[#e5e5e5] h-[9px] px-1.5 flex items-center">
                    <span className="text-[6px] font-medium text-black">협업 제품</span>
                  </div>
                  
                  <div className="w-full h-[112px] relative mb-2 mt-3">
                    <Image
                      src="/images/sample.png"
                      alt="협업 제품"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="text-[12px] font-bold mb-1">
                    메디힐 MEDIHEAL
                  </div>
                  <div className="text-[12px] font-medium mb-1">
                    마데카소사이드 수분 선세럼 흔적 리페어 50g
                  </div>
                  <div className="text-[12px] font-bold text-black">59,000원</div>
                </div>

                <div className="flex-1 border border-[#edefef] rounded-[5px] p-[10px] relative">
                  {/* 제품 플래그 */}
                  <div className="absolute top-[5px] left-[4px] bg-[#d9d9d9] border-[0.3px] border-[#e5e5e5] h-[9px] px-1.5 flex items-center">
                    <span className="text-[6px] font-medium text-black">단순 선물</span>
                  </div>
                  
                  <div className="w-full h-[112px] relative mb-2 mt-3">
                    <Image
                      src="/images/sample.png"
                      alt="단순 선물"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="text-[12px] font-bold mb-1">
                    메디힐 MEDIHEAL
                  </div>
                  <div className="text-[12px] font-medium mb-1">
                    마데카소사이드 수분 선세럼 흔적 리페어 50g
                  </div>
                  <div className="text-[12px] font-bold text-black">59,000원</div>
                </div>
              </div>
            </>
          ) : (
            // 콘텐츠 가이드 탭 내용
            <>
              {/* 상단 안내 문구 + 인쇄 버튼 */}
              <div className="relative mb-[15px] px-[2px]">
                <span className="text-[11px] text-[#ff3b30] text-center w-full block">
                  ※ 참고자료 외 모든 항목이 콘텐츠 내 전부 반영되어야 합니다.
                </span>

                <button
                  onClick={() => window.print()}
                  className="
                    absolute right-[2px] top-1/2 -translate-y-1/2
                    text-[11px]
                    px-[10px] py-[2px]
                    rounded-full
                    border border-[#e0e0e0]
                    bg-white
                    cursor-pointer
                    text-[#555]
                  "
                >
                  인쇄
                </button>
              </div>

              {/* 유의사항 박스 */}
              <div
                className="
                  border border-[#e5e5e5]
                  rounded-[12px]
                  p-4
                  mb-4
                  bg-white
                  shadow-[0_1px_2px_rgba(0,0,0,0.03)]
                  text-[12px] text-[#444]
                "
              >
                <div className="text-[14px] font-bold mb-2.5">유의사항</div>

                <div className="mb-[10px]">
                  {/* 2차 활용 */}
                  <div className="flex items-center mb-[6px]">
                    <span
                      className="
                        px-2 py-1
                        rounded-full
                        bg-[#e7fbdc]
                        text-[11px]
                        mr-2
                      "
                    >
                      ✅ 2차 활용
                    </span>
                    <span className="text-[12px]">
                      협업 영상이 상업적으로 활용될 수 있습니다.
                    </span>
                  </div>

                  {/* 클린본 제출 */}
                  <div className="flex items-center">
                    <span
                      className="
                        px-2 py-1
                        rounded-full
                        bg-[#e7fbdc]
                        text-[11px]
                        mr-2
                      "
                    >
                      ✅ 클린본 제출
                    </span>
                    <span className="text-[12px]">
                      BGM, 효과음 등을 제거한 영상 제출이 필요합니다.
                    </span>
                  </div>
                </div>

                <ul className="text-[12px] leading-[1.7] pl-4 m-0 list-disc">
                  <li>유튜브 제품 태그 필수</li>
                  <li>추가 제공품 노출 필수</li>
                  <li>협업금에 2차 활용 비용 포함</li>
                </ul>
              </div>

              {/* 아래 텍스트 영역 */}
              <div className="text-[12px] leading-[1.8] text-[#444] mb-6">
                {/* [광고 표기] */}
                <div className="pt-1 pb-2.5">
                  <div className="pt-1 pb-2.5">
                    <div className="flex items-center mb-1">
                      <div className="font-bold">[광고 표기]</div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `영상 시작·중간·끝 광고 문구 반복 표기\n"메디힐의 유료광고를 포함하고 있습니다."`
                          );
                          alert("복사되었습니다!");
                        }}
                        className="
                          ml-auto
                          text-[11px]
                          px-[10px] py-[4px]
                          rounded-full
                          border border-[#d4ff8f]
                          bg-[#AFFF33]
                          cursor-pointer
                          text-black
                        "
                      >
                        복사
                      </button>
                    </div>

                    <p className="m-0">
                      영상 시작·중간·끝 광고 문구 반복 표기
                      <br />
                      메디힐의 유료광고를 포함하고 있습니다.
                    </p>
                  </div>
                </div>

                {/* [촬영/편집 가이드] */}
                <div className="pt-[10px] border-t border-[#eee]">
                  <div className="font-bold mb-1">[촬영/편집 가이드]</div>

                  <ul className="m-0 pl-4 list-disc">
                    <li>(롱폼) 영상 총 구간의 50% 이내 제품 소개 시작</li>
                    <li>(숏츠) 영상 시작 30초 이내 제품 소개 시작</li>
                    <li>
                      (숏츠) 영상 내 탑송, K-POP 등 상업적 사용 불가한 BGM 삽입
                      금지
                    </li>
                    <li>
                      본인 등장 및 직접 촬영/제작 필수 (타인의 리뷰 영상 짜깁기,
                      AI 활용 금지)
                    </li>
                    <li>협업 제품과 동일 카테고리 제품 노출 및 비교 불가</li>
                    <li>
                      협업 제품 노출 구간에 제품과 무관한 개인적 이야기 언급
                      불가
                    </li>
                    <li>가이드 내 전달되지 않은 별도 수익화 링크/태그 불가</li>
                  </ul>
                </div>

                {/* [노출시간] */}
                <div className="mt-4 pt-[10px] border-t border-[#eee]">
                  <div className="font-bold mb-1">[노출시간]</div>
                  <div className="text-[13px] font-semibold">30초</div>
                </div>

                {/* 메디힐 블록 */}
                <div className="mt-4 pt-[10px] border-t border-[#eee]">
                  <div className="text-[14px] font-bold text-[#0070c9] mb-2">
                    메디힐
                  </div>

                  {/* [협업 제품] */}
                  <div className="flex items-center mb-1">
                    <div className="font-bold">[협업 제품]</div>

                    <button
                      onClick={() => {
                        const text = `메디힐 MEDIHEAL
마데카소사이드 수분 선세럼 촉촉 리페어 50g
59,000원`;
                        navigator.clipboard?.writeText(text);
                      }}
                      className="
                        ml-auto
                        text-[11px]
                        px-[10px] py-[4px]
                        rounded-full
                        border border-[#d4ff8f]
                        bg-[#AFFF33]
                        cursor-pointer
                        text-black
                      "
                    >
                      복사
                    </button>
                  </div>

                  <p className="m-0 mb-2 text-[12px] leading-[1.7]">
                    메디힐 MEDIHEAL
                    <br />
                    마데카소사이드 수분 선세럼 촉촉 리페어 50g
                    <br />
                    59,000원
                  </p>

                  {/* [언급 사항] */}
                  <div className="flex items-center mt-2 mb-1 border-t border-[#eee]">
                    <div className="font-bold mt-2">[언급 사항]</div>
                  </div>

                  <p className="m-0 mb-2 text-[12px] leading-[1.7]">
                    물처럼 가볍고 산뜻촉촉한 가벼운 클렌징오일!
                    <br />
                    333 세안법으로 자극, 눈사람 없이 순하게 눈에 보이는 피지,
                    블랙헤드 딥클렌징 가능!
                  </p>

                  {/* [연출 사항] */}
                  <div className="flex items-center mt-2 mb-1 border-t border-[#eee]">
                    <div className="font-bold mt-2">[연출 사항]</div>
                  </div>

                  <ol className="m-0 mb-2 pl-[18px] text-[12px] leading-[1.7] list-decimal">
                    <li>하이라이터 사용 후 자연스러운 광채 연출</li>
                    <li>하이라이터 B&amp;A컷</li>
                    <li>얼굴에 하이라이터 바르는 장면 연출</li>
                  </ol>

                  {/* [금지 사항] */}
                  <div className="flex items-center mt-2 mb-1 border-t border-[#eee]">
                    <div className="font-bold mt-2">[금지 사항]</div>
                  </div>

                  <ol className="m-0 pl-[18px] text-[12px] leading-[1.7] list-decimal">
                    <li>&apos;가장/제품&apos; 등 최상급 의미를 가진 표현 불가</li>
                    <li>여드름 피부 전용 (x), 여드름 피부가 사용 가능한 (o)</li>
                  </ol>

                  {/* 참고 자료 (접힘/펼침) */}
                  <div className="mt-5 pt-[10px] border-t-[3px] border-[#eee]">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setIsRefOpen((prev) => !prev)}
                    >
                      <div className="text-[14px] font-bold">참고 자료</div>

                      <div
                        className={`
                          text-[20px] pr-1
                          transition-transform duration-200
                          ${isRefOpen ? "rotate-180" : ""}
                        `}
                      >
                        ▾
                      </div>
                    </div>

                    {isRefOpen && (
                      <div className="mt-3 text-[13px] leading-[1.6]">
                        {/* 단순 선물 */}
                        <div className="mb-3">
                          <div className="font-bold mb-1">[단순 선물]</div>
                          <div>메디힐 MEDIHEAL</div>
                          <div>마데카소사이드 수분 선세럼 촉촉 리페어 50g</div>
                          <div>59,000원</div>
                        </div>

                        {/* 참고사항 */}
                        <div className="mb-3">
                          <div className="font-bold mb-1">[참고사항]</div>

                          <ol className="m-0 pl-[18px] list-decimal">
                            <li>제품 특징점 소개</li>
                            <li>
                              음영 하이라이터 : 코덕 & 인플루언서 사이에서 인기
                              하이라이터
                            </li>
                            <li>
                              텍스처 : 가루날림이 적고, 들뜸· 텁텁함 없이 밀착된
                              베이크드 텍스처
                            </li>
                            <li>
                              요철 부각 없는 하이라이터 : 미세 파우더가 모공과
                              요철 사이를 커버하여 매끈한 결광 표현
                            </li>
                            <li>
                              멀티 유즈 : 치크로도 활용 가능 (베이비 베리 빔
                              컬러)
                            </li>
                            <li>
                              얼굴형 커버 : 볼륨 라인 보정 가능, 입체적인
                              이목구비 연출
                            </li>
                            <li>
                              아이돌 하이라이터 : 데일리 사용부터 아이돌처럼
                              화려한 맥시 볼륨광 연출 가능
                            </li>
                          </ol>
                        </div>

                        {/* 레퍼런스 영상 */}
                        <div className="mb-3">
                          <div className="font-bold mb-1">[레퍼런스 영상]</div>

                          <div className="break-words">
                            <a
                              href="https://www.youtube.com/shorts/u2SvQgPmbw0"
                              target="_blank"
                            >
                              https://www.youtube.com/shorts/u2SvQgPmbw0
                            </a>
                            <br />
                            <a
                              href="https://www.instagram.com/reel/DPlDaTPepnI/"
                              target="_blank"
                            >
                              https://www.instagram.com/reel/DPlDaTPepnI/
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* [더보기란 내용] */}
                  <div className="mt-4 pt-[10px] border-t-[3px] border-[#eee]">
                    <div className="flex items-center mb-1">
                      <div className="font-bold">[더보기란 내용]</div>

                      <button
                        onClick={() => {
                          const text = `메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공 받았습니다.

메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair Special Set
#선크림 #선세럼 #선크림추천
https://bepla.in/HTtM`;
                          navigator.clipboard?.writeText(text);
                        }}
                        className="
                          ml-auto
                          text-[11px]
                          px-[10px] py-[4px]
                          rounded-full
                          border border-[#d4ff8f]
                          bg-[#AFFF33]
                          cursor-pointer
                          text-black
                        "
                      >
                        복사
                      </button>
                    </div>

                    <p className="m-0 text-[12px] leading-[1.7] whitespace-pre-line">
                      메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해
                      제공 받았습니다.
                      {"\n"}
                      {"\n"}
                      메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
                      {"\n"}
                      MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair
                      Special Set
                      {"\n"}
                      #선크림 #선세럼 #선크림추천
                      {"\n"}
                      https://bepla.in/HTtM
                    </p>
                  </div>

                  {/* [제목 키워드] */}
                  <div className="mt-4 pt-[10px] border-t border-[#eee]">
                    <div className="flex items-center mb-1">
                      <div className="font-bold">[제목 키워드]</div>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText("메디힐");
                        }}
                        className="
                          ml-auto
                          text-[11px]
                          px-[10px] py-[4px]
                          rounded-full
                          border border-[#d4ff8f]
                          bg-[#AFFF33]
                          cursor-pointer
                          text-black
                        "
                      >
                        복사
                      </button>
                    </div>

                    <p className="m-0 text-[12px] leading-[1.7]">메디힐</p>
                  </div>

                  {/* [유료 프로모션 체크] */}
                  <div className="mt-4 pt-[10px] border-t border-[#eee]">
                    <div className="flex items-center mb-1">
                      <div className="font-bold">[유료 프로모션 체크]</div>
                    </div>

                    <p className="m-0 text-[12px] leading-[1.7]">
                      Youtube 영상 옵션 &gt; 세부정보 &gt; &lsquo;유료 프로모션
                      라벨 추가&rsquo; 설정해 주세요.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* 하단 큰 배너 (이미지 접힘/펼침) */}
        {activeTab === "info" && (
          <section className="mb-4 px-5">
            <div
              ref={bannerRef}
              style={{ height: bannerHeight }}
              className="
                relative
                rounded-[16px]
                overflow-hidden
                transition-all duration-500 ease-in-out
              "
            >
              <Image
                src="/images/long.jpg"
                alt="배너"
                width={530}
                height={1200}
                className="w-full h-auto block"
              />

              {/* 오버레이 버튼 */}
              <div
                className="
                  absolute left-0 right-0 bottom-0
                  px-3 py-[14px]
                  box-border
                  flex justify-center
                "
              >
                <button
                  onClick={() => setIsBannerOpen((prev) => !prev)}
                  className="
                    w-full
                    py-[10px]
                    rounded-[6px]
                    border border-white/90
                    bg-black/35
                    text-white
                    text-[13px] font-medium
                    cursor-pointer
                    backdrop-blur-[2px]
                  "
                >
                  {isBannerOpen ? "제품 정보 접기 ▲" : "제품 정보 펼쳐보기 ▼"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 고정 신청하기 버튼 */}
      <div
        className="
          fixed left-1/2 bottom-0 w-full max-w-[530px] -translate-x-1/2
          px-3 py-[10px]
          bg-black/25
          backdrop-blur
          box-border
          flex justify-center
          z-20
        "
      >
        <div className="w-full max-w-[480px] bg-transparent rounded-[10px] px-3 pb-3 box-border">
          <div className="text-[12px] text-[#555] text-center mb-1.5">
            모집 마감: 11/13(목) | 당첨자 발표: 11/14(금)까지
          </div>

          <button
            onClick={() => router.push("/campaign-apply/step1")}
            className="
              w-full
              py-3
              rounded-[8px]
              border-0
              bg-[#AFFF33]
              text-black
              text-[15px] font-semibold
              cursor-pointer
            "
          >
            신청하기
          </button>
        </div>
      </div>
    </main>
  );
}
