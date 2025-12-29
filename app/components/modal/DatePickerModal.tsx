"use client";

import React, { useState, useRef, useEffect } from "react";

interface Props {
  target: "start" | "end";
  onSelectDate: (date: string) => void;
  onClose: () => void;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

// --- Wheel Column Component ---
interface WheelColumnProps {
  items: string[];
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = ITEM_HEIGHT * 5; // 5 items visible

function WheelColumn({ items, value, onChange, label }: WheelColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const ignoreScroll = useRef(false);

  // 초기 스크롤 위치 설정 및 값 변경 시 스크롤 동기화
  useEffect(() => {
    if (containerRef.current && !isDragging.current) {
      const index = items.indexOf(value);
      if (index !== -1) {
        ignoreScroll.current = true;
        containerRef.current.scrollTop = index * ITEM_HEIGHT;
        // 스크롤 이벤트 발생 후 ignore flag 해제를 위해 약간 지연
        setTimeout(() => {
          ignoreScroll.current = false;
        }, 100);
      }
    }
  }, [value, items]);

  const handleScroll = () => {
    if (ignoreScroll.current || isDragging.current) return;
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const safeIndex = Math.max(0, Math.min(index, items.length - 1));
      const newValue = items[safeIndex];
      if (newValue !== value) {
        onChange(newValue);
      }
    }
  };

  // 마우스 드래그 핸들링
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.pageY;
    if (containerRef.current) {
      startScrollTop.current = containerRef.current.scrollTop;
      containerRef.current.style.cursor = "grabbing";
      containerRef.current.style.scrollSnapType = "none"; // 드래그 중 스냅 해제
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const delta = e.pageY - startY.current;
    containerRef.current.scrollTop = startScrollTop.current - delta;
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
      containerRef.current.style.scrollSnapType = "y mandatory"; // 스냅 복구
      
      // 드래그 종료 시 가장 가까운 아이템으로 스냅 및 값 업데이트
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const safeIndex = Math.max(0, Math.min(index, items.length - 1));
      
      // 부드럽게 스냅
      containerRef.current.scrollTo({
        top: safeIndex * ITEM_HEIGHT,
        behavior: "smooth"
      });
      
      onChange(items[safeIndex]);
    }
  };

  return (
    <div className="relative flex-1 text-center h-[200px]">
       {/* 휠 컨테이너 */}
      <div
        ref={containerRef}
        className="no-scrollbar h-full w-full overflow-y-scroll overscroll-contain"
        style={{
          scrollSnapType: "y mandatory",
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* 상단 패딩 (선택 영역 중앙 정렬용) */}
        <div style={{ height: ITEM_HEIGHT * 2 }} />
        
        {items.map((item, i) => (
          <div
            key={item}
            className={`flex h-[40px] items-center justify-center text-[16px] transition-colors
              ${item === value ? "font-bold text-black" : "text-[#999]"}
            `}
            style={{ scrollSnapAlign: "center" }}
          >
            {item}{label}
          </div>
        ))}
        
        {/* 하단 패딩 */}
        <div style={{ height: ITEM_HEIGHT * 2 }} />
      </div>

      {/* 선택 하이라이트 바 (Visual only) */}
      <div 
        className="pointer-events-none absolute left-0 right-0 top-1/2 -mt-[20px] h-[40px] border-t border-b border-[#eee] bg-gray-50/10"
      />
    </div>
  );
}

// --- Main Modal ---
export default function DatePickerModal({
  target,
  onSelectDate,
  onClose,
}: Props) {
  const today = new Date();
  
  // 데이터 생성
  const currentYear = today.getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => String(currentYear - 4 + i)); // -4 ~ +1년
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  // 상태 관리 (초기값: 오늘 날짜)
  const [year, setYear] = useState(String(currentYear));
  const [month, setMonth] = useState(String(today.getMonth() + 1));
  const [day, setDay] = useState(String(today.getDate()));

  const handleConfirm = () => {
    const y = year;
    const m = pad2(Number(month));
    const d = pad2(Number(day));
    onSelectDate(`${y}.${m}.${d}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[400px] rounded-[24px] bg-white pt-8 pb-6 px-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-[18px] font-bold text-left">
          {target === "start" ? "시작일" : "종료일"}
        </h2>

        {/* Picker Area */}
        <div className="mb-8 flex justify-center gap-2 overflow-hidden border-t border-b border-[#eee] py-2 relative">
           {/* 그라데이션 오버레이 */}
           <div className="pointer-events-none absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-white to-transparent z-10" />
           <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white to-transparent z-10" />

           <WheelColumn items={years} value={year} onChange={setYear} label="년" />
           <WheelColumn items={months} value={month} onChange={setMonth} label="월" />
           <WheelColumn items={days} value={day} onChange={setDay} label="일" />
        </div>

        {/* Button */}
        <button
          onClick={handleConfirm}
          className="w-full rounded-[12px] bg-[#a5ff3f] py-4 text-[16px] font-bold text-black hover:brightness-95 active:scale-[0.98] transition-all"
        >
          선택하기
        </button>
      </div>
    </div>
  );
}
