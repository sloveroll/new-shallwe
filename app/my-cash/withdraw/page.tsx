// app/(my-home)/my-cash/withdraw/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import WithdrawConfirmModal from "@/app/components/modal/WithdrawConfirmModal";

export default function CashWithdrawPage() {
  const router = useRouter();
  const withdrawAmount = 1_000_000; // 출금 신청액
  const taxAmount = 33_000; // 원천세 공제
  const actualAmount = withdrawAmount - taxAmount;
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="px-5 pb-24 pt-4 bg-white text-black">
      {/* 상단 헤더 (뒤로가기 + 타이틀) */}
      <header className="relative mb-5 flex items-center justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-0 text-[20px]"
        >
          ‹
        </button>

        <h1 className="text-[18px] font-semibold text-center">출금 신청</h1>

        {/* RIGHT AREA (버튼 크기 맞추기용 placeholder) */}
        <div className="absolute right-0 w-[20px]">{/* empty */}</div>
      </header>

      {/* 1. 보유 캐시 */}
      <section className="pb-4 border-b border-[#eee]">
        <div className="flex items-center justify-between text-[14px] mb-2">
          <span className="font-semibold">보유 캐시</span>
          <span className="text-[20px] font-extrabold">
            1,000,000
            <span className="ml-[4px] text-[14px] font-semibold">캐시</span>
          </span>
        </div>
      </section>

      {/* 2. 출금 가능한 캐시 */}
      <section className="py-4 border-b border-[#eee]">
        <div className="flex items-center justify-between text-[14px] mb-1">
          <span className="font-semibold text-[#6b4ce6]">출금 가능한 캐시</span>
          <span className="text-[20px] font-extrabold text-[#6b4ce6]">
            1,000,000
            <span className="ml-[4px] text-[14px] font-semibold">캐시</span>
          </span>
        </div>
        <p className="mt-1 text-[11px] text-[#999]">
          누적 1만 캐시 이상부터 전액 출금만 가능해요.
        </p>
      </section>

      {/* 3. 출금 계좌 정보 제목 */}
      <section className="pt-5">
        <h2 className="mb-3 text-[15px] font-semibold">출금 계좌 정보</h2>

        {/* 계좌 등록 박스 */}
        <button
          type="button"
          onClick={() => router.push("/my-cash/account-register")}
          className="w-full rounded-[20px] bg-[#f5f5f5] px-5 py-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-1 mx-auto text-[14px] text-[#black]">
            <span className="text-[15px]">ⓘ</span>
            <span>출금 계좌를 등록해주세요.</span>
            <span className="text-[20px] text-black">›</span>
          </div>
        </button>
      </section>

      {/* 4. 지급 일정 안내 */}
      <section className="mt-5 rounded-[16px] bg-[#f5f5f5] px-5 py-4 text-[12px] text-[#666]">
        <p className="mb-2 font-semibold">[지급 일정]</p>
        <ul className="mb-2 list-disc pl-4 space-y-[2px]">
          <li>매월 3일~17일 신청 : 25일 지급</li>
          <li>매월 18일~익월 2일 신청 : 10일 지급</li>
        </ul>
        <p className="text-[11px] text-[#999] leading-[1.5]">
          ※ 위 일정에서 미지급된 건은 신청일로부터 익월 말 지급
          <br />
          ※ 지급일이 공휴일인 경우 가까운 영업일에 지급
          <br />※ 본인·대표자 명의 계좌로만 출금 가능
        </p>
      </section>

      {/* 5. 하단 버튼 */}
      <section className="mt-6">
        <button
          type="button"
          // disabled  // 필요하면 조건 걸어서 비활성 처리
          onClick={() => setShowConfirm(true)}
          className="w-full rounded-[20px] bg-[#a5ff3f] py-4 text-[15px] font-semibold text-black"
        >
          캐시 전액 출금 신청
        </button>
      </section>

      {/* 출금 신청 확인 모달 */}
      {showConfirm && (
        <WithdrawConfirmModal
          withdrawAmount={withdrawAmount}
          taxAmount={taxAmount}
          actualAmount={actualAmount}
          onConfirm={() => {
            // TODO: 실제 출금 신청 API 호출
            console.log("출금 신청 완료");
            setShowConfirm(false);
          }}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </main>
  );
}
