// app/(my-home)/my-cash/page.tsx
"use client";

import { useState } from "react";
import PeriodSelectModal from "../components/modal/PeriodSelectModal";
import DatePickerModal from "../components/modal/DatePickerModal";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

type CashTab = "all" | "income" | "withdraw" | "expire";

interface CashHistoryItem {
  id: number;
  type: CashTab;
  date: string;
  title: string;
  amount: number; // +지급, -출금/소멸
}

const TABS: { key: CashTab; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "income", label: "지급" },
  { key: "withdraw", label: "출금" },
  { key: "expire", label: "소멸" },
];

const MOCK_HISTORY: CashHistoryItem[] = [
  {
    id: 1,
    type: "income",
    date: "2025.11.25",
    title: "아벤느 캠페인 협업 완료",
    amount: 200_000,
  },
  {
    id: 2,
    type: "withdraw",
    date: "2025.11.25",
    title: "출금 신청",
    amount: -200_000,
  },
  {
    id: 3,
    type: "expire",
    date: "2025.11.25",
    title: "유효기간 경과",
    amount: -200_000,
  },
];

function formatAmount(amount: number) {
  return amount.toLocaleString("ko-KR");
}

export default function MyCashPage() {
  const [activeTab, setActiveTab] = useState<CashTab>("all");
  const router = useRouter();

  const filtered =
    activeTab === "all"
      ? MOCK_HISTORY
      : MOCK_HISTORY.filter((item) => item.type === activeTab);

  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTarget, setDateTarget] = useState<"start" | "end">("start");
  const [startDate, setStartDate] = useState(dayjs().format("YY.MM.DD"));
  const [endDate, setEndDate] = useState(
    dayjs().add(5, "day").format("YY.MM.DD")
  );

  return (
    <>
      <main className="px-5 pb-24 pt-4 bg-white text-black">
        {/* 상단: 보유 캐시 요약 */}
        <section className="mb-4">
          <h1 className="mb-1 text-[14px] text-[#555]">보유 캐시</h1>
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <div className="text-[28px] font-extrabold leading-none">
                100,000
                <span className="ml-[2px] text-[16px] font-semibold">
                  {" "}
                  캐시
                </span>
              </div>

              <p className="mt-3 text-[12px] text-[#666]">
                <span className="font-semibold">30일 이내 소멸 예정:</span>{" "}
                3,000 캐시
              </p>
              <p className="mt-[2px] text-[12px] text-[#666]">
                <span className="font-semibold">출금 정보:</span>{" "}
                <span className="underline underline-offset-2">
                  개인, 국민은행
                </span>
              </p>
            </div>

            <button
              className="ml-4 rounded-full bg-[#a5ff3f] px-4 py-[6px] text-[12px] font-semibold text-black whitespace-nowrap"
              onClick={() => router.push("/my-cash/withdraw")}
            >
              출금 신청
            </button>
          </div>
        </section>

        {/* 탭 + 기간 조회 */}
        <section className="border-b border-[#e5e5e5]">
          {/* 상단 탭 (가로 전체 4등분) */}
          <div className="flex text-[14px]">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-1 pb-2 text-center ${
                    isActive
                      ? "font-semibold text-black"
                      : "text-[#999] font-normal"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="pointer-events-none absolute bottom-0 left-0 block h-[2px] w-full bg-black" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 탭 아래 기간 조회 */}
          <div className="flex justify-end pb-2 pr-1">
            <button
              onClick={() => setShowPeriodModal(true)}
              className="flex items-center gap-1 px-3 pt-[10px] pb-[20px] text-[11px] text-[#777]"
            >
              기간 조회 <span className="text-[14px]">˅</span>
            </button>
          </div>
        </section>

        {/* 캐시 내역 리스트 */}
        <section className="mt-3 space-y-3">
          {filtered.map((item) => {
            const isPlus = item.amount > 0;
            const sign = isPlus ? "+" : "";
            const colorClass = isPlus ? "text-[#1c7d33]" : "text-[#d63b2f]";

            const iconSrc =
              item.type === "income"
                ? "/images/my-cash/ic-campaign-complete.png"
                : item.type === "withdraw"
                ? "/images/my-cash/ic-withdrawal.png"
                : "/images/my-cash/ic-expiration-date.png";

            return (
              <article
                key={item.id}
                className="border-b border-[#f0f0f0] pb-3 last:border-none"
              >
                <div className="flex items-center justify-between">
                  {/* 왼쪽: 아이콘 + 텍스트 */}
                  <div className="flex items-start gap-3">
                    <img
                      src={iconSrc}
                      alt="icon"
                      className="mt-[2px] h-7 w-7 object-contain"
                    />

                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#777]">
                        {item.date}
                      </span>
                      <span className="mt-[2px] text-[13px]">{item.title}</span>
                    </div>
                  </div>

                  {/* 오른쪽 금액 */}
                  <div
                    className={`text-[13px] font-semibold ${colorClass} whitespace-nowrap`}
                  >
                    {sign}
                    {formatAmount(item.amount)} 캐시
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-10 text-center text-[13px] text-[#999]">
              해당 기간에 캐시 내역이 없습니다.
            </div>
          )}
        </section>
      </main>

      {/* 기간 선택 모달 */}
      {showPeriodModal && (
        <PeriodSelectModal
          startDate={startDate}
          endDate={endDate}
          onOpenDatePicker={(target) => {
            setDateTarget(target);
            setShowDatePicker(true);
          }}
          onClose={() => setShowPeriodModal(false)}
          onSubmit={() => {
            setShowPeriodModal(false);
            // TODO: startDate, endDate 기준으로 필터 로직
          }}
        />
      )}

      {/* 날짜 선택 모달 */}
      {showDatePicker && (
        <DatePickerModal
          target={dateTarget}
          onSelectDate={(newDate) => {
            if (dateTarget === "start") setStartDate(newDate);
            else setEndDate(newDate);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </>
  );
}
