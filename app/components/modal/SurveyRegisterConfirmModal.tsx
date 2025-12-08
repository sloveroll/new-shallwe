"use client";

import React from "react";

export default function SurveyRegisterConfirmModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/45
      "
    >
      <div
        className="
          w-full max-w-sm
          bg-white
          rounded-2xl
          px-7 pt-9 pb-7
          text-center
          box-border
          shadow-lg
        "
      >
        {/* 제목 */}
        <h3 className="text-base font-bold mb-2.5">
          설문을 등록할까요?
        </h3>

        {/* 설명 */}
        <p className="text-sm leading-relaxed mb-5 text-[#444]">
          등록 기간 내, 담당자 승인 전일 경우
          <br />
          변경이 가능해요.
        </p>

        {/* 버튼 그룹 */}
        <div className="flex gap-2 mt-1">
          {/* 등록하기 */}
          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1
              py-2.5
              rounded-full
              bg-[#AFFF33]
              text-sm font-bold
              cursor-pointer
            "
          >
            등록하기
          </button>

          {/* 취소 */}
          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1
              py-2.5
              rounded-full
              bg-[#D0D4C8]
              text-sm font-semibold
              cursor-pointer
            "
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
