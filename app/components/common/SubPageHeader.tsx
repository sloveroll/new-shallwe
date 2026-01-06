"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface SubPageHeaderProps {
  title: string;
  noBorder?: boolean;
}

export default function SubPageHeader({
  title,
  noBorder = false,
}: SubPageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-5 pt-3 pb-2 bg-white ${
        noBorder ? "" : "border-b border-[#f0f0f0]"
      }`}
    >
      <button
        onClick={() => router.back()}
        type="button"
        className="
          border-0 bg-transparent
          cursor-pointer
          text-[20px]
          p-1
        "
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="text-[16px] font-semibold text-black">{title}</div>
      {/* 오른쪽 여백용 (타이틀 중앙 정렬을 위해 왼쪽 버튼과 크기 맞춤) */}
      <div className="w-[28px]" />
    </header>
  );
}
