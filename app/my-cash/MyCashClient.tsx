"use client";

import { useState } from "react";
import PeriodSelectModal from "../components/modal/PeriodSelectModal";
import DatePickerModal from "../components/modal/DatePickerModal";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

export type CashTab = "all" | "income" | "withdraw" | "expire";

export interface CashHistoryItem {
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

function formatAmount(amount: number) {
  return amount.toLocaleString("ko-KR");
}

interface MyCashClientProps {
  initialHistory: CashHistoryItem[];
}

export default function MyCashClient({ initialHistory }: MyCashClientProps) {
  const [activeTab, setActiveTab] = useState<CashTab>("all");
  const router = useRouter();

  const filtered =
    activeTab === "all"
      ? initialHistory
      : initialHistory.filter((item) => item.type === activeTab);

  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTarget, setDateTarget] = useState<"start" | "end">("start");
  const [startDate, setStartDate] = useState(dayjs().format("YY.MM.DD"));
  const [endDate, setEndDate] = useState(
    dayjs().add(5, "day").format("YY.MM.DD")
  );

  const [isAllPeriod, setIsAllPeriod] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-white pb-[90px] text-black">
        {/* 상단 카드 영역 */}
        <section className="px-5 pt-4 mb-8">
          <div className="rounded-[20px] bg-[#f5f5f5] p-5">
            {/* 1행: 보유 캐시 + 출금 신청 버튼 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <img
                  src="/images/common/ic-lookinglogo.png"
                  alt="logo"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-[15px] font-bold">보유 캐시</span>
              </div>
              <button
                className="rounded-[8px] bg-[#a5ff3f] px-[14px] py-[8px] text-[13px] font-bold text-black active:scale-95 transition-transform"
                onClick={() => router.push("/my-cash/withdraw")}
              >
                출금 신청
              </button>
            </div>

            {/* 2행: 금액 */}
            <div className="mb-6 text-[28px] font-extrabold leading-none">
              100,000 <span className="text-[16px] font-bold">캐시</span>
            </div>

            {/* 3행: 상세 정보 (소멸 예정, 출금 정보) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#555]">30일 이내 소멸 예정</span>
                <span className="font-bold">3,000캐시</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#555]">출금 정보</span>
                <span className="font-bold">개인, 쉘위은행</span>
              </div>
            </div>
          </div>
        </section>

        {/* 탭 + 기간 조회 */}
        <section className="bg-white sticky top-0 z-10">
          <div className="border-b border-[#eee]">
            {/* 탭 (가로 전체 4등분) */}
            <div className="flex text-[15px]">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex-1 pb-[14px] pt-2 text-center font-bold transition-colors ${
                      isActive ? "text-black" : "text-[#999]"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#a5ff3f] block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 탭 아래 기간 조회 */}
          <div className="flex justify-end pr-5 py-3">
            <button
              onClick={() => setShowPeriodModal(true)}
              className="flex items-center gap-1 text-[12px] text-[#999]"
            >
              기간 조회 <span className="text-[10px]">▼</span>
            </button>
          </div>
        </section>

        {/* 캐시 내역 리스트 */}
        <section className="px-5">
          {filtered.map((item) => {
            const isPlus = item.amount > 0;
            // 디자인상 항상 검정색 금액, 부호는 유지
            const sign = isPlus ? "" : ""; // 이미지에서는 + 부호 없음, - 부호 있음 (amount 자체가 음수면 -가 포함됨)

            // 아이콘 매핑 (이미지 기반)
            let iconSrc = "/images/my-cash/ic-campaign-complete.png"; // Default (Check)
            if (item.type === "withdraw")
              iconSrc = "/images/my-cash/ic-withdrawal.png"; // Refresh layout
            if (item.type === "expire")
              iconSrc = "/images/my-cash/ic-expiration-date.png"; // Clock

            return (
              <article
                key={item.id}
                className="py-5 border-b border-[#f0f0f0] last:border-none"
              >
                <div className="flex items-center justify-between">
                  {/* 왼쪽: 아이콘 + 텍스트 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex-shrink-0">
                      {/* 아이콘 크기 조정 및 정렬 */}
                      <img
                        src={iconSrc}
                        alt="icon"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-[2px]">
                      <span className="text-[12px] text-[#777]">
                        {item.date}
                      </span>
                      <span className="text-[14px] font-bold leading-tight mt-[1px]">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  {/* 오른쪽 금액 (Bold Black) */}
                  <div className="text-[15px] font-bold text-black whitespace-nowrap">
                    {formatAmount(item.amount)}캐시
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-20 text-center text-[14px] text-[#999]">
              해당 기간에 캐시 내역이 없습니다.
            </div>
          )}
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 w-full border-t border-[#eee] bg-white z-[60]">
        <BottomNav />
      </div>

      {/* 기간 선택 모달 */}
      {showPeriodModal && (
        <PeriodSelectModal
          startDate={startDate}
          endDate={endDate}
          isAllPeriod={isAllPeriod}
          onOpenDatePicker={(target) => {
            setDateTarget(target);
            setShowDatePicker(true);
          }}
          onClose={() => setShowPeriodModal(false)}
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
          onAllPeriodChange={(isAll) => setIsAllPeriod(isAll)}
          onSubmit={() => {
            setShowPeriodModal(false);
            // TODO: startDate, endDate, isAllPeriod 기준으로 필터 로직
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
