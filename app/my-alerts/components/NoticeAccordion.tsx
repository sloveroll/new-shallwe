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
    <div className="pb-5 mb-5 border-b border-[#e5e5e5]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left"
      >
        <div className="flex items-start">
          <div className="mt-[9px] mr-2 w-[6px] h-[6px] rounded-full bg-[#a5ff3f]" />

          <Image
            src="/images/my-collab/ic-notice.png"
            alt="notice"
            width={20}
            height={20}
            className="mr-2 mt-[3px]"
          />

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-semibold text-[#111]">
                {item.title}
              </span>
              <span className="text-[11px] text-[#999] mt-[2px]">
                {item.date}
              </span>
            </div>
          </div>

          <span className="text-[18px] ml-2">
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {open && (
        <div className="mt-3 text-[13px] leading-[1.6] text-[#333] pl-8 pr-4 whitespace-pre-line">
          {item.message}
        </div>
      )}
    </div>
  );
}
