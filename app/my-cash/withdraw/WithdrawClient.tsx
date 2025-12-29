"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import WithdrawConfirmModal from "@/app/components/modal/WithdrawConfirmModal";
import SubPageHeader from "@/app/components/common/SubPageHeader";
import Toast from "@/app/components/common/Toast";

interface WithdrawClientProps {
  currentCash: number;
  withdrawableCash: number;
  withdrawAmount: number;
  taxAmount: number;
  actualAmount: number;
}

export default function WithdrawClient({
  currentCash,
  withdrawableCash,
  withdrawAmount,
  taxAmount,
  actualAmount,
}: WithdrawClientProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  return (
    <>
      <main className="min-h-screen bg-white pb-[80px] text-black">
        <SubPageHeader title="출금 신청" />

        {/* 1. 캐시 정보 영역 */}
        <section className="px-5 pt-4 pb-6">
          {/* 보유 캐시 */}
          <div className="flex items-center justify-between py-2 mb-2 border-b border-[#f5f5f5]">
            <div className="flex items-center gap-2">
              <img
                src="/images/common/ic-lookinglogo.png"
                alt="looking"
                className="w-6 h-6 object-contain"
              />
              <span className="text-[17px] font-bold text-black">
                보유 캐시
              </span>
            </div>
            <span className="text-[18px] font-bold text-[#aaa]">
              {currentCash.toLocaleString()}{" "}
              <span className="text-[14px] font-medium">캐시</span>
            </span>
          </div>

          {/* 출금 가능한 캐시 */}
          <div className="flex items-center justify-between py-2 border-b border-[#f5f5f5]">
            <div className="flex items-center gap-2">
              <img
                src="/images/common/ic-winklogo.png"
                alt="wink"
                className="w-6 h-6 object-contain"
              />
              <span className="text-[17px] font-bold text-black">
                출금 가능한 캐시
              </span>
            </div>
            <span className="text-[20px] font-extrabold text-black">
              {withdrawableCash.toLocaleString()}{" "}
              <span className="text-[14px] font-medium">캐시</span>
            </span>
          </div>

          {/* 안내 문구 */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#999] mt-3">
            <div className="flex items-center justify-center w-[15px] h-[15px] rounded-full border border-[#ccc] mb-[1px]">
              <span className="text-[10px] text-[#999] leading-none">!</span>
            </div>
            누적 1만 캐시 이상부터 전액 출금만 가능해요.
          </div>
        </section>

        {/* 구분선 */}
        <div className="h-3 bg-[#f5f5f5]" />

        {/* 2. 출금 계좌 정보 박스 */}
        <section className="px-5 pt-8">
          <div className="bg-[#f5f5f5] rounded-[20px] p-6 pb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-bold">출금 계좌 정보</h2>
              <button
                onClick={() => router.push("/my-cash/account-register")}
                className="text-[12px] text-[#999] underline underline-offset-2"
              >
                정보 변경
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="text-[14px] text-black underline underline-offset-2 mb-2 font-medium">
                계좌정보
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[19px] font-bold text-black">권중훈</span>
                <span className="text-[11px] text-[#333] border border-[#333] px-[5px] py-[1px] rounded-[3px]">
                  개인
                </span>
              </div>
              <div className="text-[14px] text-black underline underline-offset-2">
                쉘위은행
              </div>
              <div className="text-[20px] font-extrabold text-black pt-1">
                123-456-789000
              </div>
            </div>
          </div>
        </section>

        {/* 3. 지급 일정 */}
        <section className="px-5 pt-8 pb-10">
          <h3 className="text-[14px] font-bold underline underline-offset-4 mb-4">
            지급일정
          </h3>

          <div className="space-y-[6px] text-[14px] font-bold mb-6 text-black">
            <p>매월 3일 - 17일 신청 : 25일 지급</p>
            <p>매월 18일 - 익월 2일 신청 : 10일 지급</p>
          </div>

          <div className="space-y-1 text-[13px] text-[#333]">
            <p>*위 일정에서 미지급된 건은 신청일로부터 익월 말 지급</p>
            <p>*지급일이 공휴일인 경우 가까운 영업일에 지급</p>
            <p>*본인 · 대표자 명의 계좌로만 출금 가능</p>
          </div>
        </section>
      </main>

      {/* 4. 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] z-50">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full h-[60px] bg-[#b2ff0b] text-[18px] font-bold text-black hover:brightness-95 transition-all"
        >
          캐시 전액 출금 신청
        </button>
      </div>

      {showConfirm && (
        <WithdrawConfirmModal
          withdrawAmount={withdrawAmount}
          taxAmount={taxAmount}
          actualAmount={actualAmount}
          onConfirm={() => {
            setShowConfirm(false);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
              router.push("/my-cash");
            }, 1500);
          }}
          onClose={() => setShowConfirm(false)}
        />
      )}
      <Toast
        message="출금 신청이 완료되었어요"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
