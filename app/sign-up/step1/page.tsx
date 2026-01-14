"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SubPageHeader from "@/app/components/common/SubPageHeader";
import PasswordInput from "@/app/components/common/PasswordInput";

export default function SignUpPage() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Handler placeholders
  const handleVerifyEmail = () => {
    alert("인증번호가 발송되었습니다.");
    // Timer logic start...
  };

  const handleNext = () => {
    router.push("/sign-up/step2");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative text-[#222]">
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen flex flex-col shadow-sm">
        {/* Header */}
        <SubPageHeader title="회원가입" />

        <div className="flex-1 px-5 pt-8 pb-32">
          {/* Title */}
          <h2 className="text-[20px] font-bold leading-snug mb-10">
            만나서 반가워요!
            <br />
            회원가입을 위한 정보를 입력해 주세요.
          </h2>

          <div className="flex flex-col gap-6">
            {/* ID */}
            <div>
              <label className="block text-[14px] font-bold mb-2">
                아이디<span className="text-[#ff4d4f]">*</span>
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full h-[50px] rounded-xl border border-[#ddd] px-4 text-[15px] focus:outline-none focus:border-[#000]"
                placeholder=""
              />
              <p className="mt-2 text-[12px] text-[#aaa]">
                5-20자의 영문 소문자, 숫자, 특수기호-,_만 사용 가능
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[14px] font-bold mb-2">
                비밀번호<span className="text-[#ff4d4f]">*</span>
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
              />
              <p className="mt-2 text-[12px] text-[#aaa]">
                영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[14px] font-bold mb-2">
                이메일<span className="text-[#ff4d4f]">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[50px] rounded-xl border border-[#ddd] pl-4 pr-24 text-[15px] focus:outline-none focus:border-[#000]"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EAFFBD] text-[12px] font-bold px-3 py-1.5 rounded-[8px] text-[#333]"
                >
                  인증 발송
                </button>
              </div>
              <p className="mt-2 text-[12px] text-[#aaa]">
                중요 정보 안내, 비밀번호 찾기에 사용되요.
              </p>
            </div>

            {/* Verification Code */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full h-[50px] rounded-xl border border-[#ddd] px-4 text-[15px] focus:outline-none focus:border-[#000]"
                  placeholder="인증번호 6자리를 입력해주세요."
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ff4d4f] text-[14px] font-medium">
                  (04:59)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] bg-white border-t border-[#f0f0f0] z-20">
          <button
            type="button"
            className="w-full h-[52px] text-[16px] font-bold text-black bg-[#AFFF33]"
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
