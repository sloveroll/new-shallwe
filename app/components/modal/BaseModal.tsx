// components/common/BaseModal.tsx
"use client";

import React from "react";

type BaseModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  maxWidthClass?: string; // 모달 너비 커스터마이징
  padding?: string; // 패딩 커스터마이징 (기본값: p-6)
};

export default function BaseModal({
  open,
  onClose,
  children,
  maxWidthClass = "max-w-[360px]",
  padding = "p-6",
}: BaseModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[1000]
        flex items-center justify-center
        bg-black/40
        p-5
      "
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className={`
          w-full ${maxWidthClass}
          rounded-2xl bg-white
          ${padding} shadow-lg
          text-center
        `}
        onClick={(e) => e.stopPropagation()} // 내용 클릭 시 닫힘 방지
      >
        {children}
      </div>
    </div>
  );
}
