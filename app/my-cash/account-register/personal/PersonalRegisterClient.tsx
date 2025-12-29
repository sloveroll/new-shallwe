"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { registerPersonalAccount } from "./actions";
import SubPageHeader from "@/app/components/common/SubPageHeader";
import InfoIcon from "@/app/components/common/InfoIcon";

interface Props {
  initialData: {
    userName: string;
    idNumber: string;
  };
}

export default function PersonalRegisterClient({ initialData }: Props) {
  const router = useRouter();

  const [bankName] = useState("선택하세요");
  const [accountNumber, setAccountNumber] = useState("");
  const [userName, setUserName] = useState("");

  // 주민등록번호 상태
  const [frontId, setFrontId] = useState("");
  const [backIdFirst, setBackIdFirst] = useState("");
  const [backIdRest, setBackIdRest] = useState("");

  const frontIdRef = useRef<HTMLInputElement>(null);
  const backIdFirstRef = useRef<HTMLInputElement>(null);
  const backIdRestRef = useRef<HTMLInputElement>(null);

  // 초기값 파싱 (필요하다면 유지하되, 기본적으로는 빈 값)
  // user request: "처음 페이지 열렸을 때 다 빈칸으로 해줘" -> initialData가 있어도 무시하거나, initialData 자체가 빈 값으로 오게 처리?
  // 보통 initialData는 서버에서 내려주는 값이므로, 만약 수정 페이지라면 채워져 있어야 하고 등록 페이지라면 비워져 있어야 함.
  // 현재 문맥은 'Account Register'이므로 신규 등록임. initialData가 빈 문자열로 올 것임.
  // 하지만 코드 상에서 useState(initialData.userName) 처럼 쓰고 있었는데,
  // User asked "make it blank when first opened". I will force empty strings initially.

  useEffect(() => {
    // If we wanted to support editing, we would use initialData.
    // But user explicitly asked for blank.
    // I'll keep the effect but rely on the fact we initialize with empty strings above if that's what's needed,
    // OR strictly follow "make it blank" by ignoring initialData temporarily or assuming it's empty.
    // Let's just initialize state to "" and only use initialData if it actually has content (which it might not in a fresh register flow).
    if (initialData?.idNumber) {
      // ... parsing logic (kept for robustness if data exists)
    }
  }, [initialData]);

  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [agreeUniqueInfo, setAgreeUniqueInfo] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleFrontIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setFrontId(val);
    if (val.length === 6) {
      backIdFirstRef.current?.focus();
    }
  };

  const handleBackIdFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    setBackIdFirst(val);
    if (val.length === 1) {
      backIdRestRef.current?.focus();
    }
  };

  const handleBackIdRestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setBackIdRest(val);
  };

  // Backspace handlers regarding focus
  const handleBackIdFirstKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && backIdFirst === "") {
      frontIdRef.current?.focus();
    }
  };

  const handleBackIdRestKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && backIdRest === "") {
      backIdFirstRef.current?.focus();
    }
  };

  const handleRegister = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const fullIdNumber = `${frontId}-${backIdFirst}${backIdRest}`;

      const result = await registerPersonalAccount({
        bankName,
        accountNumber,
        userName,
        idNumber: fullIdNumber,
      });

      if (result.success) {
        alert(result.message);
        router.push("/my-cash");
      } else {
        alert("등록에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pb-24 bg-white text-black min-h-screen relative">
      <SubPageHeader title="계좌 등록" />

      {/* 은행 선택 */}
      <section className="mt-4 px-5">
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
            계좌번호 (하이픈-없이 입력)
          </span>

          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-[55%] border-none bg-transparent p-0 text-right text-[14px] font-bold outline-none placeholder:text-[#ccc]"
            placeholder="입력하세요"
          />
        </div>

        <div className="h-[1px] bg-[#eee]" />

        <div className="mt-2 flex items-start gap-1 text-[12px] text-[#999]">
          <span className="mt-[1px]">
            <InfoIcon />
          </span>
          <p className="leading-snug">본인 명의 계좌로만 출금 가능합니다.</p>
        </div>
      </section>

      <div className="h-[8px] bg-[#f5f5f5] mt-6" />

      {/* 이름 / 주민등록번호 */}
      <section className="px-5 py-4">
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#999]">이름</span>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-[55%] border-none bg-transparent p-0 text-right text-[14px] font-bold outline-none placeholder:text-[#ccc]"
          />
        </div>

        <div className="h-[1px] bg-[#eee]" />

        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#999]">주민등록번호</span>

          <div className="flex items-center gap-[2px]">
            {/* 앞자리 */}
            <input
              ref={frontIdRef}
              type="text"
              value={frontId}
              onChange={handleFrontIdChange}
              className="w-[60px] border-none bg-transparent p-0 text-center text-[14px] font-bold outline-none placeholder:text-[#ccc]"
              placeholder="000000"
              maxLength={6}
            />

            <span className="text-[14px] font-bold text-black">-</span>

            {/* 뒷자리 첫글자 + 나머지 */}
            <div className="flex items-center">
              <input
                ref={backIdFirstRef}
                type="text"
                value={backIdFirst}
                onChange={handleBackIdFirstChange}
                onKeyDown={handleBackIdFirstKeyDown}
                className="w-[10px] border-none bg-transparent p-0 text-center text-[14px] font-bold outline-none placeholder:text-[#ccc]"
                placeholder="*"
                maxLength={1}
              />
              <input
                ref={backIdRestRef}
                type="password"
                value={backIdRest}
                onChange={handleBackIdRestChange}
                onKeyDown={handleBackIdRestKeyDown}
                className="w-[60px] border-none bg-transparent p-0 text-left text-[14px] font-bold outline-none placeholder:text-[#ccc] tracking-widest"
                placeholder="******"
                maxLength={6}
              />
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#eee]" />

        <div className="mt-2 flex items-start gap-1 text-[12px] text-[#999]">
          <span className="mt-[1px]">
            <InfoIcon />
          </span>
          <p className="leading-snug">원천세 납부 용도로만 사용합니다.</p>
        </div>
      </section>

      <div className="h-[8px] bg-[#f5f5f5]" />

      {/* 동의 영역 */}
      <section className="px-5 mt-4 space-y-3 text-[13px]">
        {/* 개인정보 수집·제공 동의 */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreePersonalInfo}
              onChange={(e) => setAgreePersonalInfo(e.target.checked)}
              className="appearance-none min-w-[14px] min-h-[14px] w-[14px] h-[14px] rounded-full border border-[#ddd] bg-white checked:bg-[#AFFF33] checked:border-[3.5px] checked:border-white checked:ring-1 checked:ring-[#ddd] cursor-pointer"
            />
            <span>개인정보 수집 · 제공에 동의</span>
          </label>

          <button
            type="button"
            className="text-[12px] text-[#999] underline underline-offset-2"
          >
            내용보기
          </button>
        </div>

        {/* 고유식별정보 수집 동의 */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeUniqueInfo}
              onChange={(e) => setAgreeUniqueInfo(e.target.checked)}
              className="appearance-none min-w-[14px] min-h-[14px] w-[14px] h-[14px] rounded-full border border-[#ddd] bg-white checked:bg-[#AFFF33] checked:border-[3.5px] checked:border-white checked:ring-1 checked:ring-[#ddd] cursor-pointer"
            />
            <span>고유식별정보 수집 동의</span>
          </label>

          <button
            type="button"
            className="text-[12px] text-[#999] underline underline-offset-2"
          >
            내용보기
          </button>
        </div>
      </section>

      {/* 하단 등록 버튼 (Fixed) */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] z-50">
        <button
          type="button"
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full h-[60px] bg-[#a5ff3f] text-[18px] font-bold text-black hover:brightness-95 transition-all disabled:opacity-50"
        >
          {isLoading ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </main>
  );
}
