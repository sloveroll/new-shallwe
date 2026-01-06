"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function FindIdPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "success">("input");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isError, setIsError] = useState(true); // Default true for demo to match image

  // Styles reused from sign-up/login
  const inputWrapperClass =
    "w-full h-[50px] rounded-full border border-[#ddd] bg-white px-4 flex items-center relative";
  const inputClass =
    "w-full h-full border-none bg-transparent text-[15px] focus:outline-none placeholder:text-[#bcbcbc]";

  const radioClass = `
    appearance-none
    min-w-[18px] min-h-[18px] w-[18px] h-[18px]
    rounded-full
    border border-[#ddd]
    bg-white
    checked:bg-[#AFFF33]
    checked:border-[5px]
    checked:border-white
    checked:ring-1
    checked:ring-[#ddd]
    cursor-pointer
  `;

  return (
    <div className="bg-white min-h-screen flex flex-col relative text-[#222]">
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen flex flex-col shadow-sm">
        {/* Header (No border) */}
        <SubPageHeader title="아이디 찾기" noBorder />

        <div className="flex-1 px-5 pt-8 pb-32">
          {/* Title Section */}
          {step === "input" ? (
            <>
              {/* Title Section */}
              <div className="mb-10">
                <h2 className="text-[20px] font-bold mb-2">아이디 찾기</h2>
                <p className="text-[15px] text-[#333]">
                  가입 시 등록한 정보를 입력해 주세요.
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  {/* Radio Label */}
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked
                      readOnly
                      className={radioClass}
                    />
                    <span className="text-[14px] font-bold">이메일</span>
                  </div>

                  {/* Email Input */}
                  <div className={inputWrapperClass}>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder=""
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EAFFBD] text-[12px] font-bold px-3 py-1.5 rounded-[8px] text-[#333]"
                    >
                      인증 발송
                    </button>
                  </div>
                </div>
                <div>
                  <div className={inputWrapperClass}>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className={inputClass}
                      placeholder="인증번호 6자리를 입력해주세요."
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ff4d4f] text-[14px] font-medium">
                      (04:59)
                    </span>
                  </div>
                  {/* Error Message */}
                  {isError && (
                    <p className="mt-2 text-[13px] text-[#ff4d4f]">
                      인증 번호가 일치하지 않아요.
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                className="w-full h-[52px] rounded-xl bg-[#AFFF33] text-[16px] font-bold text-black mt-10"
                onClick={() => setStep("success")}
              >
                확인
              </button>
            </>
          ) : (
            <>
              {/* Success Title */}
              <div className="mb-10">
                <h2 className="text-[20px] font-bold leading-snug mb-2">
                  가입하신 아이디를
                  <br />
                  확인해 주세요.
                </h2>
              </div>

              {/* ID Box */}
              <div className="bg-[#f5f5f5] rounded-xl p-6 mb-8">
                <p className="text-[18px] font-bold mb-2">eve••••ng</p>
                <p className="text-[13px] text-[#777]">가입일 : 2025-11-17</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="w-full h-[52px] rounded-xl bg-[#AFFF33] text-[16px] font-bold text-black"
                >
                  로그인하러 가기
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/login/reset-password")}
                  className="w-full h-[52px] rounded-xl bg-[#f0f0f0] text-[16px] font-medium text-[#333]"
                >
                  비밀번호 재설정
                </button>
              </div>
            </>
          )}

          {/* Footer Link */}
          <div className="mt-4 flex items-center gap-1 text-[13px] text-[#aaa]">
            <Image
              src="/images/common/ic-information.png"
              alt="info"
              width={15}
              height={15}
              className="object-contain"
            />
            <span>
              아이디 찾기에 어려움이 있으시다면{" "}
              <span className="underline font-semibold text-[#888]">여기</span>
              에 문의해 주세요.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
