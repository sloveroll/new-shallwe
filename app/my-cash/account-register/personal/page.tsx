// app/(my-home)/my-cash/account-register/personal/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PersonalAccountRegisterPage() {
  const router = useRouter();

  const [bankName] = useState("선택하세요");
  const [accountNumber, setAccountNumber] = useState("123456789000"); // TODO: 초기값/입력처리
  const [userName] = useState("김르뷰");
  const [idNumber] = useState("880101-1******");

  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [agreeUniqueInfo, setAgreeUniqueInfo] = useState(true);

  return (
    <main className="px-5 pb-24 pt-4 bg-white text-black">
      {/* 상단 헤더 */}
      <header className="relative mb-5 flex items-center justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-0 text-[20px]"
        >
          ‹
        </button>

        <h1 className="text-[18px] font-semibold text-center">개인</h1>

        {/* 오른쪽 placeholder (좌우 균형용) */}
        <div className="absolute right-0 w-[20px]" />
      </header>

      {/* 은행 선택 */}
      <section className="mb-4">
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#999]">은행</span>
          <button
            type="button"
            className="flex items-center gap-1 text-[13px] text-[#777]"
            // TODO: 은행 선택 모달 열기
          >
            <span>{bankName}</span>
              <span className="text-[14px]">˅</span>
          </button>
        </div>

        <div className="h-[1px] bg-[#eee]" />

        {/* 계좌번호 */}
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#999]">
            계좌번호 (하이픈 - 없이 입력)
          </span>

          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-[55%] border-none bg-transparent p-0 text-right text-[14px] font-semibold outline-none"
          />
        </div>

        <p className="mt-1 text-[11px] text-[#999]">
          ⓵ 본인 명의 계좌로만 출금 가능합니다.
        </p>
      </section>

      <div className="h-[8px] bg-[#f5f5f5]" />

      {/* 이름 / 주민등록번호 */}
      <section className="mt-4 mb-4">
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#999]">이름</span>
          <span className="text-[14px] font-semibold">{userName}</span>
        </div>

        <div className="h-[1px] bg-[#eee]" />

        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#999]">주민등록번호</span>
          <span className="text-[14px] font-semibold">{idNumber}</span>
        </div>

        <p className="mt-1 text-[11px] text-[#999]">
          ⓵ 원천세 납부 용도로만 사용합니다.
        </p>
      </section>

      <div className="h-[8px] bg-[#f5f5f5]" />

      {/* 동의 영역 */}
      <section className="mt-4 space-y-3 text-[13px]">
        {/* 개인정보 수집·제공 동의 */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setAgreePersonalInfo((v) => !v)}
            className="flex items-center gap-2"
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                agreePersonalInfo
                 ? "border-[#8bdc2c] bg-[#8bdc2c] text-white"
                  : "border-[#ccc] bg-white"
              }`}
            >
              {agreePersonalInfo && (
                <span className="block h-2 w-2 rounded-full bg-white" />
              )}
            </span>
            <span>개인정보 수집 · 제공에 동의</span>
          </button>

          <button
            type="button"
            className="text-[12px] text-[#555] underline underline-offset-2"
          >
            내용보기
          </button>
        </div>

        {/* 고유식별정보 수집 동의 */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setAgreeUniqueInfo((v) => !v)}
            className="flex items-center gap-2"
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                agreeUniqueInfo
                  ? "border-[#8bdc2c] bg-[#8bdc2c] text-white"
                  : "border-[#ccc] bg-white"
              }`}
            >
              {agreeUniqueInfo && (
                <span className="block h-2 w-2 rounded-full bg-white" />
              )}
            </span>
            <span>고유식별정보 수집 동의</span>
          </button>

          <button
            type="button"
            className="text-[12px] text-[#555] underline underline-offset-2"
          >
            내용보기
          </button>
        </div>
      </section>

      {/* 하단 등록 버튼 */}
      <section className="mt-8">
        <button
          type="button"
          className="w-full rounded-[22px] bg-[#a5ff3f] py-4 text-[15px] font-semibold text-black"
          // TODO: 실제 등록 API 호출
        >
          등록하기
        </button>
      </section>
    </main>
  );
}
