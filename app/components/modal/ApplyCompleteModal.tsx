"use client";

import React from "react";
import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  onConfirm: () => void;
};

export default function ApplyCompleteModal({ open, onConfirm }: Props) {
  return (
    <BaseModal open={open} onClose={onConfirm}>
      <div className="leading-relaxed">
        <div className="mb-3 text-[18px] font-bold">신청이 완료되었어요.</div>

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
    </BaseModal>
  );
}
