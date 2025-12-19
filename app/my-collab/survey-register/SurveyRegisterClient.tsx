"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SurveyRegisterConfirmModal from "../../components/modal/SurveyRegisterConfirmModal";
import SubPageHeader from "../../components/common/SubPageHeader";

export default function SurveyRegisterClient() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="bg-white min-h-screen">
      <div className="w-full max-w-[530px] mx-auto box-border">
        <SubPageHeader title="설문 등록" />

        <div className="px-5 pt-4 pb-5">

        {/* 1) 경고 배너 */}
        <section
          className="
            mb-[18px]
            w-[90%]
            mx-auto
            rounded-full
            border border-[#ff3b30]
            px-[14px] py-2.5
            text-[12px]
            text-center
          "
        >
          설문 등록 기간이 <strong className="text-[#ff3b30]">2일 경과</strong>
          하여 캐시가 <strong className="text-[#ff3b30]">80%만 지급</strong>될
          예정이에요.
        </section>

        {/* 2) 캠페인 요약 */}
        <section
          className="
            mb-7
            rounded-[14px]
            bg-[#fafafa]
            px-3 py-3
            text-[12px]
            leading-relaxed
          "
        >
          <span
            className="
              inline-block
              text-[11px]
              px-[6px] py-[2px]
              rounded
              border border-black
              mb-2.5
            "
          >
            쇼츠
          </span>

          <div className="text-[13px] mb-1.5">
            <strong>[메디힐, 비플레인]</strong> 요즘 잘 쓰는 아이템 추천템 특집
            캠페인명 두줄 일 때
          </div>

          <ul className="pl-4 m-0 leading-[1.7] list-disc">
            <li>
              <strong>콘텐츠 등록 기간: 11/16(일) ~ 11/27(목)</strong>
            </li>
            <li>※ 콘텐츠 등록 기간 내 콘텐츠와 설문이 모두 등록되어야 해요.</li>
          </ul>
        </section>

        {/* -------------------------------------------------- */}
        {/* 3) 설문 문항들 */}
        {/* -------------------------------------------------- */}

        {/* Q1 */}
        <section className="mb-5">
          <div className="text-[14px] font-semibold mb-2.5">
            사용 후 외부 자극으로 손상된 피부장벽이 개선된 느낌을 받으셨나요?
          </div>

          <label className="flex items-center gap-2 text-[13px] mb-2">
            <input type="radio" name="q1" />
            <span>네</span>
          </label>

          <label className="flex items-center gap-2 text-[13px] mb-2">
            <input type="radio" name="q1" />
            <span>아니요</span>
          </label>
        </section>

        {/* Q2 */}
        <section className="mb-6">
          <div className="text-[14px] font-semibold mb-2">
            추천한다면 누구에게 추천하고 싶은가요?
          </div>
          <input
            type="text"
            className="
              w-full
              rounded-[8px]
              border border-[#eee]
              px-3 py-2.5
              text-[13px]
              box-border
              outline-none
            "
          />
        </section>

        {/* Q3 체크박스 */}
        <section className="mb-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-[14px] font-semibold">
              제품에 기대한 효과는?
            </div>
            <span
              className="
                text-[11px]
                px-[6px] py-[2px]
                rounded-full
                border border-[#ccc]
              "
            >
              복수 응답
            </span>
          </div>

          {[
            "수분감 개선",
            "슬로우에이징",
            "피부결 개선",
            "브라이트닝",
            "피부 장벽 강화",
          ].map((label) => (
            <label
              key={label}
              className="flex items-center gap-2 text-[13px] mb-2"
            >
              <input type="checkbox" />
              <span>{label}</span>
            </label>
          ))}
        </section>

        {/* Q4 */}
        <section className="mb-5">
          <div className="text-[14px] font-semibold mb-2.5">
            제품을 재구매할 의사가 있나요?
          </div>

          <label className="flex items-center gap-2 text-[13px] mb-2">
            <input type="radio" name="q4" />
            <span>네</span>
          </label>

          <label className="flex items-center gap-2 text-[13px] mb-2">
            <input type="radio" name="q4" />
            <span>아니요</span>
          </label>
        </section>

        {/* Q5 */}
        <section>
          <div className="text-[14px] font-semibold mb-2.5">
            제품을 지인에게 추천할 의사가 있나요?
          </div>

          <label className="flex items-center gap-2 text-[13px] mb-2">
            <input type="radio" name="q5" />
            <span>네</span>
          </label>

          <label className="flex items-center gap-2 text-[13px] mb-2">
            <input type="radio" name="q5" />
            <span>아니요</span>
          </label>
        </section>
      </div>

      {/* 하단 등록하기 버튼 */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="
            w-full
            mt-[30px]
            py-[14px]
            rounded-[8px]
            border-0
            bg-[#AFFF33]
            text-[15px] font-bold
            cursor-pointer
          "
      >
        등록하기
      </button>
      </div>

      {/* 등록 모달 */}
      <SurveyRegisterConfirmModal
        open={showModal}
        onConfirm={() => router.push("/")}
        onCancel={() => setShowModal(false)}
      />
    </main>
  );
}
