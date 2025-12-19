"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SurveyRegisterConfirmModal from "../../components/modal/SurveyRegisterConfirmModal";
import SubPageHeader from "../../components/common/SubPageHeader";

export default function SurveyRegisterClient() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);

  const toggleEffect = (value: string) => {
    setSelectedEffects((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <main className="bg-white">
      <div className="w-full max-w-[530px] mx-auto box-border">
        <SubPageHeader title="설문 등록" />

        <div className="px-5 pt-4">
          {/* 1. 경고 배너 */}
          <section
            className="
              mb-[10px]
              w-full
              rounded-[8px]
              bg-[#F5F5F5]
              px-4 py-4
              text-[13px]
              text-center
            "
          >
            ⚠️ 설문 등록 기간이{" "}
            <strong className="text-[#ff3b30] underline">2일 경과</strong>하여
            캐시가 <strong className="text-[#ff3b30] underline">80%만 지급</strong>
            될 예정이에요.
          </section>

          {/* 2. 캠페인 요약 박스 */}
          <section
            className="
              mb-6
              rounded-[12px]
              bg-[#F5F5F5]
              p-5
              text-[12px]
              leading-relaxed
            "
          >
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/images/common/shorts.png"
                alt="shorts"
                className="h-[20px] w-auto object-contain"
              />
            </div>

            <div className="text-[15px] font-bold mb-1">아르마니 뷰티</div>
            <div className="text-[13px] text-[#444] mb-4">
              요즘 잘 쓰는 아이템 추천템
            </div>

            <div className="h-[1px] bg-[#ddd] mb-3"></div>

            <div className="text-[12px] font-bold mb-1">
              콘텐츠 등록 기간 : 11/16(일) - 11/27(목)
            </div>
            <div className="text-[11px] text-[#ff3b30]">
              *콘텐츠 등록 기간 내 콘텐츠와 설문이 모두 등록되어야 해요.
            </div>
          </section>

          {/* 3. 설문 문항들 */}
          <div className="pb-10">
            {/* Q1 */}
            <section className="mb-8">
              <div className="text-[14px] font-bold mb-3 leading-[1.4]">
                사용 후 외부 자극으로 손상된 피부장벽이
                <br />
                개선된 느낌을 받으셨나요?
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q1"
                    className="
                      appearance-none
                      min-w-[18px] min-h-[18px] w-[18px] h-[18px]
                      rounded-full
                      border border-[#ddd]
                      bg-white
                      checked:bg-[#AFFF33]
                      checked:border-[5px]
                      checked:border-white
                      checked:ring-1
                      checked:ring-[#ddd]
                      cursor-pointer
                    "
                  />
                  <span className="text-[13px]">네</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q1"
                    className="
                      appearance-none
                      min-w-[18px] min-h-[18px] w-[18px] h-[18px]
                      rounded-full
                      border border-[#ddd]
                      bg-white
                      checked:bg-[#AFFF33]
                      checked:border-[5px]
                      checked:border-white
                      checked:ring-1
                      checked:ring-[#ddd]
                      cursor-pointer
                    "
                  />
                  <span className="text-[13px]">아니요</span>
                </label>
              </div>
            </section>

            {/* Q2 */}
            <section className="mb-8">
              <div className="text-[14px] font-bold mb-2">
                추천한다면 누구에게 추천하고 싶은가요?
              </div>
              <input
                type="text"
                placeholder="친구, 지인"
                className="
                  w-full
                  rounded-[8px]
                  border border-[#ccc]
                  px-4 py-3
                  text-[13px]
                  box-border
                  outline-none
                "
              />
            </section>

            {/* Q3 */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-[14px] font-bold">
                  제품에 기대한 효과는?
                </div>
                <span className="text-[12px] text-[#999]">
                  복수 선택이 가능해요
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "수분감 개선",
                  "슬로우 에이징",
                  "피부결 개선",
                  "브라이트닝",
                  "피부 장벽 강화",
                ].map((item) => {
                  const isSelected = selectedEffects.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleEffect(item)}
                      className={`
                        px-3 py-[7px]
                        text-[12px]
                        rounded-full
                        border
                        transition-colors
                        flex items-center gap-1
                        ${
                          isSelected
                            ? "bg-[#AFFF33] border-[#AFFF33] text-black font-bold"
                            : "bg-white border-[#ddd] text-[#333]"
                        }
                      `}
                    >
                      {item}
                      {isSelected && <span className="text-[10px]">✕</span>}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Q4 */}
            <section className="mb-8">
              <div className="text-[14px] font-bold mb-3">
                제품을 재구매할 의사가 있나요?
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q4"
                    className="
                      appearance-none
                      min-w-[18px] min-h-[18px] w-[18px] h-[18px]
                      rounded-full
                      border border-[#ddd]
                      bg-white
                      checked:bg-[#AFFF33]
                      checked:border-[5px]
                      checked:border-white
                      checked:ring-1
                      checked:ring-[#ddd]
                      cursor-pointer
                    "
                  />
                  <span className="text-[13px]">네</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q4"
                    className="
                      appearance-none
                      min-w-[18px] min-h-[18px] w-[18px] h-[18px]
                      rounded-full
                      border border-[#ddd]
                      bg-white
                      checked:bg-[#AFFF33]
                      checked:border-[5px]
                      checked:border-white
                      checked:ring-1
                      checked:ring-[#ddd]
                      cursor-pointer
                    "
                  />
                  <span className="text-[13px]">아니요</span>
                </label>
              </div>
            </section>

            {/* Q5 */}
            <section className="mb-8">
              <div className="text-[14px] font-bold mb-3">
                제품을 지인에게 추천할 의사가 있나요?
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q5"
                    className="
                      appearance-none
                      min-w-[18px] min-h-[18px] w-[18px] h-[18px]
                      rounded-full
                      border border-[#ddd]
                      bg-white
                      checked:bg-[#AFFF33]
                      checked:border-[5px]
                      checked:border-white
                      checked:ring-1
                      checked:ring-[#ddd]
                      cursor-pointer
                    "
                  />
                  <span className="text-[13px]">네</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="q5"
                    className="
                      appearance-none
                      min-w-[18px] min-h-[18px] w-[18px] h-[18px]
                      rounded-full
                      border border-[#ddd]
                      bg-white
                      checked:bg-[#AFFF33]
                      checked:border-[5px]
                      checked:border-white
                      checked:ring-1
                      checked:ring-[#ddd]
                      cursor-pointer
                    "
                  />
                  <span className="text-[13px]">아니요</span>
                </label>
              </div>
            </section>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="
          w-full
          py-4
          border-0
          bg-[#AFFF33]
          text-[16px] font-bold
          cursor-pointer
          sticky bottom-0
        "
      >
        등록하기
      </button>

      {/* SurveyRegisterConfirmModal 모달 */}
      <SurveyRegisterConfirmModal
        open={showModal}
        onConfirm={() => {
          // TODO: 실제 API 호출 후 이동
          router.push("/");
        }}
        onCancel={() => setShowModal(false)}
      />
    </main>
  );
}
