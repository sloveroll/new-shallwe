"use client";

import React from "react";

function formatAmount(amount: number) {
  return amount.toLocaleString("ko-KR");
}

type Props = {
  withdrawAmount: number;
  taxAmount: number;
  actualAmount: number;
  onConfirm: () => void;
  onClose: () => void;
};

export default function WithdrawConfirmModal({
  withdrawAmount,
  taxAmount,
  actualAmount,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-center items-start pt-[400px] bg-black/40"
      onClick={onClose} // 바깥 클릭하면 닫기
    >
      <div
        className="w-[90%] max-w-[500px] rounded-[24px] bg-white p-6 pb-5 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 안쪽 클릭은 모달 유지
      >
        {/* 제목 */}
        <h2 className="mb-6 text-center text-[18px] font-extrabold leading-snug">
          아래의 내역으로
          <br />
          출금을 신청할까요?
        </h2>

        {/* 금액 요약 */}
        <div className="mb-6 space-y-3 text-[13px]">
          <div className="flex items-center justify-between text-[#888]">
            <span>출금 신청액</span>
            <span>{formatAmount(withdrawAmount)}원</span>
          </div>

          <div className="flex items-center justify-between text-[#bbb]">
            <div className="flex flex-col leading-tight">
              <span>원천세 공제</span>
              <span className="text-[11px]">(원 단위 절사한 금액)</span>
            </div>
            <span>-{formatAmount(taxAmount)}원</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[14px] font-semibold text-black">실제 지급액</span>
            <span className="text-[17px] font-extrabold text-black">
              {formatAmount(actualAmount)}원
            </span>
          </div>
        </div>

        {/* 버튼 2개 */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-[18px] bg-[#a5ff3f] py-3 text-[15px] font-semibold text-black"
          >
            신청하기
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-[18px] bg-[#e0e0e0] py-3 text-[15px] font-semibold text-[#666]"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
