"use client";

import React from "react";

interface Props {
  startDate: string;
  endDate: string;
  onOpenDatePicker: (target: "start" | "end") => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function PeriodSelectModal({
  startDate,
  endDate,
  onOpenDatePicker,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[90%] max-w-[500px] rounded-2xl bg-white p-6 shadow-lg">
        {/* Title */}
        <h2 className="mb-6 text-[18px] font-bold">기간 선택</h2>

        {/* 전체 체크 */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[15px]">전체</span>
          <input type="checkbox" className="h-5 w-5" />
        </div>

        <hr className="mb-5" />

        {/* 시작일 */}
        <button
          className="mb-4 flex w-full items-center justify-between"
          onClick={() => onOpenDatePicker("start")}
        >
          <span className="text-[14px] font-semibold">시작일</span>
          <span className="flex items-center gap-2 text-[14px]">
            {startDate} <span className="text-[18px]">›</span>
          </span>
        </button>

        {/* 종료일 */}
        <button
          className="mb-8 flex w-full items-center justify-between"
          onClick={() => onOpenDatePicker("end")}
        >
          <span className="text-[14px] font-semibold">종료일</span>
          <span className="flex items-center gap-2 text-[14px]">
            {endDate} <span className="text-[18px]">›</span>
          </span>
        </button>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            className="flex-1 rounded-xl bg-[#a5ff3f] py-3 text-[15px] font-bold"
          >
            조회하기
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-[#eee] py-3 text-[15px] font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
