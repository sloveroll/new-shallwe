"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SubPageHeader from "../components/common/SubPageHeader";

type Tab = "info" | "guide";

interface CampaignDetailContentProps {
  campaignData: {
    // TODO: 실제 DB 스키마에 맞게 타입 정의
    id: string;
    type: string;
    total: number;
    current: number;
    dDay: string;
    brand: string;
    product: string;
    imageUrl: string;
    imageAlt: string;
    contentPeriod?: string;
    reviewDeadline?: string;
    cashPaymentDate?: string;
    contentMaintainPeriod?: string;
    deadline?: string;
    announcementDate?: string;
  };
}

export default function CampaignDetailContent({
  campaignData,
}: CampaignDetailContentProps) {
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
    <>
      {/* 상단: 헤더 (흰색 배경) */}
      <SubPageHeader title={`${campaignData.brand} 외 1종`} />

      {/* 상단: 뒤로가기 + 대표 이미지 */}
      <section className="relative bg-[#f5f5f5]">
        {/* 상품 이미지 영역 */}
        <div className="w-full h-[360px] relative">
          <Image
            src={campaignData.imageUrl}
            alt={campaignData.imageAlt}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </section>

      {/* 캠페인 기본 정보 */}
      <section className="px-5 pt-4 pb-4">
        {/* 태그/지원자수/D-day */}
        <div className="flex items-center gap-2 mb-3">
          {/* 타입 뱃지 */}
          <Image
            src="/images/common/shorts.png"
            alt={campaignData.type}
            width={58}
            height={22}
            className="w-auto h-[20px]"
          />

          {/* 모집 인원 */}
          <span
            className="
              text-[11px] font-medium
              px-[6px] py-[2px]
              border border-[#333]
              rounded-[4px]
              bg-white text-[#333]
            "
          >
            {campaignData.total}명 | <strong>{campaignData.current}명</strong>
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
            {campaignData.dDay}
          </span>
        </div>

        {/* 상품명/제품 */}
        <div className="text-[18px] font-bold mb-1 text-black">
          {campaignData.brand}
        </div>

        <div className="text-[16px] leading-[1.4] mb-6 text-[#111]">
          {campaignData.product}
        </div>

        {/* 정보 리스트 */}
        <div className="flex flex-col gap-2 text-[13px] text-[#333]">
          {/* 지급 캐시 */}
          <div className="flex items-start">
            <span className="font-bold w-[100px] shrink-0">지급 캐시</span>
            <span className="font-medium">
              <span className="text-[#AFFF33] font-bold underline cursor-pointer mr-1">
                로그인
              </span>
              후 확인 가능
            </span>
          </div>

          {/* 콘텐츠 등록기간 */}
          {campaignData.contentPeriod && (
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">
                콘텐츠 등록기간
              </span>
              <span className="font-medium">{campaignData.contentPeriod}</span>
            </div>
          )}

          {/* 사전 검수 마감일 */}
          {campaignData.reviewDeadline && (
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">사전 검수 마감일</span>
              <span className="font-medium">{campaignData.reviewDeadline}</span>
            </div>
          )}

          {/* 캐시 지급일 */}
          {campaignData.cashPaymentDate && (
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">캐시 지급일</span>
              <span className="font-medium">{campaignData.cashPaymentDate}</span>
            </div>
          )}

          {/* 콘텐츠 유지 기간 */}
          {campaignData.contentMaintainPeriod && (
            <div className="flex items-start">
              <span className="font-bold w-[100px] shrink-0">
                콘텐츠 유지 기간
              </span>
              <span className="font-medium">
                {campaignData.contentMaintainPeriod}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 탭 영역 */}
      <section className="bg-[#f5f5f5] pt-3">
        <div className="flex border-b border-[#eee] mb-0 bg-white pt-5 sticky top-0 z-50">
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
                  ? "font-bold text-[#111] border-b-2 border-b-[#AFFF33]"
                  : "font-medium text-[#888] border-b-2 border-b-transparent"
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
                  ? "font-bold text-[#111] border-b-2 border-b-[#AFFF33]"
                  : "font-medium text-[#888] border-b-2 border-b-transparent"
              }
            `}
          >
            콘텐츠 가이드
          </button>
        </div>

        {/* 탭 내용 - 탭별 배경색 분기 처리 */}
        <div
          className={` ${
            activeTab === "info" ? "bg-[#f5f5f5]" : "bg-white pt-5"
          }`}
        >
          {activeTab === "info" ? (
            <>
              {/* 희망 크리에이터 카드 */}
              <div className="bg-white rounded-[8px] p-[14px] mb-3 mt-3 mx-5 shadow-sm">
                <div className="flex items-center gap-[5px] mb-1.5">
                  <Image
                    src="/images/common/ic-winklogo.png"
                    alt="희망 크리에이터"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                  <div className="text-[16px] font-bold">희망 크리에이터</div>
                </div>
                <p className="text-[13px] text-[#666] mb-2">
                  브랜드는 이런 크리에이터님을 선호해요!
                </p>
                
                {/* 수평선 */}
                <div className="border-b border-[#eee] mb-3"></div>

                {/* 키-값 쌍 형태로 표시 */}
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#444]">피부타입</span>
                    <span className="text-[#444] font-bold">복합성, 민감성</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#444]">피부고민</span>
                    <span className="text-[#444] font-bold">여드름, 주름, 기미</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#444]">시청자 타겟 연령대&성별</span>
                    <span className="text-[#444] font-bold">18-24세 여성</span>
                  </div>
                </div>
              </div>

              {/* 유의사항 카드 */}
              <div className="bg-white rounded-[8px] p-[14px] mb-3 mx-5 shadow-sm">
                <div className="flex items-center gap-[5px] mb-1.5">
                  <Image
                    src="/images/common/ic-lookinglogo.png"
                    alt="유의사항"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                  <div className="text-[16px] font-bold">유의 사항</div>
                </div>

                {/* 수평선 */}
                <div className="border-b border-[#eee] mb-3"></div>

                {/* 체크마크 항목들 - 연두색 박스 없이 */}
                <div className="mb-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#AFFF33] font-bold text-[13px] mt-1">✅</span>
                    <div>
                      <span className="text-[13px] font-bold text-[#444]">2차 활용</span>
                      <span className="text-[13px] text-[#5d5d5d] ml-1">
                        *협업 영상이 상업적으로 활용될 수 있습니다.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#AFFF33] font-bold text-[13px] mt-1">✅</span>
                    <div>
                      <span className="text-[13px] font-bold text-[#444]">클린본 제출</span>
                      <span className="text-[13px] text-[#5d5d5d] ml-1">
                        *BGM, 효과음 등을 제거한 영상 제출이 필수입니다.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-[13px] text-[#444]">
                  <div>유튜브 제품 태그 필수</div>
                  <div>추가 제공품 노출 필수</div>
                  <div>협업금에 2차 활용 비용 포함</div>
                </div>
              </div>

              {/* 협업 제품 / 단순 선물 카드 2개 */}
              <div className="flex gap-3 mb-6 mx-5">
                <div className="flex-1 bg-white rounded-[8px] p-[10px] relative shadow-sm">
                  {/* 제품 플래그 - 다크 그레이 배경, 흰색 텍스트 */}
                  <div className="absolute top-[5px] left-[4px] bg-[#333] h-[18px] px-2 flex items-center rounded-[2px] z-10">
                    <span className="text-[10px] font-medium text-white">
                      협업제품
                    </span>
                  </div>

                  <div className="w-full h-[112px] relative mb-2 mt-3 bg-[#f5f5f5] rounded-[4px]">
                    <Image
                      src="/images/sample.png"
                      alt="협업 제품"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="text-[12px] font-bold mb-1 text-black">아르마니 뷰티</div>
                  <div className="text-[12px] font-medium mb-1 text-[#444]">
                    NEW 파워 패브릭 PRO 파운데이션
                  </div>
                  <div className="text-[14px] font-bold text-black">80,000원</div>
                </div>

                <div className="flex-1 bg-white rounded-[8px] p-[10px] relative shadow-sm">
                  {/* 제품 플래그 - 다크 그레이 배경, 흰색 텍스트 */}
                  <div className="absolute top-[5px] left-[4px] bg-[#333] h-[18px] px-2 flex items-center rounded-[2px] z-10">
                    <span className="text-[10px] font-medium text-white">
                      단순선물
                    </span>
                  </div>

                  <div className="w-full h-[112px] relative mb-2 mt-3 bg-[#f5f5f5] rounded-[4px]">
                    <Image
                      src="/images/sample.png"
                      alt="단순 선물"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="text-[12px] font-bold mb-1 text-black">아르마니 뷰티</div>
                  <div className="text-[12px] font-medium mb-1 text-[#444]">
                    립 마에스트로 사틴
                  </div>
                  <div className="text-[14px] font-bold text-black">40,000원</div>
                </div>
              </div>

              {/* 하단 큰 배너 (이미지 접힘/펼침) */}
              <section>
                <div
                  ref={bannerRef}
                  style={{ height: bannerHeight }}
                  className="
                    relative
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
                        rounded-full
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
            </>
          ) : (
          // 콘텐츠 가이드 탭 내용
          <>
            {/* 상단 안내 배너 (Lime Green) */}
            <div
              className="
                relative
                mx-5 mb-6
                bg-[#AFFF33]
                rounded-[12px]
                px-4 py-3
                flex items-center justify-center
              "
            >
              {/* 왼쪽: 로고 (절대 위치) */}
              <Image
                src="/images/campaign-detail/ic-print-logo.png"
                alt="Print Logo"
                width={36}
                height={36}
                className="absolute left-4 object-contain"
              />

              {/* 중앙: 텍스트 */}
              <div className="text-[12px] font-bold text-black leading-tight text-center">
                참고자료 외 모든 항목이
                <br />
                콘텐츠 내 전부 반영되어야 합니다.
              </div>

              {/* 오른쪽: 인쇄 버튼 (절대 위치) */}
              <button
                onClick={() => window.print()}
                className="
                  absolute right-4
                  flex items-center gap-1
                  bg-black text-white
                  text-[11px] font-bold
                  px-3 py-1.5
                  rounded-[4px]
                  cursor-pointer
                "
              >
                인쇄
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
              </button>
            </div>

            {/* 유의사항 박스 (회색 배경) */}
            <div className="mx-5 mb-8 bg-[#f5f5f5] rounded-[16px] p-5">
              {/* 타이틀 */}
              <div className="flex items-center gap-1.5 mb-3">
                <Image
                  src="/images/common/ic-lookinglogo.png"
                  alt="icon"
                  width={15}
                  height={15}
                />
                <h3 className="text-[16px] font-bold text-black m-0">
                  유의 사항
                </h3>
              </div>

              {/* 체크리스트 */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-1.5">
                  <span className="text-[#AFFF33] font-bold text-[12px]">✅</span>
                  <div className="text-[13px] leading-snug">
                    <span className="font-bold text-black">2차 활용</span>
                    <span className="text-[#666] ml-1">
                      *협업 영상이 상업적으로 활용될 수 있습니다.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#AFFF33] font-bold text-[12px]">✅</span>
                  <div className="text-[13px] leading-snug">
                    <span className="font-bold text-black">클린본 제출</span>
                    <span className="text-[#666] ml-1">
                      *BGM, 효과음 등을 제거한 영상 제출이 필수입니다.
                    </span>
                  </div>
                </div>
              </div>

              {/* 일반 텍스트 목록 */}
              <div className="text-[13px] text-[#444] space-y-1 pl-1">
                <p>유튜브 제품 태그 필수</p>
                <p>추가 제공품 노출 필수</p>
                <p>협업금에 2차 활용 비용 포함</p>
              </div>
            </div>

            {/* 섹션 컨테이너 */}
            <div className="mx-5 space-y-8 pb-10">
              {/* 1. 광고 표기 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/images/common/ic-lookinglogo.png"
                      alt="icon"
                      width={15}
                      height={15}
                    />
                    <h3 className="text-[16px] font-bold text-black m-0">
                      광고 표기
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `영상 시작·중간·끝 광고 문구 반복 표기\n${campaignData.brand}의 유료광고를 포함하고 있습니다.`
                      );
                      alert("복사되었습니다!");
                    }}
                    className="bg-black text-[#AFFF33] text-[12px] font-bold px-3 py-1 rounded-[4px]"
                  >
                    복사
                  </button>
                </div>
                <div className="text-[13px] text-[#333] leading-relaxed pl-1">
                  <p className="mb-1">
                    영상 시작/중간/끝 광고 명시 문구 반복 표기
                  </p>
                  <p className="font-bold">
                    {campaignData.brand}의 유료광고를 포함하고 있습니다.
                  </p>
                </div>
              </div>

              {/* 2. 촬영/편집 가이드 */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Image
                    src="/images/common/ic-lookinglogo.png"
                    alt="icon"
                    width={15}
                    height={15}
                  />
                  <h3 className="text-[16px] font-bold text-black m-0">
                    촬영/편집 가이드
                  </h3>
                </div>
                <ul className="text-[13px] text-[#333] space-y-1.5 pl-1 m-0">
                  <li>-(롱폼) 영상 총 구간의 50% 이내 제품 소재 시작</li>
                  <li>-(쇼츠) 영상 시작 30초 이내 제품 소개 시작</li>
                  <li>
                    -(쇼츠) 영상 내 팝송, K-pop 등<br />
                    &nbsp;&nbsp;상업적 사용 불가한 BGM 삽입 금지
                  </li>
                  <li>
                    -본인 등장 및 직접 촬영/제작 필수
                    <br />
                    &nbsp;&nbsp;(타인의 리뷰 영상 짜깁기, Ai 활용 금지)
                  </li>
                  <li>-협업 제품과 동일 카테고리 제품 노출 및 비교 불가</li>
                  <li>
                    -협업 제품 노출 구간에 제품과 무관한
                    <br />
                    &nbsp;&nbsp;개인적인 이야기 언급 불가
                  </li>
                  <li>-가이드 내 전달되지 않은 별도 수익화 링크/태그 불가</li>
                </ul>
              </div>

              {/* 3. 노출 시간 */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Image
                    src="/images/common/ic-lookinglogo.png"
                    alt="icon"
                    width={15}
                    height={15}
                  />
                  <h3 className="text-[16px] font-bold text-black m-0">
                    노출 시간
                  </h3>
                </div>
                <div className="text-[13px] text-[#333] pl-1">30초</div>
              </div>
            </div>

            {/* 섹션 2: 브랜드 정보 */}
            <div>
              {/* 구분선 (회색 바) */}
              <div className="h-3 bg-[#f5f5f5] mb-6"></div>

              <div className="mx-5 pb-6">
                <div className="text-[18px] font-bold text-black border-b border-black mb-6 inline-block">
                  {campaignData.brand}
                </div>

                {/* [협업 제품] */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/images/common/ic-lookinglogo-2.png"
                        alt="icon"
                        width={15}
                        height={15}
                      />
                      <h3 className="text-[16px] font-bold text-black m-0">
                        협업 제품
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        const text = `${campaignData.brand}\nNEW 파워 패브릭 PRO 파운데이션\n80,000원`;
                        navigator.clipboard?.writeText(text);
                        alert("복사되었습니다!");
                      }}
                      className="bg-black text-[#AFFF33] text-[12px] font-bold px-3 py-1 rounded-[4px]"
                    >
                      복사
                    </button>
                  </div>
                  <div className="text-[14px] text-[#333] leading-[1.6] pl-1">
                    <p>{campaignData.brand}</p>
                    <p>NEW 파워 패브릭 PRO 파운데이션</p>
                    <p className="font-bold">80,000원</p>
                  </div>
                </div>

                {/* [언급 사항] */}
                <div className="mb-8">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Image
                      src="/images/common/ic-lookinglogo-2.png"
                      alt="icon"
                      width={15}
                      height={15}
                    />
                    <h3 className="text-[16px] font-bold text-black m-0">
                      언급 사항
                    </h3>
                  </div>
                  <div className="text-[14px] text-[#333] leading-[1.6] pl-1">
                    <p>물처럼 가볍고 산뜻촉촉한 가벼운 클렌징오일!</p>
                    <p>
                      333 세안법으로 자극, 눈시림 없이 순하게 눈에 보이는 피지,
                      블랙헤드 딥클렌징 가능!
                    </p>
                  </div>
                </div>

                {/* [연출 사항] */}
                <div className="mb-8">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Image
                      src="/images/common/ic-lookinglogo-2.png"
                      alt="icon"
                      width={15}
                      height={15}
                    />
                    <h3 className="text-[16px] font-bold text-black m-0">
                      연출 사항
                    </h3>
                  </div>
                  <ol className="text-[14px] text-[#333] leading-[1.6] pl-1 list-none m-0 space-y-1">
                    <li>1.하이라이터 사용 후 자연스러운 광채 연출</li>
                    <li>2.하이라이터 B&A컷</li>
                    <li>3.얼굴에 하이라이터 바르는 장면 연출</li>
                  </ol>
                </div>

                {/* [금지 사항] */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Image
                      src="/images/common/ic-lookinglogo-2.png"
                      alt="icon"
                      width={15}
                      height={15}
                    />
                    <h3 className="text-[16px] font-bold text-black m-0">
                      금지 사항
                    </h3>
                  </div>
                  <ol className="text-[14px] text-[#333] leading-[1.6] pl-1 list-none m-0 space-y-1">
                    <li>
                      1. &apos;가장&apos; &apos;제일&apos; 등 최상급 의미를 가진
                      표현 불가
                    </li>
                    <li>
                      2. 여드름 피부 전용(X), 여드름 피부가 사용 가능한(O)
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 섹션 3: 참고 자료 */}
            <div>
              {/* 구분선 (회색 바) */}
              <div className="h-3 bg-[#f5f5f5] mb-6"></div>

              <div className={`mx-5 ${isRefOpen ? "pb-10" : "pb-0"}`}>
                <div
                  className="flex items-center justify-between cursor-pointer mb-6"
                  onClick={() => setIsRefOpen((prev) => !prev)}
                >
                  <div className="text-[18px] font-bold text-black border-b border-black inline-block">
                    참고 자료
                  </div>
                  <div
                    className={`
                      text-[24px]
                      transition-transform duration-200
                      ${isRefOpen ? "rotate-180" : ""}
                    `}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {isRefOpen && (
                  <div className="space-y-8">
                    {/* [단순 선물] */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Image
                          src="/images/common/ic-lookinglogo-3.png"
                          alt="icon"
                          width={15}
                          height={15}
                        />
                        <h3 className="text-[16px] font-bold text-black m-0">
                          단순 선물
                        </h3>
                      </div>
                      <div className="text-[14px] text-[#333] leading-[1.6] pl-1">
                        <p>{campaignData.brand}</p>
                        <p>립 마에스트로 사틴</p>
                        <p className="font-bold">40,000원</p>
                      </div>
                    </div>

                    {/* [참고 사항] */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Image
                          src="/images/common/ic-lookinglogo-3.png"
                          alt="icon"
                          width={15}
                          height={15}
                        />
                        <h3 className="text-[16px] font-bold text-black m-0">
                          참고 사항
                        </h3>
                      </div>
                      <ol className="text-[14px] text-[#333] leading-[1.6] pl-1 list-none m-0 space-y-1">
                        <li>1.제품 특장점 소개</li>
                        <li>
                          1)올영 하이라이터 : 코덕&인플루언서 사이에서 인기
                          하이라이터
                        </li>
                        <li>
                          2)텍스처 : 가루날림이 적고, 들뜸 텁텀함 없이 밀착 됨
                          베이크드 텍스처
                        </li>
                        <li>
                          3)모공 요철 부각 없는 하이라이터 : 미세 파우더가
                          모공과 요철 사이를 커버하여 매끈한 결광 표현
                        </li>
                        <li>
                          4)멀티 유즈 : 치크로도 활용 가능(베이비 베리 빔 컬러)
                        </li>
                        <li>
                          5)얼굴형 커버 : 볼륨머로 활용 가능, 입체적인 이목구비
                          연출
                        </li>
                        <li>
                          6)아이돌 하이라이터 : 데일리 사용부터 아이돌처럼
                          화려한 맥시 볼륨광 연출 가능, 인생 셀카 연출
                        </li>
                      </ol>
                    </div>

                    {/* [레퍼런스 영상] */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Image
                          src="/images/common/ic-lookinglogo-3.png"
                          alt="icon"
                          width={15}
                          height={15}
                        />
                        <h3 className="text-[16px] font-bold text-black m-0">
                          레퍼런스 영상
                        </h3>
                      </div>
                      <div className="text-[14px] text-[#333] leading-[1.6] break-all underline pl-1">
                        <a
                          href="http://www.youtube.com/shorts/u2SvQgPmbw0"
                          target="_blank"
                          rel="noreferrer"
                          className="block mb-1"
                        >
                          http://www.youtube.com/shorts/u2SvQgPmbw0
                        </a>
                        <a
                          href="http://www.instagram.com/reel/DPlDaTPepnI/"
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                        >
                          http://www.instagram.com/reel/DPlDaTPepnI/
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 섹션 4: 더보기란 / 키워드 / 유료 프로모션 (마지막 섹션) */}
            <div>
              {/* 구분선 (회색 바) */}
              <div className="h-3 bg-[#f5f5f5] mb-6"></div>

              <div className="mx-5">
                {/* [더보기란 내용] */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/images/common/ic-lookinglogo-4.png"
                        alt="icon"
                        width={15}
                        height={15}
                      />
                      <h3 className="text-[16px] font-bold text-black m-0">
                        더보기란 내용
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        const text = `아르마니 뷰티의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공 받았습니다.\n\n아르마니 뷰티 NEW 파워 패브릭 PRO 파운데이션\nArmani Beauty NEW Power Fabric Pro Foundation\n#선크림 #선세럼 #선크림추천\nhttps://bepla.in/HTTnM`;
                        navigator.clipboard?.writeText(text);
                        alert("복사되었습니다!");
                      }}
                      className="bg-black text-[#AFFF33] text-[12px] font-bold px-3 py-1 rounded-[4px]"
                    >
                      복사
                    </button>
                  </div>
                  <div className="text-[14px] text-[#333] leading-[1.6] pl-1 break-words">
                    <p className="mb-4">
                      아르마니 뷰티의 유료 광고를 포함하고 있으며,
                      <br />
                      스튜디오 쉘위를 통해 제공 받았습니다.
                    </p>
                    <p>아르마니 뷰티 NEW 파워 패브릭 PRO 파운데이션</p>
                    <p>Armani Beauty NEW Power Fabric Pro Foundation</p>
                    <p>#선크림 #선세럼 #선크림추천</p>
                    <p>https://bepla.in/HTTnM</p>
                  </div>
                </div>

                {/* [제목 키워드] */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/images/common/ic-lookinglogo-4.png"
                        alt="icon"
                        width={15}
                        height={15}
                      />
                      <h3 className="text-[16px] font-bold text-black m-0">
                        제목 키워드
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        const text = `아르마니 뷰티`;
                        navigator.clipboard?.writeText(text);
                        alert("복사되었습니다!");
                      }}
                      className="bg-black text-[#AFFF33] text-[12px] font-bold px-3 py-1 rounded-[4px]"
                    >
                      복사
                    </button>
                  </div>
                  <div className="text-[14px] text-[#333] leading-[1.6] pl-1">
                    아르마니 뷰티
                  </div>
                </div>

                {/* [유료 프로모션 체크] */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Image
                      src="/images/common/ic-lookinglogo-4.png"
                      alt="icon"
                      width={15}
                      height={15}
                    />
                    <h3 className="text-[16px] font-bold text-black m-0">
                      유료 프로모션 체크
                    </h3>
                  </div>
                  <div className="text-[14px] text-[#333] leading-[1.6] pl-1">
                    Youtube 영상 옵션 &gt; 세부정보 &gt; &apos;유료 프로모션 라벨
                    추가&apos; 설정해주세요.
                  </div>
                </div>
              </div>
            </div>
          </>
          )}
        </div>
      </section>



      {/* 고정 신청하기 버튼 */}
      <div
        className="
          fixed left-1/2 bottom-0 w-full max-w-[530px] -translate-x-1/2
          z-20
        "
      >
        {/* 모집 마감 텍스트 영역 - 검정 배경, 연두색 텍스트 */}
        {(campaignData.deadline || campaignData.announcementDate) && (
          <div className="w-full bg-black py-3 px-4 text-center">
            <div className="text-[12px] text-[#AFFF33]">
              {campaignData.deadline && `모집기간 : ${campaignData.deadline}`}
              {campaignData.deadline && campaignData.announcementDate && " | "}
              {campaignData.announcementDate &&
                `당첨자 발표 : ${campaignData.announcementDate}까지`}
            </div>
          </div>
        )}

        {/* 신청하기 버튼 - 연두색 배경, 가로 꽉 차게, 아래 패딩 없음 */}
        <button
          onClick={() => router.push("/campaign-apply/step1")}
          className="
            w-full
            py-4
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
    </>
  );
}
