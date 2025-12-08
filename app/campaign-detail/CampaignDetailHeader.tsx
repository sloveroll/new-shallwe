"use client";

import Image from "next/image";

export default function CampaignDetailHeader({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section className="relative">
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="
          absolute top-3 left-3
          bg-black/50 text-white
          rounded-full
          w-8 h-8
          border-0 text-[18px]
          flex items-center justify-center
        "
      >
        ←
      </button>

      {/* 대표 이미지 */}
      <div className="w-full h-[320px] relative">
        <Image
          src="/images/sample.png"
          alt="캠페인 이미지"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
