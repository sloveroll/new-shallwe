// app/login/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function LoginPage() {
  const router = useRouter();
  const [autoLogin, setAutoLogin] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-white px-5 pb-24">
      {/* 상단 헤더 (뒤로가기 + 타이틀) */}
      {/* 상단 헤더 (뒤로가기 + 타이틀) */}
      <div className="-mx-5 mb-6">
        <SubPageHeader title="로그인" noBorder />
      </div>

      {/* 로고 + 서브타이틀 (my-home Header 느낌으로) */}
      <section className="mb-7">
        <div className="mb-2">
          <Image
            src="/images/main-logo.svg"
            alt="Shallwe Logo"
            width={420}
            height={100}
            className="
              h-auto w-full
              transition-all duration-200 ease-in-out
            "
          />
        </div>
        <p className="mt-1 text-[13px] leading-snug text-[#555]">
          마이크로 인플루언서의{" "}
          <span className="font-bold">올인원 협업 플랫폼</span>
        </p>
      </section>

      {/* 입력 폼 영역 */}
      <section className="space-y-4">
        {/* 아이디 */}
        <div>
          <label className="mb-1 flex items-center text-[12px] font-semibold text-[#333]">
            <Image
              src="/images/common/ic-lookinglogo.png"
              alt="아이디 아이콘"
              width={16}
              height={16}
              className="mr-1"
            />
            아이디
          </label>

          <div className="flex items-center rounded-full border border-[#ddd] bg-white px-4 h-[50px]">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="5-20자의 영문 소문자, 숫자, 특수기호(_, -) 사용 가능"
              className="w-full border-none bg-transparent text-[15px] text-[#333] placeholder:text-[#bcbcbc] focus:outline-none"
            />

            {/* X 버튼 (입력값 있을 때만 노출) */}
            {userId.length > 0 && (
              <button
                type="button"
                onClick={() => setUserId("")}
                className="ml-2 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#dddddd] text-[11px] text-[#aaaaaa]"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="mb-1 flex items-center text-[12px] font-semibold text-[#333]">
            <Image
              src="/images/common/ic-lookinglogo.png"
              alt="비밀번호 아이콘"
              width={16}
              height={16}
              className="mr-1"
            />
            비밀번호
          </label>

          <div className="flex items-center rounded-full border border-[#ddd] bg-white px-4 h-[50px]">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="영문, 숫자 특수문자 포함 8자리 이상"
              className="w-full border-none bg-transparent text-[15px] text-[#333] placeholder:text-[#bcbcbc] focus:outline-none"
            />

            {/* 눈 아이콘 */}
            <button
              type="button"
              className="ml-2 flex h-[20px] w-[20px] items-center justify-center"
              // TODO: 나중에 비밀번호 보기 토글 기능 연결
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

        {/* 자동 로그인 / 아이디 찾기 / 비밀번호 찾기 */}
        <div className="mt-1 flex items-center justify-between text-[13px] text-[#777]">
          <button
            type="button"
            onClick={() => setAutoLogin((prev) => !prev)}
            className="flex items-center gap-1"
          >
            <span
              className={`
                flex h-[14px] w-[14px] items-center justify-center rounded-[4px]
                border
                ${
                  autoLogin
                    ? "border-[#a5ff3f] bg-[#a5ff3f]"
                    : "border-[#cccccc] bg-white"
                }
              `}
            >
              {autoLogin && <span className="text-[10px] text-black">✓</span>}
            </span>
            <span>자동 로그인</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-[#777]"
              onClick={() => router.push("/login/find-id")}
            >
              아이디 찾기
            </button>
            <span className="text-[#dddddd]">|</span>
            <button
              type="button"
              className="text-[#777]"
              onClick={() => router.push("/login/reset-password")}
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      </section>

      {/* 버튼들 */}
      <section className="mt-8">
        <button
          type="button"
          className="mb-3 w-full rounded-xl bg-[#AFFF33] py-3 text-[15px] font-bold text-black"
        >
          로그인
        </button>

        <p className="mb-2 mt-5 text-[12px] text-[#777]">
          아직 회원이 아니신가요?
        </p>

        <button
          type="button"
          onClick={() => router.push("/sign-up/step1")}
          className="w-full rounded-xl bg-[#eeeeee] py-3 text-[14px] font-semibold text-[#333]"
        >
          회원가입
        </button>
      </section>
    </main>
  );
}
