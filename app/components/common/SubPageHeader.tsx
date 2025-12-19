"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface SubPageHeaderProps {
  title: string;
}

export default function SubPageHeader({ title }: SubPageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 pt-3 pb-2 border-b border-[#f0f0f0] bg-white">
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
        ←
      </button>
      <div className="text-[16px] font-semibold text-black">{title}</div>
      {/* 오른쪽 여백용 (타이틀 중앙 정렬을 위해 왼쪽 버튼과 크기 맞춤) */}
      <div className="w-[28px]" />
    </header>
  );
}
