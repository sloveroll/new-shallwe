"use client";

import Image from "next/image";
import { useState } from "react";
import NoticeAccordion from "./components/NoticeAccordion";
import { useRouter } from "next/navigation";

export type AlertTab = "my" | "notice";

export type AlertItem = {
  id: number;
  icon: string;
  title: string;
  message: string;
  date: string;
  isNew?: boolean;
};

const MY_ALERTS: AlertItem[] = [
  {
    id: 1,
    icon: "/images/my-collab/ic-notice.png", // 캠페인 신청
    title: "캠페인 신청",
    message:
      "[러, 아벤느] 캠페인 신청이 완료되었어요. 선정자에 한해 개별 안내드릴게요.",
    date: "2025.11.25",
    isNew: true,
  },
  {
    id: 2,
    icon: "/images/my-collab/ic-invite.png", // 캠페인 진행 제안
    title: "캠페인 진행 제안",
    message:
      "[러, 아벤느] 캠페인 진행 제안을 받았어요. 내용을 확인하고 캠페인에 신청하세요.",
    date: "2025.11.25",
  },
  {
    id: 3,
    icon: "/images/my-collab/ic-feedback.png", // 협업 콘텐츠 피드백
    title: "협업 콘텐츠 피드백",
    message:
      "[러, 아벤느] 캠페인 피드백이 도착했어요. 오늘까지 반드시 콘텐츠 내 반영해 주세요.",
    date: "2025.11.25",
  },
  {
    id: 4,
    icon: "/images/my-collab/ic-cash-payment.png", // 캐시 지급
    title: "캐시 지급",
    message: "[러, 아벤느] 캠페인 협업이 완료되어, 캐시가 지급되었어요.",
    date: "2025.11.25",
  },
];

// 공지 리스트 – 우선 더미
const NOTICE_LIST: AlertItem[] = [
  {
    id: 101,
    icon: "/images/my-collab/ic-bell.png",
    title: "서비스 공지",
    message:
      "안정적인 서비스 제공을 위해 12월 1일(월) 02:00~04:00 시스템 점검이 진행됩니다.",
    date: "2025.11.20",
  },
];

export default function MyAlertsContent() {
  const [activeTab, setActiveTab] = useState<AlertTab>("my");
  const router = useRouter();

  const list = activeTab === "my" ? MY_ALERTS : NOTICE_LIST;

  const handleMarkAllRead = () => {
    // TODO: 실제로는 API 호출
    console.log("모두 읽음 처리");
  };

  return (
    <main className="flex-1 bg-white text-black">
      {/* 🔥 공통 상단 탭 UI */}
      <section className="pt-6 pb-0 border-b border-[#eee]">
        {/* 탭 버튼들 – 전체 폭을 양분 */}
        <div className="flex w-full text-[18px] font-semibold mb-3">
          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 py-2 text-center transition ${
              activeTab === "my" ? "text-black" : "text-[#d5d5d5]"
            }`}
          >
            내 알림
          </button>

          <button
            onClick={() => setActiveTab("notice")}
            className={`flex-1 py-2 text-center transition ${
              activeTab === "notice" ? "text-black" : "text-[#d5d5d5]"
            }`}
          >
            공지
          </button>
        </div>

        {/* 하단 인디케이터 – 전체 폭의 절반 */}
        <div className="relative h-[2px] bg-[#f0f0f0]">
          <div
            className="
        absolute bottom-0 h-[2px] w-1/2 bg-[#AFFF33]
        transition-all duration-200
      "
            style={{
              left: activeTab === "my" ? "0%" : "50%",
            }}
          />
        </div>
      </section>

      {/* 🔔 내 알림 탭일 때만 나타나는 '모두 읽음 처리' */}
      {activeTab === "my" && (
        <div className="px-5 py-3 border-b border-[#eee] text-right">
          <button className="text-[13px] text-[#666]">✓ 모두 읽음 처리</button>
        </div>
      )}

      {/* 📌 내 알림 리스트 */}
      {activeTab === "my" && (
        <section className="px-5">
          {MY_ALERTS.map((item) => (
            <article
              key={item.id}
              className="flex items-center py-4 border-b border-[#f0f0f0] text-[13px]"
            >
              {/* 아이콘 */}
              <div className="relative mr-3 flex items-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="object-contain"
                />
                {item.isNew && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-[#ff4b23] rounded-full">
                    N
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between mb-[4px]">
                  <span className="text-[13px] font-semibold text-[#222]">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#999]">{item.date}</span>
                </div>

                <p className="text-[13px] text-[#333] leading-[1.5]">
                  {item.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/my-alerts/campaign-proposal`)}
                className="pl-2 text-[#bbb] text-[18px]"
              >
                &gt;
              </button>
            </article>
          ))}
        </section>
      )}

      {/* 📢 공지 탭 */}
      {activeTab === "notice" && (
        <section className="px-5 py-4">
          {NOTICE_LIST.map((item) => (
            <NoticeAccordion key={item.id} item={item} />
          ))}
        </section>
      )}
    </main>
  );
}
