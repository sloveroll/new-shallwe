// app/my-collab/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

type Tab = "apply" | "progress" | "done";

export default function MyCollabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("apply");

  // 탭별 더미 데이터
  const applyList = [
    {
      id: 1,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "신청 확인",
      title: "아윤채 인리치 본딩 케어 크림",
      announceText: "선정자 발표: 11/17(월)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 2,
      platform: "youtube",
      typeLabel: "릴스",
      statusLabel: "신청 확인",
      title: "메디힐 수분 선세럼 체험단",
      announceText: "선정자 발표: 11/20(수)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 3,
      platform: "youtube",
      typeLabel: "영상",
      statusLabel: "신청 확인",
      title: "비플레인 진정 수분 크림 리뷰",
      announceText: "선정자 발표: 11/25(월)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 4,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "신청 확인",
      title: "닥터지 레드 블레미쉬 라인 체험",
      announceText: "선정자 발표: 12/01(월)까지",
      thumbnail: "/images/sample.png",
    },
  ];

  const progressList = [
    {
      id: 2,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "진행 중",
      title: "두 번째 캠페인 제목 예시",
      announceText: "콘텐츠 등록 마감: 11/27(목)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 3,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "진행 중",
      title: "두 번째 캠페인 제목 예시",
      announceText: "콘텐츠 등록 마감: 11/27(목)까지",
      thumbnail: "/images/sample.png",
    },
  ];

  const doneList = [
    {
      id: 3,
      platform: "instagram",
      typeLabel: "릴스",
      statusLabel: "미선정",
      title: "리얼베리어, 믹순 12월 올리브영 세일 특집 A",
      thumbnail: "/images/sample.png",
    },
  ];

  const renderList = () => {
    if (activeTab === "apply") {
      return applyList.map((item) => (
        <CollabItemApply key={item.id} {...item} />
      ));
    }
    if (activeTab === "progress") {
      return progressList.map((item) => (
        <CollabItemProgress key={item.id} {...item} />
      ));
    }
    return doneList.map((item) => <CollabItemDone key={item.id} {...item} />);
  };

  return (
    <main className="min-h-screen bg-white pb-[70px]">
      <div className="w-full max-w-[430px] mx-auto px-3 pt-3 pb-5 box-border">
        {/* 상단 탭 */}
        <section className="border-b border-[#eee] mb-2">
          <div className="flex text-center">
            <TabButton
              label="신청"
              active={activeTab === "apply"}
              onClick={() => setActiveTab("apply")}
            />
            <TabButton
              label="진행 중"
              active={activeTab === "progress"}
              onClick={() => setActiveTab("progress")}
            />
            <TabButton
              label="완료"
              active={activeTab === "done"}
              onClick={() => setActiveTab("done")}
            />
          </div>
        </section>

        {/* 리스트 영역 */}
        <section>{renderList()}</section>
      </div>

      {/* 하단 고정 네비 (원래 구조 그대로) */}
      <div
        className="
          fixed left-0 bottom-0
          w-full
          bg-white
          border-t border-[#eee]
          z-[60]
          flex justify-center
        "
      >
        <div className="w-full max-w-[430px]">
          <BottomNav />
        </div>
      </div>
    </main>
  );
}

/* -----------------------------
   탭 버튼 컴포넌트
-------------------------------- */

type TabButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1
        py-3
        border-0
        bg-transparent
        text-[15px]
        cursor-pointer
        ${
          active
            ? "font-bold text-black border-b-2 border-black"
            : "font-medium text-[#999] border-b-2 border-transparent"
        }
      `}
    >
      {label}
    </button>
  );
}

/* -----------------------------
   리스트 아이템 - 신청 탭
-------------------------------- */

type BaseItemProps = {
  thumbnail: string;
  title: string;
  platform: string;
  typeLabel: string;
};

type ApplyItemProps = BaseItemProps & {
  statusLabel: string;
  announceText: string;
};

function CollabItemApply({
  thumbnail,
  title,
  platform,
  typeLabel,
  statusLabel,
  announceText,
}: ApplyItemProps) {
  const router = useRouter();

  return (
    <article className="flex py-3 border-b border-[#f3f3f3]">
      {/* 썸네일 */}
      <div
        className="
          w-[90px] h-[90px]
          rounded-[8px]
          overflow-hidden
          bg-[#f5f5f5]
          mr-3
        "
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex-1 flex flex-col gap-1">
        {/* 상단 플랫폼/타입 태그 */}
        <div className="flex items-center gap-1.5">
          <span className="text-[12px]">
            {platform === "youtube" ? "▶️" : "📷"}
          </span>
          <span
            className="
              rounded
              border border-black
              px-[6px] py-[2px]
              text-[11px]
            "
          >
            {typeLabel}
          </span>
        </div>

        {/* 제목 */}
        <div className="text-[14px] font-semibold leading-snug">{title}</div>

        {/* 선정자 발표일 */}
        <div className="text-[11px] text-[#666]">{announceText}</div>

        {/* 버튼 영역 */}
        <div className="flex gap-2 mt-1.5">
          {/* 신청 취소 */}
          <button
            type="button"
            className="
              px-3 py-1.5
              rounded-[6px]
              border border-[#ccc]
              bg-white
              text-[12px]
              cursor-pointer
            "
          >
            신청 취소
          </button>

          {/* 콘텐츠 등록 */}
          <button
            type="button"
            onClick={() => router.push("/my-collab/content-register")}
            className="
              px-3 py-1.5
              rounded-[6px]
              border-0
              bg-[#AFFF33]
              text-[12px] font-semibold
              cursor-pointer
              whitespace-nowrap
            "
          >
            콘텐츠 등록
          </button>

          {/* 설문 등록 */}
          <button
            type="button"
            onClick={() => router.push("/my-collab/survey-register")}
            className="
              px-3 py-1.5
              rounded-[6px]
              border-0
              bg-[#AFFF33]
              text-[12px] font-semibold
              cursor-pointer
              whitespace-nowrap
            "
          >
            설문 등록
          </button>
        </div>
      </div>
    </article>
  );
}

/* -----------------------------
   리스트 아이템 - 진행 중 탭
-------------------------------- */

type ProgressItemProps = ApplyItemProps;

function CollabItemProgress(props: ProgressItemProps) {
  // 신청 탭과 동일 UI
  return <CollabItemApply {...props} />;
}

/* -----------------------------
   리스트 아이템 - 완료 탭
-------------------------------- */

type DoneItemProps = BaseItemProps & {
  statusLabel: string; // "미선정" 등
};

function CollabItemDone({
  thumbnail,
  title,
  platform,
  typeLabel,
  statusLabel,
}: DoneItemProps) {
  return (
    <article className="flex py-3 border-b border-[#f3f3f3]">
      {/* 썸네일 + 오버레이 */}
      <div
        className="
          w-[90px] h-[90px]
          rounded-[8px]
          overflow-hidden
          bg-[#ddd]
          mr-3
          relative
        "
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover grayscale-[0.2] opacity-90"
        />
        <div
          className="
            absolute inset-0
            bg-black/40
            text-white
            flex items-center justify-center
            text-[13px] font-bold
          "
        >
          {statusLabel}
        </div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex-1 flex flex-col gap-1.5 justify-center">
        {/* 플랫폼 / 타입 */}
        <div className="flex items-center gap-1.5">
          <span className="text-[12px]">
            {platform === "youtube" ? "▶️" : "📷"}
          </span>
          <span
            className="
              rounded
              border border-black
              px-[6px] py-[2px]
              text-[11px]
            "
          >
            {typeLabel}
          </span>
        </div>

        {/* 제목 */}
        <div className="text-[14px] font-semibold leading-snug">{title}</div>
      </div>
    </article>
  );
}
