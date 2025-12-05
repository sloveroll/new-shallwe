"use client";

import Image from "next/image";

export default function CampaignDetailHeader({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section style={{ position: "relative" }}>
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          borderRadius: "50%",
          width: 32,
          height: 32,
          border: "none",
          fontSize: 18,
        }}
      >
        ←
      </button>

      {/* 대표 이미지 */}
      <div
        style={{
          width: "100%",
          height: "320px",
          position: "relative",
        }}
      >
        <Image
          src="/images/sample.png"
          alt="캠페인 이미지"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
