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
        <section className="mb-2 relative">
          {/* 회색 하단 라인 (absolute로 배치하여 버튼 뒤에 위치) */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#eee]" />

          <div className="flex text-center relative z-10">
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
            ? "font-bold text-black border-b-2 border-[#AFFF33]"
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

  const isShorts = item.type === "쇼츠" || item.platform === "youtube";
  const platformIcon = isShorts
    ? "/images/common/shorts.png"
    : "/images/common/reels.png";

  return (
    <article
      className="
        bg-[#F5F5F5]
        rounded-[20px]
        p-5
        mb-3
        flex items-start gap-4
      "
    >
      {/* 썸네일 영역 */}
      <div
        className="
          w-[100px] h-[100px]
          bg-white
          rounded-[12px]
          flex items-center justify-center
          overflow-hidden
          shrink-0
        "
      >
        <img
          src={item.thumbnail || "/images/sample.png"}
          alt={item.title}
          className="w-[60px] h-auto object-contain"
        />
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex-1 flex flex-col items-start gap-1">
        {/* 플랫폼 아이콘 (텍스트 대신 이미지) */}
        <div className="mb-1">
          <img
            src={platformIcon}
            alt={item.type}
            className="h-[20px] w-auto object-contain"
          />
        </div>

        {/* 제목 */}
        <div className="text-[15px] font-bold leading-snug break-keep">
          {item.title}
        </div>

        {/* 선정자 발표일 */}
        <div className="text-[12px] text-[#666] mb-2">{item.announce_date}</div>

        {/* 하단 버튼/뱃지 영역 */}
        <div className="flex flex-wrap gap-1.5 items-center mt-auto">
          {/* 신청확인 뱃지 (검정 배경 + 라임 텍스트) */}
          <div
            className="
              px-2 py-1.5
              bg-black
              rounded-[6px]
              text-[#AFFF33]
              text-[11px] font-bold
            "
          >
            {item.status}
          </div>

          {/* 신청 취소 버튼 (회색 배경) */}
          <button
            type="button"
            className="
              px-2 py-1.5
              bg-[#999]
              rounded-[6px]
              text-white
              text-[11px] font-medium
              border-0
              cursor-pointer
            "
          >
            신청 취소
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
  const router = useRouter();
  const isShorts = item.type === "쇼츠" || item.platform === "youtube";
  const platformIcon = isShorts
    ? "/images/common/shorts.png"
    : "/images/common/reels.png";

  // 상태에 따른 오버레이 표시 여부 (예시: 입생로랑 뷰티 케이스)
  // 실제 데이터 연동 시에는 status 값 등을 통해 판단해야 함
  // 현재는 예시로 "확인 중" 텍스트가 포함된 경우로 가정하거나, 특정 조건 추가
  const isChecking = item.title.includes("입생로랑"); // 임시 조건

  return (
    <article
      className="
        relative
        bg-[#F5F5F5]
        rounded-[20px]
        p-5
        mb-3
        flex items-start gap-4
        overflow-hidden
      "
    >
      {/* 오버레이 (확인 중 상태일 때) */}
      {isChecking && (
        <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center text-center">
            <div className="text-[18px] font-bold mb-2">확인 중</div>
            <div className="text-[13px] text-[#333] font-medium">등록된 콘텐츠 확인 중(최대 10일 소요)</div>
        </div>
      )}

      {/* 썸네일 영역 */}
      <div
        className="
          w-[100px] h-[100px]
          bg-white
          rounded-[12px]
          flex items-center justify-center
          overflow-hidden
          shrink-0
        "
      >
         <img
          src={item.thumbnail || "/images/sample.png"}
          alt={item.title}
          className="w-[60px] h-auto object-contain"
        />
      </div>

      {/* 내용 영역 */}
      <div className="flex-1 flex flex-col items-start gap-1">
        {/* 플랫폼 아이콘 + 태그 */}
        <div className="flex items-center gap-1 mb-1">
           <img
            src={platformIcon}
            alt={item.type}
            className="h-[20px] w-auto object-contain"
          />
          {isShorts && (
              <span className="bg-[#eee] text-[#666] text-[10px] px-1.5 py-[2px] rounded-[4px]">
                  사전 검수
              </span>
          )}
          {!isShorts && (
               <span className="bg-[#eee] text-[#666] text-[10px] px-1.5 py-[2px] rounded-[4px]">
               현장 방문
           </span>
          )}
        </div>

        <div className="text-[15px] font-bold leading-snug break-keep">
          {item.title}
        </div>
        
        {/* 날짜 표시 */}
        <div className="text-[12px] text-[#666] mb-2">
            콘텐츠 등록 : {item.announce_date ? "11/1(토)-11/17(월)" : "11/27(목)까지"}
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-wrap gap-1.5 items-center mt-auto w-full">
           {/* 신청확인 뱃지 */}
          <div
            className="
              px-2 py-1.5
              bg-black
              rounded-[6px]
              text-[#AFFF33]
              text-[11px] font-bold
              shrink-0
            "
          >
            신청확인
          </div>
          
          {/* 콘텐츠 등록 버튼 */}
          <button
             type="button"
             onClick={() => router.push("/my-collab/content-register")}
             className={`
                px-2 py-1.5
                rounded-[6px]
                text-[11px] font-bold
                border-0
                cursor-pointer
                shrink-0
                ${isChecking ? 'bg-[#999] text-white' : 'bg-[#AFFF33] text-black'}
             `}
          >
             콘텐츠 등록
          </button>

          {/* 설문 등록 버튼 */}
          <button
            type="button"
            onClick={() => router.push("/my-collab/survey-register")}
             className={`
                px-2 py-1.5
                rounded-[6px]
                text-[11px] font-bold
                border-0
                cursor-pointer
                shrink-0
                ${isChecking || item.title.includes("디올") ? 'bg-[#999] text-white' : 'bg-[#AFFF33] text-black'}
             `}
          >
             설문 등록
          </button>

        </div>
      </div>
    </article>
  );
}

/* -----------------------------
   리스트 아이템 - 완료 탭
-------------------------------- */

function CollabItemDone({ item }: { item: Campaign }) {
  const isShorts = item.type === "쇼츠" || item.platform === "youtube";
  const platformIcon = isShorts
    ? "/images/common/shorts.png"
    : "/images/common/reels.png";

  // 상태/오버레이 모의 로직 (이미지 기반)
  // 매칭되지 않는 아이템도 기본적으로 "지급 예정" 상태로 보이도록 설정 (사용자 확인용)
  let thumbnailOverlayText = "지급 예정";
  let statusText = ""; 
  let showMaintenanceBadge = true;
  let paymentInfo: { amount: string, date: string } | null = { amount: "100,000캐시", date: "11/1(토)예정" };
  let showDetailLink = false;

  if (item.title.includes("아르마니")) {
      thumbnailOverlayText = "지급 예정";
      showMaintenanceBadge = true; 
      paymentInfo = { amount: "100,000캐시", date: "11/1(토)예정" };
      statusText = ""; 
  } else if (item.title.includes("꼬달리")) {
      thumbnailOverlayText = "실패";
      statusText = "미지급";
      showMaintenanceBadge = false;
      paymentInfo = null;
  } else if (item.title.includes("디올")) {
      thumbnailOverlayText = "지급 완료";
      showMaintenanceBadge = true; 
      paymentInfo = { amount: "100,000캐시", date: "11/1(토)예정" };
      showDetailLink = true;
      statusText = "";
  } else if (item.title.includes("입생로랑")) {
      thumbnailOverlayText = "완료";
      showMaintenanceBadge = true;
      statusText = "협업 완료";
      paymentInfo = null;
  } else if (item.title.includes("랑콤")) {
      thumbnailOverlayText = "실패";
      statusText = "협업 실패";
      showMaintenanceBadge = false;
      paymentInfo = null;
  }

  // 기존 미선정 처리 호환
  const isNotSelected = item.status === "미선정";
  if(isNotSelected) {
      statusText = "미선정"; 
      // 이미지가 흑백 처리될 수 있음
  }

  return (
    <article
      className="
        bg-[#F5F5F5]
        rounded-[20px]
        p-5
        mb-3
        flex items-start gap-4
        relative
        overflow-hidden
      "
    >
       {/* 썸네일 영역 */}
       <div
        className="
          w-[100px] h-[100px]
          bg-white
          rounded-[12px]
          flex items-center justify-center
          overflow-hidden
          shrink-0
          relative
        "
      >
        <img
          src={item.thumbnail || "/images/sample.png"}
          alt={item.title}
          className={`w-[60px] h-auto object-contain ${
            isNotSelected ? "grayscale opacity-50" : ""
          }`}
        />
        {/* 썸네일 오버레이 */}
        {thumbnailOverlayText && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0px] flex items-center justify-center">
                <span className="text-white text-[14px] font-bold text-center leading-tight whitespace-pre-line">
                    {thumbnailOverlayText.replace(" ", "\n")}
                </span>
            </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-start gap-1">
        {/* 플랫폼 아이콘 + 뱃지 */}
        <div className="flex items-center gap-1 mb-1">
           <img
            src={platformIcon}
            alt={item.type}
            className="h-[20px] w-auto object-contain"
          />
          {showMaintenanceBadge && (
              <span className="bg-white text-[#333] text-[10px] px-1.5 py-[2px] rounded-[4px] border border-[#eee]">
                  유지 기간 30일 남음
              </span>
          )}
        </div>

        <div className="text-[15px] font-bold leading-snug break-keep">
          {item.title}
        </div>
        
        {/* 지급 정보 */}
        {paymentInfo && (
            <div className="mt-1 flex flex-col gap-0.5">
                <div className="text-[12px] font-bold">지급 캐시 : {paymentInfo.amount}</div>
                <div className="text-[12px] font-bold">{paymentInfo.date}</div>
            </div>
        )}

        {/* 하단 상태 텍스트 영역 */}
        <div className="flex w-full items-end justify-between mt-auto min-h-[20px]">
             {/* 상태 텍스트 (굵게) */}
            <div className="text-[12px] font-bold text-black">
                {statusText}
            </div>

            {/* 세부내역 링크 */}
            {showDetailLink && (
                <button 
                    type="button" 
                    className="text-[#999] text-[11px] underline bg-transparent border-0 cursor-pointer p-0"
                >
                    세부내역
                </button>
            )}
        </div>
      </div>
    </article>
  );
}
