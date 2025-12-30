"use client";

import { useState } from "react";
import Image from "next/image";

type NoticeItem = {
  id: number;
  icon: string;
  title: string;
  message: string;
  date: string;
};

export default function NoticeAccordion({ item }: { item: NoticeItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#f0f0f0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 bg-transparent"
      >
        <div className="flex items-start">
          {/* 아이콘 영역 */}
          <div className="relative flex-shrink-0 mr-3 mt-1">
            {/* 녹색 점 */}
            <div className="absolute -top-1 -left-1 w-[4px] h-[4px] bg-[#a5ff3f] rounded-full" />

            {/* 메가폰 아이콘 (이미지) */}
            <Image
              src="/images/my-collab/ic-notice.png"
              alt="notice"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>

          {/* 텍스트 영역 */}
          <div className="flex-1 min-w-0 pr-2">
            {/* 날짜 */}
            <div className="text-[12px] text-[#888] mb-1 leading-none">
              {item.date}
            </div>
            {/* 타이틀 */}
            <div className="text-[14px] font-bold text-[#222] leading-tight break-keep">
              {item.title}
            </div>
          </div>

          {/* 화살표 아이콘 */}
          <div className="flex-shrink-0 mt-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#222222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* 내용 영역 */}
      {open && (
        <div className="pb-4 pl-[36px] pr-2">
          <p className="text-[13px] leading-[1.6] text-[#333] whitespace-pre-line">
            {item.message}
          </p>
        </div>
      )}
    </div>
  );
}
