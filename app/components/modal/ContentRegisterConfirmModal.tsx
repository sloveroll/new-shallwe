"use client";

import React from "react";

type Props = {
  open: boolean;
  onConfirm: () => void; // 등록하기 클릭
  onCancel: () => void;  // 취소 클릭
};

export default function RegisterConfirmModal({ open, onConfirm, onCancel }: Props) {
  if (!open) return null; // 열려있지 않으면 렌더 안 함

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
          pt-10 pb-8 px-8
          box-border
          shadow-lg
          text-center
        "
      >
        <h3
          className="
            text-base font-bold
            mb-2
          "
        >
          협업 콘텐츠를 등록할까요?
        </h3>

        <p
          className="
            text-sm
            leading-relaxed
            mb-4
          "
        >
          담당자 승인 전일 경우,
          <br />
          등록 기간 내 얼마든지 수정이 가능해요.
        </p>

        <div
          className="
            mt-1
            flex
            gap-2
          "
        >
          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1
              py-2.5
              rounded-full
              border-0
              bg-[#AFFF33]
              text-sm font-bold
              cursor-pointer
            "
          >
            등록하기
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1
              py-2.5
              rounded-full
              border border-[#dddddd]
              bg-white
              text-sm font-medium
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
