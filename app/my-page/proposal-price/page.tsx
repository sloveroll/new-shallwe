"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function ProposalPricePage() {
  const router = useRouter();

  // State for prices (stored as numbers, displayed with commas)
  // Initial values based on image for demonstration, or 0
  const [prices, setPrices] = useState({
    youtubeLong: 10000,
    youtubeShort: 50000,
    instaReels: 100000,
    instaFeed: 30000,
    blogPost: 10000,
  });

  // State to track active (last clicked) chips for visual feedback
  const [activeChips, setActiveChips] = useState<Partial<typeof prices>>({});

  // Chip options: Label and Value
  const chipOptions = [
    { label: "+1만원", value: 10000 },
    { label: "+3만원", value: 30000 },
    { label: "+5만원", value: 50000 },
    { label: "+10만원", value: 100000 },
  ];

  // Format number to comma string
  const formatPrice = (num: number) => {
    if (!num) return "";
    return num.toLocaleString();
  };

  // Handle input change
  const handlePriceChange = (key: keyof typeof prices, value: string) => {
    // Remove commas and non-digits
    const numberValue = Number(value.replace(/[^0-9]/g, ""));
    setPrices((prev) => ({ ...prev, [key]: numberValue }));
    // Clear active chip when manually typing
    setActiveChips((prev) => ({ ...prev, [key]: 0 }));
  };

  // Handle chip click (Add amount) and set active state
  const handleAddAmount = (key: keyof typeof prices, amount: number) => {
    setPrices((prev) => ({ ...prev, [key]: prev[key] + amount }));
    setActiveChips((prev) => ({ ...prev, [key]: amount }));
  };

  // Helper to render a section
  const renderSection = (
    title: string,
    inputs: {
      key: keyof typeof prices;
      label: string;
      desc?: string;
    }[]
  ) => (
    <div className="mb-10">
      <h3 className="text-[16px] font-bold mb-4 text-black">{title}</h3>
      <div className="flex flex-col gap-6">
        {inputs.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-[14px] font-medium text-[#333] mb-2">
              {label}
            </label>
            <div className="relative mb-3">
              <input
                type="text"
                value={prices[key] ? `${formatPrice(prices[key])}원` : ""}
                onChange={(e) => handlePriceChange(key, e.target.value)}
                placeholder="0원"
                className="w-full h-[50px] rounded-[10px] border border-[#ddd] bg-white px-4 text-[15px] font-bold text-black focus:outline-none focus:border-[#000]"
              />
            </div>
            {/* Chips */}
            <div className="flex gap-2 flex-wrap">
              {chipOptions.map((chip) => {
                // Check if this chip was the last one clicked for this key
                const isActive = activeChips[key] === chip.value;
                return (
                  <button
                    key={chip.value}
                    type="button"
                    onClick={() => handleAddAmount(key, chip.value)}
                    className={`
                      px-3 py-[6px] rounded-[20px] text-[13px] border transition-colors
                      ${
                        isActive
                          ? "bg-[#AFFF33] border-[#AFFF33] text-black font-semibold"
                          : "bg-white border-[#ddd] text-[#666]"
                      }
                    `}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col relative text-[#222]">
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen flex flex-col shadow-sm">
        <SubPageHeader title="제안 단가 등록" />

        <div className="flex-1 px-5 pt-6 pb-32">
          {/* Guidance Box */}
          <div className="bg-[#f5f5f5] rounded-[12px] p-5 mb-8">
            <ol className="list-decimal pl-4 text-[13px] text-[#333] leading-relaxed space-y-1">
              <li>
                입력하신 제안 단가는{" "}
                <span className="font-bold">광고주 참고 자료로 활용</span>되며,{" "}
                <span className="font-bold">
                  협업 금에 즉시 반영되지 않아요.
                </span>
              </li>
              <li>
                너무 높은 금액보다는, 현재 시장 상황을 고려해{" "}
                <span className="font-bold">적정선으로 입력</span>해 주셔야{" "}
                <span className="font-bold">더 많은 협업 기회를 확보</span>하실
                수 있어요.
              </li>
              <li>제안 단가는 주기적으로 직접 업데이트하실 수 있어요.</li>
            </ol>
          </div>

          {/* YouTube */}
          {renderSection("유튜브", [
            {
              key: "youtubeLong",
              label: "롱폼 (제품 1개, 노출 시간 30초 기준)",
            },
            {
              key: "youtubeShort",
              label: "쇼츠 (제품 1개, 노출 시간 30초 기준)",
            },
          ])}

          {/* Instagram */}
          {renderSection("인스타그램", [
            {
              key: "instaReels",
              label: "릴스 (제품 1개, 노출 시간 30초 기준)",
            },
            { key: "instaFeed", label: "피드 (제품 1개, 이미지 5장 기준)" },
          ])}

          {/* Blog */}
          {renderSection("블로그", [
            {
              key: "blogPost",
              label: "게시물 (제품 1개, 이미지 15장 + 영상 1개 기준)",
            },
          ])}
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] bg-white border-t border-[#f0f0f0] z-20">
          <button
            type="button"
            className="w-full h-[52px] text-[16px] font-bold text-black bg-[#AFFF33]"
            onClick={() => {
              alert("저장되었습니다.");
              router.back();
            }}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
