"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import SubPageHeader from "@/app/components/common/SubPageHeader";
import YoutubeReferenceRegisterModal from "@/app/components/modal/YoutubeReferenceRegisterModal";

type VideoStyle = "vlog" | "review" | "";

interface ReferenceItem {
  id: number;
  url: string;
  style: VideoStyle;
}

export default function YoutubeReferencePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 초기 상태: 각각 2개씩 빈 항목
  const [longList, setLongList] = useState<ReferenceItem[]>([
    { id: 1, url: "", style: "" },
    { id: 2, url: "", style: "" },
  ]);
  const [shortList, setShortList] = useState<ReferenceItem[]>([
    { id: 1, url: "", style: "" },
    { id: 2, url: "", style: "" },
  ]);

  // 아코디언 상태
  const [isLongExpanded, setIsLongExpanded] = useState(false);
  const [isShortExpanded, setIsShortExpanded] = useState(false);

  // URL 변경 핸들러
  const handleUrlChange = (
    type: "long" | "short",
    index: number,
    value: string
  ) => {
    if (type === "long") {
      setLongList((prev) => {
        const copy = [...prev];
        copy[index].url = value;
        return copy;
      });
    } else {
      setShortList((prev) => {
        const copy = [...prev];
        copy[index].url = value;
        return copy;
      });
    }
  };

  // 스타일 변경 핸들러
  const handleStyleChange = (
    type: "long" | "short",
    index: number,
    style: VideoStyle
  ) => {
    if (type === "long") {
      setLongList((prev) => {
        const copy = [...prev];
        copy[index].style = style;
        return copy;
      });
    } else {
      setShortList((prev) => {
        const copy = [...prev];
        copy[index].style = style;
        return copy;
      });
    }
  };

  // 항목 추가
  const addItem = (type: "long" | "short") => {
    const newItem: ReferenceItem = { id: Date.now(), url: "", style: "" };
    if (type === "long") {
      setLongList((prev) => [...prev, newItem]);
    } else {
      setShortList((prev) => [...prev, newItem]);
    }
  };

  // 등록 완료
  const handleSubmit = () => {
    console.log("Long:", longList);
    console.log("Short:", shortList);
    // TODO: API 연동
    setIsModalOpen(true);
  };

  // 라디오 버튼 스타일 (Step 1 유사 스타일)
  const radioClass = `
    appearance-none
    min-w-[18px] min-h-[18px] w-[18px] h-[18px]
    rounded-full
    border border-[#ddd]
    bg-white
    checked:bg-[#AFFF33]
    checked:border-[5px]
    checked:border-white
    checked:ring-1
    checked:ring-[#ddd]
    cursor-pointer
  `;

  // 체크 아이콘 (녹색 네모 박스 안 체크)
  const CheckIcon = () => <span className="text-[14px]">✅</span>;

  // 개별 아이템 렌더링 헬퍼
  const renderItem = (
    item: ReferenceItem,
    idx: number,
    type: "long" | "short"
  ) => (
    <div key={item.id}>
      {/* URL 입력 */}
      <div className="relative mb-2">
        <input
          type="text"
          placeholder={
            type === "long"
              ? "http://www.youtube.com/watch?v=..."
              : "영상의 URL을 붙여 넣어주세요."
          }
          className="w-full rounded-[10px] border border-[#ddd] bg-white px-3 py-3 text-[14px] pr-8"
          value={item.url}
          onChange={(e) => handleUrlChange(type, idx, e.target.value)}
        />
        {item.url && (
          <button
            onClick={() => handleUrlChange(type, idx, "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc] bg-[#eee] rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>

      {/* 더미 미리보기 */}
      {item.url.length > 5 && (
        <div className="mb-2 text-[12px] text-[#999] px-1 flex items-center gap-2">
          <span>요즘 핫한 패클렌저 3대장 끝장 비교🔥</span>
          <span>2025-11-10</span>
        </div>
      )}

      {/* 스타일 선택 */}
      <div className="flex items-center gap-3 text-[13px]">
        <span className="text-[#333] hidden sm:inline-block">
          영상 스타일에 더 가까운 것을 선택해 주세요.
        </span>
        <span className="text-[#333] sm:hidden">영상 스타일:</span>

        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name={`${type}-style-${item.id}`}
            className={radioClass}
            checked={item.style === "vlog"}
            onChange={() => handleStyleChange(type, idx, "vlog")}
          />
          <span>브이로그</span>
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name={`${type}-style-${item.id}`}
            className={radioClass}
            checked={item.style === "review"}
            onChange={() => handleStyleChange(type, idx, "review")}
          />
          <span>리뷰</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col relative text-[#222]">
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen flex flex-col shadow-sm">
        {/* 헤더 */}
        <SubPageHeader title="유튜브 레퍼런스 등록" />

        <div className="flex-1 px-5 pt-6 pb-32">
          {/* 상단 안내 박스 */}
          <section className="mb-8">
            <h2 className="text-[18px] font-bold leading-snug mb-4">
              추후 제작할 협업 영상과
              <br />
              최대한 유사한 영상을 등록해 주세요.
            </h2>
            <div className="bg-[#efefef] rounded-[12px] p-5 text-[13px] text-[#333] leading-relaxed flex flex-col gap-2">
              <div className="flex items-start gap-1.5">
                <CheckIcon />
                <span>
                  레퍼런스 영상으로 광고주 니즈와의 적합성을 판단하고 협업 진행
                  여부를 검토해요.
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckIcon />
                <span>
                  다양한 스타일의 영상을 등록할수록 선정될 가능성이 높아져요.
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckIcon />
                <span>레퍼런스가 등록된 포맷의 캠페인에 참여할 수 있어요.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckIcon />
                <span>협업 완료 후 등록된 콘텐츠도 레퍼런스로 포함돼요.</span>
              </div>
            </div>
          </section>

          <div className="h-2 bg-[#f5f5f5] -mx-5 mb-8"></div>

          {/* 롱폼 섹션 */}
          <section className="mb-10">
            <div className="mb-3">
              <h3 className="text-[15px] font-bold inline-block mr-1">롱폼</h3>
              <span className="text-[13px] font-normal text-[#444]">
                (브이로그1, 리뷰1)
              </span>
            </div>
            <p className="text-[12px] text-[#777] mb-4">
              업로드 후 15일이 경과한 영상 최소 2개를 등록해 주세요.
            </p>

            {/* 고정 2개 */}
            <div className="flex flex-col gap-6">
              {longList
                .slice(0, 2)
                .map((item, idx) => renderItem(item, idx, "long"))}
            </div>

            {/* 아코디언 토글 */}
            <button
              type="button"
              onClick={() => setIsLongExpanded(!isLongExpanded)}
              className="flex items-center justify-between w-full py-4 mt-2 font-bold text-[14px] text-black border-none bg-transparent"
            >
              <span>협업 영상 보기</span>
              <span
                className={`transform transition-transform ${
                  isLongExpanded ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* 확장 영역 */}
            {isLongExpanded && (
              <div className="flex flex-col gap-6 mt-4">
                {longList
                  .slice(2)
                  .map((item, idx) => renderItem(item, idx + 2, "long"))}

                {/* 영상 추가 버튼 */}
                <div className="mt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => addItem("long")}
                    className="flex items-center gap-1 py-2 px-3"
                  >
                    <Image
                      src="/images/common/ic-plus.png"
                      alt="추가"
                      width={16}
                      height={16}
                    />
                    <span className="text-[14px] font-bold text-[#333]">
                      영상 추가
                    </span>
                  </button>
                </div>
              </div>
            )}
          </section>

          <div className="h-2 bg-[#f5f5f5] -mx-5 mb-8"></div>

          {/* 쇼츠 섹션 */}
          <section className="mb-10">
            <div className="mb-3">
              <h3 className="text-[15px] font-bold inline-block mr-1">쇼츠</h3>
              <span className="text-[13px] font-normal text-[#444]">
                (브이로그0, 리뷰0)
              </span>
            </div>
            <p className="text-[12px] text-[#777] mb-4">
              업로드 후 15일이 경과한 영상 최소 2개를 등록해 주세요.
            </p>

            <div className="flex flex-col gap-6">
              {shortList.map((item, idx) => renderItem(item, idx, "short"))}
            </div>

            {/* 영상 추가 버튼 */}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => addItem("short")}
                className="flex items-center gap-1 py-2 px-3"
              >
                <Image
                  src="/images/common/ic-plus.png"
                  alt="추가"
                  width={16}
                  height={16}
                />
                <span className="text-[14px] font-bold text-[#333]">
                  영상 추가
                </span>
              </button>
            </div>
          </section>
        </div>

        {/* 하단 "등록하기" 버튼 (Fixed) */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] bg-white border-t border-[#f0f0f0] z-20">
          <button
            type="button"
            className="w-full h-[52px] text-[16px] font-bold text-black bg-[#AFFF33]"
            onClick={handleSubmit}
          >
            등록하기
          </button>
        </div>

        <YoutubeReferenceRegisterModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            router.back();
          }}
        />
      </div>
    </div>
  );
}
