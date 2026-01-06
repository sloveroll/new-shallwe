// components/my-page/ChannelLinkedCard.tsx
"use client";

import Image from "next/image";

type Props = {
  platform: "Youtube" | "Instagram" | "Blog";
  nickname: string;
  items: { label: string; desc: string }[];
  onRemove?: () => void;
};

export default function ChannelLinkedCard({
  platform,
  nickname,
  items,
  onRemove,
}: Props) {
  const platformConfig = {
    Youtube: {
      badge: "/images/my-page/ic-youtube2.png",
    },
    Instagram: {
      badge: "/images/my-page/ic-instagram2.png",
    },
    Blog: {
      badge: "/images/my-page/ic-blog2.png",
    },
  }[platform];

  return (
    <section className="mb-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
      {/* --- Row 1: 플랫폼 배지 + 해제 버튼 --- */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            src={platformConfig.badge}
            alt={platform}
            width={60}
            height={18}
            className="h-[18px] w-auto"
          />
        </div>

        <button
          onClick={onRemove}
          className="
            rounded-md border border-[#ccc] 
            px-3 py-[3px]
            text-[11px] text-[#666]
          "
        >
          해제
        </button>
      </div>

      {/* --- Row 2: 플랫폼 공통 로고 + 채널명 --- */}
      <div className="mb-3 flex items-center gap-2">
        <Image
          src="/images/common/ic-lookinglogo.png"
          alt="logo"
          width={15}
          height={15}
        />

        <span className="text-[15px] font-semibold text-[#333]">
          {nickname}
        </span>
      </div>

      {/* --- Row 3+: 카테고리 설명 --- */}
      <div className="border-t mb-2"></div>
      <div className="space-y-2 text-[12px] leading-[1.45]">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span>{item.label}</span>
            <span className="text-right">
              <b>{item.desc}</b>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
