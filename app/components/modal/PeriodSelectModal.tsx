"use client";

import React from "react";

interface Props {
  startDate: string;
  endDate: string;
  isAllPeriod: boolean;
  onOpenDatePicker: (target: "start" | "end") => void;
  onClose: () => void;
  onSubmit: () => void;
  onDateChange: (start: string, end: string) => void;
  onAllPeriodChange: (isAll: boolean) => void;
}

export default function PeriodSelectModal({
  startDate,
  endDate,
  isAllPeriod,
  onOpenDatePicker,
  onClose,
  onSubmit,
  onAllPeriodChange,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[400px] overflow-hidden rounded-[20px] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[20px] font-bold mb-6 text-left">기간 선택</h2>

        {/* 전체 선택 */}
        <div
          className="flex items-center justify-between py-4 border-b border-[#f0f0f0] cursor-pointer"
          onClick={() => onAllPeriodChange(!isAllPeriod)}
        >
          <span className="text-[16px] font-bold">전체</span>
          <div
            className={`w-6 h-6 border rounded-[4px] flex items-center justify-center transition-colors ${
              isAllPeriod ? "bg-black border-black" : "border-[#ccc] bg-white"
            }`}
          >
            {isAllPeriod && (
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5L4.5 8.5L13 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>

        {/* 기간 선택 영역 */}
        <div
          className={`mt-4 space-y-4 pb-6 border-b border-[#f0f0f0] mb-6 ${
            isAllPeriod ? "opacity-30 pointer-events-none" : ""
          }`}
        >
          {/* 시작일 */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => onOpenDatePicker("start")}
          >
            <span className="text-[15px] font-bold">시작일</span>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold">{startDate}</span>
              <span>❯</span>
            </div>
          </div>

          {/* 종료일 */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => onOpenDatePicker("end")}
          >
            <span className="text-[15px] font-bold">종료일</span>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold">{endDate}</span>
              <span>❯</span>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSubmit}
            className="flex-1 rounded-[12px] bg-[#a5ff3f] py-[14px] text-[16px] font-bold text-black hover:brightness-95 active:scale-[0.98] transition-all"
          >
            조회하기
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-[12px] bg-[#eee] py-[14px] text-[16px] font-bold text-[#555] hover:bg-[#e0e0e0] active:scale-[0.98] transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
