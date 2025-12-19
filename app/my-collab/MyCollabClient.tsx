"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

type Tab = "apply" | "progress" | "done";

// DB에서 불러온 데이터 타입 정의 (schema 기반)
export type Campaign = {
  id: number;
  platform: string;
  type: string;
  status: string;
  title: string;
  announce_date: string | null;
  thumbnail: string | null;
  // user_id 등은 UI에 직접 표시되지 않을 수 있음
};

type MyCollabClientProps = {
  applyList: Campaign[];
  progressList: Campaign[];
  doneList: Campaign[];
};

export default function MyCollabClient({
  applyList,
  progressList,
  doneList,
}: MyCollabClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("apply");

  const renderList = () => {
    if (activeTab === "apply") {
      return applyList.map((item) => (
        <CollabItemApply key={item.id} item={item} />
      ));
    }
    if (activeTab === "progress") {
      return progressList.map((item) => (
        <CollabItemProgress key={item.id} item={item} />
      ));
    }
    return doneList.map((item) => <CollabItemDone key={item.id} item={item} />);
  };

  return (
    <main className="min-h-screen bg-white pb-[70px]">
      <div className="w-full max-w-[530px] mx-auto px-3 pt-3 pb-5 box-border">
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

      {/* 하단 고정 네비 */}
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
        <div className="w-full max-w-[530px]">
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

function CollabItemApply({ item }: { item: Campaign }) {
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
          src={item.thumbnail || "/images/sample.png"} // fallback
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex-1 flex flex-col gap-1">
        {/* 상단 플랫폼/타입 태그 */}
        <div className="flex items-center gap-1.5">
          <span className="text-[12px]">
            {item.platform === "youtube" ? "▶️" : "📷"}
          </span>
          <span
            className="
              rounded
              border border-black
              px-[6px] py-[2px]
              text-[11px]
            "
          >
            {item.type}
          </span>
        </div>

        {/* 제목 */}
        <div className="text-[14px] font-semibold leading-snug">{item.title}</div>

        {/* 선정자 발표일 */}
        <div className="text-[11px] text-[#666]">{item.announce_date}</div>

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

function CollabItemProgress({ item }: { item: Campaign }) {
  // 신청 탭과 동일 UI
  return <CollabItemApply item={item} />;
}

/* -----------------------------
   리스트 아이템 - 완료 탭
-------------------------------- */

function CollabItemDone({ item }: { item: Campaign }) {
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
          src={item.thumbnail || "/images/sample.png"}
          alt={item.title}
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
          {item.status}
        </div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex-1 flex flex-col gap-1.5 justify-center">
        {/* 플랫폼 / 타입 */}
        <div className="flex items-center gap-1.5">
          <span className="text-[12px]">
            {item.platform === "youtube" ? "▶️" : "📷"}
          </span>
          <span
            className="
              rounded
              border border-black
              px-[6px] py-[2px]
              text-[11px]
            "
          >
            {item.type}
          </span>
        </div>

        {/* 제목 */}
        <div className="text-[14px] font-semibold leading-snug">{item.title}</div>
      </div>
    </article>
  );
}
