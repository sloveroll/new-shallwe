// components/modal/RegisterConfirmModal.tsx
"use client";

import React from "react";
import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  onConfirm: () => void; // 등록하기 클릭
  onCancel: () => void;  // 취소 클릭
};

export default function RegisterConfirmModal({
  open,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <BaseModal
      open={open}
      onClose={onCancel}
      maxWidthClass="max-w-[320px] rounded-[24px] overflow-hidden"
      padding="p-0"
    >
      {/* 상단 이미지 영역 */}
      <div className="bg-[#2C2C2C] flex items-center justify-center pt-8 pb-3">
        <img
          src="/images/my-collab/pop-register.png"
          alt="register confirm"
          className="w-[200px] h-auto object-contain"
        />
      </div>

      <div className="bg-white px-5 pt-5 pb-5 flex flex-col items-center">
        <h3 className="text-[18px] font-bold mb-3 text-center text-[#111]">
          협업 콘텐츠를 등록할까요?
        </h3>

        <p className="text-[14px] leading-[1.5] mb-6 text-center text-[#333]">
          담당자 승인 전일 경우,
          <br />
          등록 기간 내 얼마든지 수정이 가능해요.
        </p>

        <div className="w-full flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1
              h-[48px]
              rounded-[12px]
              border-0
              bg-[#AFFF33]
              text-[15px] font-bold
              text-black
              cursor-pointer
              transition-colors
              hover:bg-[#9ee62e]
            "
          >
            등록하기
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1
              h-[48px]
              rounded-[12px]
              border-0
              bg-[#EFEFEF]
              text-[15px] font-bold
              text-[#333]
              cursor-pointer
              transition-colors
              hover:bg-[#e5e5e5]
            "
          >
            취소
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
