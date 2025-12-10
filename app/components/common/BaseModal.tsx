// components/modal/BaseModal.tsx
"use client";

import React from "react";

type BaseModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  maxWidthClass?: string; // 모달 너비 조절 가능
};

export default function BaseModal({
  open,
  onClose,
  children,
  maxWidthClass = "max-w-[360px]",
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
      onClick={onClose}
    >
      <div
        className={`
          w-full ${maxWidthClass}
          rounded-2xl bg-white
          p-6 shadow-lg
          text-center
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
