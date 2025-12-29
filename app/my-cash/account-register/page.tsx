"use client";

import { useRouter } from "next/navigation";
import SubPageHeader from "@/app/components/common/SubPageHeader";
import InfoIcon from "@/app/components/common/InfoIcon";

export default function AccountRegisterPage() {
  const router = useRouter();

  return (
    <main className="pb-24 bg-white text-black min-h-screen">
      {/* 상단 헤더 */}
      <SubPageHeader title="계좌 등록" />

      <div className="px-5 pt-10">
        {/* 1. 타이틀 문구 */}
        <section className="mb-6">
          <p className="text-[20px] font-bold leading-snug break-keep text-black">
            지급 받으실 대상의 유형을 선택해 주세요.
          </p>
        </section>

        {/* 2. 버튼들 */}
        <section className="space-y-3">
          {/* 개인 */}
          <button
            type="button"
            onClick={() => router.push("/my-cash/account-register/personal")}
            className="
              flex w-full flex-col items-center justify-center
              rounded-[16px] bg-[#efefef]
              px-4 py-7 text-center
              transition-all active:scale-[0.98]
            "
          >
            <span className="mb-1 text-[18px] font-bold text-black">개인</span>
            <span className="text-[14px] text-black font-medium opacity-80">
              (3.3% 원천징수)
            </span>
          </button>

          {/* 개인 사업자 (세금계산서 발행) */}
          <button
            type="button"
            onClick={() => router.push("/my-cash/account-register/business")}
            className="
              flex w-full flex-col items-center justify-center
              rounded-[16px] bg-[#efefef]
              px-4 py-7 text-center
              transition-all active:scale-[0.98]
            "
          >
            <span className="mb-1 text-[18px] font-bold text-black">
              개인 사업자
            </span>
            <span className="text-[14px] text-black font-medium opacity-80">
              (세금계산서 발행)
            </span>
          </button>

          {/* 개인 사업자 (현금영수증·세금계산서 발행) */}
          <button
            type="button"
            onClick={() => router.push("/my-cash/account-register/business")}
            className="
              flex w-full flex-col items-center justify-center
              rounded-[16px] bg-[#efefef]
              px-4 py-7 text-center
              transition-all active:scale-[0.98]
            "
          >
            <span className="mb-1 text-[18px] font-bold text-black">
              개인 사업자
            </span>
            <span className="text-[14px] text-black font-medium opacity-80">
              (현금영수증 · 세금계산서 발행)
            </span>
          </button>
        </section>

        {/* 3. 하단 안내문 */}
        <section className="mt-8 text-[12px] text-[#999] flex items-start gap-1">
          <span className="mt-[1px]">
            <InfoIcon />
          </span>
          <p className="leading-snug">
            법인 사업자일 경우, 별도 절차가 필요하니{" "}
            <span className="underline underline-offset-4 cursor-pointer text-black font-medium">
              여기
            </span>{" "}
            에 문의해 주세요.
          </p>
        </section>
      </div>
    </main>
  );
}
