// app/(my-home)/my-cash/account-register/business/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BusinessAccountRegisterPage() {
  const router = useRouter();

  // 더미 값들 – 나중에 실제 값/입력연동으로 바꾸면 됨
  const [shopName, setShopName] = useState("두산매거진");
  const [ceoName, setCeoName] = useState("홍길동");
  const [regNumber, setRegNumber] = useState("436-29-00148");
  const [bankName, setBankName] = useState("선택하세요");
  const [accountNumber, setAccountNumber] = useState("123456789000");

  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);

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

        <div className="flex items-center gap-2">
          <h1 className="text-[18px] font-semibold text-center">개인 사업자</h1>
        </div>

        <div className="absolute right-0 w-[20px]" />
      </header>

      {/* ── 상호 / 대표자 / 사업자번호 / 사업자등록증 ── */}
      <section className="mb-4">
        {/* 상호명 */}
        <div className="flex items-center justify-between py-5">
          <span className="text-[13px] text-[#bbb]">상호명</span>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-[60%] border-none bg-transparent p-0 text-right text-[14px] font-semibold outline-none"
          />
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

        {/* 대표자명 */}
        <div className="flex items-center justify-between py-5">
          <span className="text-[13px] text-[#bbb]">대표자명</span>
          <input
            type="text"
            value={ceoName}
            onChange={(e) => setCeoName(e.target.value)}
            className="w-[60%] border-none bg-transparent p-0 text-right text-[14px] font-semibold outline-none"
          />
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

        {/* 사업자 등록 번호 */}
        <div className="flex items-center justify-between py-5">
          <span className="text-[13px] text-[#bbb]">사업자 등록 번호</span>
          <input
            type="text"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            className="w-[60%] border-none bg-transparent p-0 text-right text-[14px] font-semibold outline-none"
          />
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

        {/* 사업자 등록증 첨부 */}
        <div className="flex items-center justify-between py-5">
          <span className="text-[13px] text-[#bbb]">사업자 등록증</span>

          <button
            type="button"
            className="rounded-[8px] border border-[#ff4b4b] px-3 py-[6px] text-[12px] font-semibold text-[#ff4b4b]"
            // TODO: 파일 업로드
          >
            첨부하기
          </button>
        </div>
        

        <p className="mt-1 text-[11px] text-[#999]">
          ⓵ 세금계산서 발급 및 거래 증빙 관리 용도로만 사용합니다.
        </p>
      </section>

      <div className="-mx-5 h-[8px] bg-[#f5f5f5]" />

      {/* ── 은행 / 계좌 번호 ── */}
      <section className="mt-4 mb-4">
        {/* 은행 */}
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#999]">은행</span>

          <button
            type="button"
            className="flex items-center gap-1 text-[13px] text-[#777]"
            // TODO: 은행 선택 모달
          >
            <span>{bankName}</span>
            <span className="text-[14px]">˅</span>
          </button>
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

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
          ⓵ 대표자 명의 계좌로만 출금 가능합니다.
        </p>
      </section>

      <div className="-mx-5 h-[8px] bg-[#f5f5f5]" />

      {/* ── 동의 영역 ── */}
      <section className="mt-4 space-y-4 text-[13px]">
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
                  ? "border-[#222] bg-[#222]"
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

        {/* 세금계산서 발행 절차 안내 박스 */}
        <div className="rounded-[12px] bg-[#f5f5f5] px-4 py-4 text-center text-[12px] text-[#555] leading-relaxed">
          <p className="mb-1 text-[13px] font-semibold">
            세금계산서 발행 절차 안내
          </p>
          <p>
            지급일 이전 세금계산서 발행 요청을 위해 개별 연락을 드릴 예정이며,
            <br />
            세금계산서 발행 완료 후 최종 지급이 진행됩니다.
            <br />
            (기한 내 미발행 시 지급이 지연될 수 있음)
          </p>
        </div>

        {/* 지급 절차 확인 체크 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConfirmProcess((v) => !v)}
            className="flex items-center gap-2"
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${
                confirmProcess
                  ? "border-[#222] bg-[#222]"
                  : "border-[#ccc] bg-white"
              }`}
            >
              {confirmProcess && (
                <span className="block h-2 w-2 rounded-[2px] bg-white" />
              )}
            </span>
            <span>네, 지급 절차를 확인하였습니다.</span>
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
