"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SubPageHeader from "@/app/components/common/SubPageHeader";
import { registerBusinessAccount } from "./actions";
import InfoIcon from "@/app/components/common/InfoIcon";

interface Props {
  initialData?: {
    shopName: string;
    ceoName: string;
    regNumber: string;
    accountNumber: string;
  };
}

export default function BusinessRegisterClient({ initialData }: Props) {
  const router = useRouter();

  const [shopName, setShopName] = useState(initialData?.shopName || "");
  const [ceoName, setCeoName] = useState(initialData?.ceoName || "");
  const [regNumber, setRegNumber] = useState(initialData?.regNumber || "");
  const [bankName] = useState("선택하세요");
  const [accountNumber, setAccountNumber] = useState(
    initialData?.accountNumber || ""
  );

  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await registerBusinessAccount({
        shopName,
        ceoName,
        regNumber,
        bankName,
        accountNumber,
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
      <SubPageHeader title="개인 사업자" />

      {/* ── 상호 / 대표자 / 사업자번호 / 사업자등록증 ── */}
      <section className="px-5 mt-4">
        {/* 상호명 */}
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#bbb]">상호명</span>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-[60%] border-none bg-transparent p-0 text-right text-[14px] font-bold outline-none placeholder:text-[#ccc]"
            placeholder="입력하세요"
          />
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

        {/* 대표자명 */}
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#bbb]">대표자명</span>
          <input
            type="text"
            value={ceoName}
            onChange={(e) => setCeoName(e.target.value)}
            className="w-[60%] border-none bg-transparent p-0 text-right text-[14px] font-bold outline-none placeholder:text-[#ccc]"
            placeholder="입력하세요"
          />
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

        {/* 사업자 등록 번호 */}
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#bbb]">사업자 등록 번호</span>
          <input
            type="text"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            className="w-[60%] border-none bg-transparent p-0 text-right text-[14px] font-bold outline-none placeholder:text-[#ccc]"
            placeholder="입력하세요"
          />
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

        {/* 사업자 등록증 첨부 */}
        <div className="flex items-center justify-between py-3">
          <span className="text-[13px] text-[#bbb]">사업자 등록증</span>

          <button
            type="button"
            className="rounded-[8px] border border-[#ff4b4b] px-3 py-[6px] text-[12px] font-semibold text-[#ff4b4b]"
            // TODO: 파일 업로드
          >
            첨부하기
          </button>
        </div>
        <div className="h-[1px] bg-[#f0f0f0]" />

        <div className="mt-2 flex items-start gap-1 text-[12px] text-[#999]">
          <span className="mt-[1px]">
            <InfoIcon />
          </span>
          <p className="leading-snug">
            세금계산서 발급 및 거래 증빙 관리 용도로만 사용합니다.
          </p>
        </div>
      </section>

      <div className="h-[8px] bg-[#f5f5f5] mt-6" />

      {/* ── 은행 / 계좌 번호 ── */}
      <section className="px-5 mt-4 mb-4">
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
        <div className="h-[1px] bg-[#f0f0f0]" />

        <div className="mt-2 flex items-start gap-1 text-[12px] text-[#999]">
          <span className="mt-[1px]">
            <InfoIcon />
          </span>
          <p className="leading-snug">대표자 명의 계좌로만 출금 가능합니다.</p>
        </div>
      </section>

      <div className="h-[8px] bg-[#f5f5f5]" />

      {/* ── 동의 영역 ── */}
      <section className="px-5 mt-4 space-y-4 text-[13px]">
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
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={confirmProcess}
                onChange={(e) => setConfirmProcess(e.target.checked)}
                className="peer appearance-none w-[18px] h-[18px] border border-[#ddd] rounded-[4px] bg-white checked:bg-white checked:border-black transition-all cursor-pointer"
              />
              <svg
                className="absolute w-[12px] h-[12px] text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[13px]">네, 지급 절차를 확인하였습니다.</span>
          </label>
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
