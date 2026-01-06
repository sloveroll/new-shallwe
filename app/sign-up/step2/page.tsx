"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function SignUpStep2Page() {
  const router = useRouter();

  const [allChecked, setAllChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    over14: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  // Handle individual check
  const handleCheck = (key: keyof typeof agreements) => {
    setAgreements((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Check if all are checked
      const all = Object.values(next).every((v) => v);
      setAllChecked(all);
      return next;
    });
  };

  // Handle all check
  const handleAllCheck = () => {
    const nextState = !allChecked;
    setAllChecked(nextState);
    setAgreements({
      over14: nextState,
      service: nextState,
      privacy: nextState,
      marketing: nextState,
    });
  };

  // Sync allChecked state if individual items are unchecked manually
  useEffect(() => {
    const all = Object.values(agreements).every((v) => v);
    if (all !== allChecked) {
      setAllChecked(all);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreements]);

  const handleRegister = () => {
    // Validate required fields
    if (!agreements.over14 || !agreements.service || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    alert("회원가입이 완료되었습니다."); // Placeholder
    router.push("/login"); // Or home
  };

  const CheckIcon = ({ checked }: { checked: boolean }) => (
    <div
      className={`
      flex items-center justify-center
      w-[16px] h-[16px] rounded-full
      ${checked ? "bg-[#AFFF33]" : "bg-[#eee]"}
      transition-colors
    `}
    >
      <span
        className={`text-[12px] font-bold ${
          checked ? "text-black" : "text-[#aaa]"
        }`}
      >
        ✓
      </span>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col relative text-[#222]">
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen flex flex-col shadow-sm">
        {/* Header */}
        <SubPageHeader title="회원가입" />

        <div className="flex-1 px-5 pt-8 pb-32">
          {/* Title */}
          <h2 className="text-[20px] font-bold leading-snug mb-10">
            스튜디오 쉘위를 이용하기 위해
            <br />
            서비스 이용 약관에 동의해 주세요.
          </h2>

          <div className="flex flex-col gap-6">
            {/* All Check */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleAllCheck}
            >
              <CheckIcon checked={allChecked} />
              <span className="text-[14px] font-bold text-black pt-[2px]">
                약관 전체 동의
              </span>
            </div>

            <hr className="border-t border-[#f0f0f0]" />

            {/* List */}
            <div className="flex flex-col gap-5">
              {/* Over 14 */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleCheck("over14")}
              >
                <CheckIcon checked={agreements.over14} />
                <span className="text-[14px] text-[#333] pt-[1px]">
                  만 14세 이상입니다.
                </span>
              </div>

              {/* Service */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleCheck("service")}
              >
                <div className="flex items-center gap-2">
                  <CheckIcon checked={agreements.service} />
                  <span className="text-[14px] text-[#333] pt-[1px]">
                    [필수] 이용약관 동의
                  </span>
                </div>
                {/* Arrow */}
                <Image
                  src="/images/common/ic-rightarrow.png"
                  alt="arrow"
                  width={15}
                  height={15}
                />
              </div>

              {/* Privacy */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleCheck("privacy")}
              >
                <div className="flex items-center gap-2">
                  <CheckIcon checked={agreements.privacy} />
                  <span className="text-[14px] text-[#333] pt-[1px]">
                    [필수] 개인정보 수집 · 이용 동의
                  </span>
                </div>
                <Image
                  src="/images/common/ic-rightarrow.png"
                  alt="arrow"
                  width={15}
                  height={15}
                />
              </div>

              {/* Marketing */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleCheck("marketing")}
              >
                <div className="flex items-center gap-2">
                  {/* Marketing check style seems different in image? Looks like grey circle check if not checked? 
                      Actually locally it looks same but grey outline? 
                      Image shows: Grey circle with check.
                      My CheckIcon component handles grey bg.
                      Wait, the LAST item 'Marketing' in the image has a WHITE circle with GREY check?
                      Ah, no. The image shows: 
                      All checked: Green circle black check.
                      Others: Green circle black check.
                      Marketing (unchecked): White circle with grey BORDER? Or just grey circle?
                      Let's stick to CheckIcon logic for consistency first.
                  */}
                  <CheckIcon checked={agreements.marketing} />
                  <div className="flex flex-col">
                    <span className="text-[14px] text-[#333] pt-[1px]">
                      [선택] 마케팅 정보 수신 동의
                    </span>
                  </div>
                </div>
                <Image
                  src="/images/common/ic-rightarrow.png"
                  alt="arrow"
                  width={15}
                  height={15}
                />
              </div>

              {/* Helper text for marketing */}
              <p className="text-[13px] text-[#aaa] pl-8 -mt-3">
                캠페인 오픈 알림을 받을 수 없어요.
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] bg-white border-t border-[#f0f0f0] z-20">
          <button
            type="button"
            // Enable only if required field checked? Or allow click and alert?
            // Usually simpler to allow click and validate.
            className="w-full h-[52px] text-[16px] font-bold text-black bg-[#AFFF33]"
            onClick={handleRegister}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
