// app/my-page/edit-account/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function EditMyInfoPage() {
  const router = useRouter();

  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 폼 영역 */}
      <div className="mx-auto box-border flex-1 w-full max-w-[530px] px-5 pt-4 pb-10">
        <header className="relative mb-6 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 text-[22px]"
          >
            ←
          </button>

          <h1 className="text-[18px] font-bold text-center">내 정보 수정</h1>

          {/* 오른쪽 placeholder: 중앙 정렬 유지용 */}
          <div className="absolute right-0 w-[22px]"></div>
        </header>

        {/* ===== 아이디 ===== */}
        <div className="mb-6">
          <label className="mb-1 block text-[13px] font-semibold">아이디</label>
          <input
            defaultValue="shallwe"
            readOnly
            className="w-full rounded-[8px] border border-[#ddd] bg-[#f7f7f7] px-3 py-3 text-[14px]"
          />
        </div>

        {/* ===== 현재 비밀번호 ===== */}
        <div className="mb-6">
          <label className="mb-1 block text-[13px] font-semibold">
            현재 비밀번호
          </label>
          <div className="relative">
            <input
              type={showCurrentPw ? "text" : "password"}
              placeholder="현재 비밀번호를 입력해 주세요"
              className="w-full rounded-[8px] border border-[#ddd] px-3 py-3 pr-10 text-[14px]"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPw((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/common/ic-eye.png"
                alt="비밀번호 보기"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {/* ===== 새 비밀번호 ===== */}
        <div className="mb-6">
          <label className="mb-1 block text-[13px] font-semibold">
            새 비밀번호
          </label>
          <div className="relative">
            <input
              type={showNewPw ? "text" : "password"}
              placeholder="새 비밀번호를 입력해 주세요"
              className="w-full rounded-[8px] border border-[#ddd] px-3 py-3 pr-10 text-[14px]"
            />
            <button
              type="button"
              onClick={() => setShowNewPw((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/common/ic-eye.png"
                alt="비밀번호 보기"
                width={20}
                height={20}
              />
            </button>
          </div>
          <p className="mt-1 text-[12px] text-[#888]">
            영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요.
          </p>
        </div>

        {/* ===== 이름 / 연락처 ===== */}
        <div className="mb-8">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-[13px] font-semibold">이름·연락처</label>
            <button type="button" className="text-[12px] text-[#999] underline">
              수정하기
            </button>
          </div>

          <input
            defaultValue="권중훈"
            className="mb-2 w-full rounded-[8px] border border-[#ddd] px-3 py-3 text-[14px]"
          />
          <input
            defaultValue="010-0000-0000"
            className="w-full rounded-[8px] border border-[#ddd] px-3 py-3 text-[14px]"
          />
        </div>

        {/* ===== 이메일 + 인증 ===== */}
        <div className="mb-5">
          <label className="mb-1 block text-[13px] font-semibold">이메일</label>

          {/* 이메일 + 인증 발송 버튼 (input 안쪽) */}
          <div className="relative mb-2">
            <input
              defaultValue="shallwe@shallwe.com"
              className="w-full rounded-[8px] border border-[#ddd] px-3 py-3 pr-24 text-[14px]"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-[#E8FFC8] px-3 py-1 text-[12px] text-[#333] border border-[#cce9a5]"
            >
              인증 발송
            </button>
          </div>

          <p className="mb-2 text-[12px] text-[#777]">
            중요 정보 안내, 비밀번호 찾기에 사용돼요.
          </p>

          {/* 인증번호 + 타이머 (input 안쪽) */}
          <div className="relative mb-1">
            <input
              placeholder="인증 번호 6자리를 입력해 주세요"
              className="w-full rounded-[8px] border border-[#ddd] px-3 py-3 pr-16 text-[14px]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#FF3B30]">
              (04:59)
            </span>
          </div>

          <p className="text-[12px] text-[#FF3B30]">인증 번호 불일치</p>
        </div>

        {/* ===== 배송지 ===== */}
        <div className="mb-8">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-[13px] font-semibold">배송지</label>
            <button type="button" className="text-[12px] text-[#999] underline">
              수정하기
            </button>
          </div>
          <input
            defaultValue="서울시 강남구 언주로 726 두산빌딩"
            className="mb-2 w-full rounded-[8px] border border-[#ddd] px-3 py-3 text-[14px]"
          />
          <input
            defaultValue="3층 스튜디오쉘위"
            className="w-full rounded-[8px] border border-[#ddd] px-3 py-3 text-[14px]"
          />
        </div>

        {/* 탈퇴하기 */}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-[13px] text-[#888] underline"
            onClick={() => router.push("/my-page/delete-account")}
          >
            탈퇴하기
          </button>
        </div>
      </div>

      {/* 하단 전체폭 버튼 */}
      <button
        type="button"
        className="w-full py-4 text-[16px] font-bold bg-[#AFFF33]"
      >
        수정하기
      </button>
    </main>
  );
}
