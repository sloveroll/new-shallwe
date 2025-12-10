// app/(my-home)/my-cash/account-register/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function AccountRegisterPage() {
  const router = useRouter();

  return (
    <main className="px-5 pb-24 pt-4 bg-white text-black">
      {/* 상단 헤더 */}
      <header className="relative mb-6 flex items-center justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-0 text-[20px]"
        >
          ‹
        </button>
        <h1 className="text-[18px] font-semibold text-center">계좌 등록</h1>
        {/* 오른쪽 placeholder (좌우 균형용) */}
        <div className="absolute right-0 w-[20px]" />
      </header>

      {/* 1. 타이틀 문구 */}
      <section className="mb-6 mt-[200px]">
        <p className="text-[18px] font-extrabold leading-snug">
          지금 받으실 대상의 유형을 선택해 주세요.
        </p>
      </section>

      {/* 2. 버튼들 */}
      <section className="space-y-4">
        {/* 개인 */}
        <button
          type="button"
          onClick={() => router.push("/my-cash/account-register/personal")}
          className="
            flex w-full flex-col items-center justify-center
            rounded-[18px] border border-[#e0e0e0] bg-white
            px-4 py-5 text-center
          "
        >
          <span className="mb-1 text-[16px] font-extrabold">개인</span>
          <span className="text-[12px] text-[#777]">(3.3% 원천징수)</span>
        </button>

        {/* 개인 사업자 */}
        <button
          type="button"
          onClick={() => router.push("/my-cash/account-register/business")}
          className="
            flex w-full flex-col items-center justify-center
            rounded-[18px] border border-[#e0e0e0] bg-white
            px-4 py-5 text-center
          "
        >
          <span className="mb-1 text-[16px] font-extrabold">개인 사업자</span>
          <span className="text-[12px] text-[#777]">(세금계산서 발행)</span>
        </button>
      </section>

      {/* 3. 하단 안내문 */}
      <section className="mt-6 text-[11px] text-[#888]">
        <p>
          ⓘ 법인 사업자이실 경우, 별도 절차가 필요하니{" "}
          <span className="underline underline-offset-2">
            여기
          </span>
          서 문의해 주세요.
        </p>
      </section>
    </main>
  );
}
