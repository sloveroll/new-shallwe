"use client";

import React from "react";

type Props = {
  open: boolean;
  onConfirm: () => void; // 확인 버튼 클릭
};

export default function ApplyCompleteModal({ open, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        bg-black/50
        p-5
      "
    >
      <div
        className="
          w-full max-w-[360px]
          rounded-xl bg-white
          px-5 py-6
          text-center leading-relaxed
        "
      >
        <div className="mb-3 text-[15px]">
          신청이 완료되었어요.
        </div>

        <div className="mb-6 text-[14px]">
          선정 결과는 <strong>선정자에 한해</strong>
          <br />
          <strong>11/10(월)까지</strong> 안내해 드려요.
        </div>

        <button
          onClick={onConfirm}
          className="
            w-full
            rounded-lg
            bg-[#AFFF33]
            py-3
            text-[15px] font-bold
            cursor-pointer
          "
        >
          확인
        </button>
      </div>
    </div>
  );
}
