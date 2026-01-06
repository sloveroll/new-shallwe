"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"verify" | "reset">("verify");

  // Step 1 States
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isError, setIsError] = useState(true); // Default true for demo to match image

  // Step 2 States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Shared styles
  const inputWrapperClass =
    "w-full h-[50px] rounded-full border border-[#ddd] bg-white px-4 flex items-center relative";
  const inputClass =
    "w-full h-full border-none bg-transparent text-[15px] focus:outline-none placeholder:text-[#bcbcbc]";

  const handleVerify = () => {
    // Add verification logic here
    setStep("reset");
  };

  const handleReset = () => {
    // Add reset logic here
    alert("비밀번호가 변경되었습니다.");
    router.push("/login");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative text-[#222]">
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen flex flex-col shadow-sm">
        {/* Header (No border based on image) */}
        <SubPageHeader title="비밀번호 재설정" noBorder />

        <div className="flex-1 px-5 pt-8 pb-32">
          {step === "verify" ? (
            <>
              {/* Title Section */}
              <div className="mb-10">
                <h2 className="text-[20px] font-bold mb-2">비밀번호 재설정</h2>
                <p className="text-[15px] text-[#333]">
                  가입 시 등록한 정보를 입력해 주세요.
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-6">
                {/* ID Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-[#222]">
                    아이디
                  </label>
                  <div className={inputWrapperClass}>
                    <input
                      type="text"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className={inputClass}
                      placeholder=""
                    />
                  </div>
                  <p className="text-[12px] text-[#aaa]">
                    5-20자의 영문 소문자, 숫자, 특수기호-,_만 사용 가능
                  </p>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-[#222]">
                    이메일
                  </label>
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

                {/* Verification Code Input */}
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
                onClick={handleVerify}
              >
                확인
              </button>

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
                  비밀번호 찾기에 어려움이 있으시다면{" "}
                  <span className="underline font-semibold text-[#888]">
                    여기
                  </span>
                  에 문의해 주세요.
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Title Section */}
              <div className="mb-10">
                <h2 className="text-[20px] font-bold mb-2">
                  새로운 비밀번호를 입력해 주세요.
                </h2>
                <p className="text-[15px] text-[#333]">
                  영문, 숫자, 특수문자 포함 8자리 이상
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-3">
                <div className={inputWrapperClass}>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputClass}
                    placeholder="새 비밀번호를 입력해 주세요."
                  />
                </div>
                <div className={inputWrapperClass}>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                    placeholder="새 비밀번호를 한번 더 입력해 주세요."
                  />
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                className="w-full h-[52px] rounded-xl bg-[#AFFF33] text-[16px] font-bold text-black mt-10"
                onClick={handleReset}
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
