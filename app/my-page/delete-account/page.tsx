"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteAccountConfirmModal from "@/app/components/modal/DeleteAccountConfirmModal";

export default function WithdrawPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="w-full max-w-[530px] mx-auto px-5 pt-4 pb-10 box-border flex-1">
        <header className="relative mb-6 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 text-[22px]"
          >
            ←
          </button>
          <h1 className="text-[18px] font-bold text-center">회원 탈퇴</h1>
          <div className="absolute right-0 w-[22px]"></div>
        </header>

        {/* 유의사항 */}
        <section className="mb-6">
          <h2 className="text-[18px] font-bold mb-3">
            탈퇴 전, 유의사항을 확인해 주세요.
          </h2>

          <div className="bg-[#f7f7f7] rounded-xl px-4 py-4 text-[13px] leading-relaxed">
            <p className="mb-2">
              1. 진행 중인 캠페인 종료 이후 탈퇴가 가능합니다.
            </p>
            <p className="mb-2">
              2. 탈퇴 시 캐시를 포함한 모든 데이터가 삭제되며 복구가 불가합니다.
            </p>
            <p>3. 회원 탈퇴 후 3개월간 동일 아이디로 재가입이 불가합니다.</p>
          </div>

          <label className="flex items-center gap-2 mt-3 text-[13px]">
            <input type="checkbox" className="w-4 h-4" />
            <span>유의사항을 확인하였으며 동의합니다.</span>
          </label>
        </section>

        {/* 탈퇴 사유 */}
        <section className="mb-8">
          <h2 className="text-[18px] font-bold mb-1">
            탈퇴 사유를 선택해 주세요.
          </h2>
          <p className="text-[12px] text-[#777] mb-4">
            소중한 의견을 반영하여 더 나은 서비스로 개선해 나가겠습니다.
          </p>

          <div className="flex flex-col gap-3 text-[14px]">
            <label className="flex items-center gap-2">
              <input type="radio" name="reason" className="w-4 h-4" />
              <span>이용 빈도가 낮음</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="reason" className="w-4 h-4" />
              <span>캠페인 당첨 확률이 낮음</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="reason" className="w-4 h-4" />
              <span>캠페인이 많지 않음</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="reason" className="w-4 h-4" />
              <span>진행 과정, CS 등 서비스 불만족</span>
            </label>
            <label className="flex items-start gap-2">
              <input type="radio" name="reason" className="mt-1 w-4 h-4" />
              <div className="flex-1">
                <span className="block mb-2">기타</span>
                <input
                  type="text"
                  className="w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[13px]"
                  placeholder="기타 사유를 입력해 주세요."
                />
              </div>
            </label>
          </div>
        </section>
      </div>

      {/* 하단 탈퇴하기 버튼 */}
      <button
        type="button"
        className="w-full py-4 text-[16px] font-bold bg-[#AFFF33]"
        onClick={() => setIsModalOpen(true)}
      >
        탈퇴하기
      </button>

      {/* 탈퇴 확인 모달 */}
      <DeleteAccountConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          // TODO: 실제 탈퇴 API 호출
          alert("탈퇴가 완료되었습니다.");
          router.push("/");
        }}
      />
    </main>
  );
}
