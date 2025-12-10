"use client";

import React, { useState } from "react";
import Picker from "react-mobile-picker";

interface Props {
  target: "start" | "end";
  onSelectDate: (date: string) => void;
  onClose: () => void;
}

type PickerValue = {
  year: string;
  month: string;
  day: string;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function DatePickerModal({
  target,
  onSelectDate,
  onClose,
}: Props) {
  const today = new Date();

  // 연도 범위 (원하면 조절 가능)
  const currentYear = today.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i); // 최근 5년
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [value, setValue] = useState<PickerValue>({
    year: String(currentYear),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  });

  const handleConfirm = () => {
    const y = value.year;
    const m = pad2(Number(value.month));
    const d = pad2(Number(value.day));

    const formatted = `${y}.${m}.${d}`; // 예: 2025.11.25
    onSelectDate(formatted);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className="w-[90%] max-w-[500px] rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 내용 클릭 시 닫힘 방지
      >
        {/* 타이틀 */}
        <h2 className="mb-4 text-[18px] font-bold">
          {target === "start" ? "시작일" : "종료일"}
        </h2>

        {/* 휠 픽커 영역 */}
        <div className="mb-6">
          <Picker
            value={value}
            onChange={(next) => setValue(next as PickerValue)}
            height={180}
            itemHeight={36}
          >
            {/* 연도 */}
            <Picker.Column name="year">
              {years.map((y) => (
                <Picker.Item key={y} value={String(y)}>
                  {y}년
                </Picker.Item>
              ))}
            </Picker.Column>

            {/* 월 */}
            <Picker.Column name="month">
              {months.map((m) => (
                <Picker.Item key={m} value={String(m)}>
                  {m}월
                </Picker.Item>
              ))}
            </Picker.Column>

            {/* 일 */}
            <Picker.Column name="day">
              {days.map((d) => (
                <Picker.Item key={d} value={String(d)}>
                  {d}일
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>

        {/* 선택하기 버튼 */}
        <button
          onClick={handleConfirm}
          className="w-full rounded-xl bg-[#a5ff3f] py-3 text-[16px] font-bold text-black"
        >
          선택하기
        </button>
      </div>
    </div>
  );
}
