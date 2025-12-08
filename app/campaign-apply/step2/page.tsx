"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ApplyCompleteModal from "../../components/modal/ApplyCompleteModal";

export default function CampaignApplyConfirmPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-white pb-[50px]">
      <div className="w-full max-w-[530px] mx-auto px-5 py-4 box-border">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          className="
            border-0 bg-transparent
            cursor-pointer
            text-[22px]
            mb-[10px]
          "
        >
          ←
        </button>

        <h1 className="text-center text-[18px] font-bold mb-6">
          캠페인 신청
        </h1>

        <h2 className="text-[20px] font-bold leading-[1.4] mb-6">
          협업 진행 중 아래 내용들은 꼭 지켜주세요.
        </h2>

        {/* 박스 1: 원활한 소통 */}
        <section className="mb-6">
          <div className="flex gap-2 mb-1">
            <span className="text-[22px]">✅</span>
            <div>
              <div className="font-bold text-[15px]">원활한 소통은 필수예요</div>
              <p className="text-[13px] mt-1.5 leading-[1.6]">
                캠페인 관련 중요 안내는 문자와 카톡으로 안내해 드리고 있으니
                반드시 확인해 주세요.
                <br />
                <span className="text-[12px] text-[#777]">
                  * 안내를 확인하지 않아 발생하는 문제에 대해선 책임지지
                  않습니다.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* 박스 2: 일정 + 가이드 */}
        <section className="mb-6">
          <div className="flex gap-2 mb-1">
            <span className="text-[22px]">✅</span>
            <div>
              <div className="font-bold text-[15px]">
                일정과 가이드를 준수해 주세요
              </div>
              <p className="text-[13px] mt-1.5 leading-[1.7]">
                1) 콘텐츠 가이드 미준수 시 재촬영·편집 요청될 수 있어요.
                <br />
                2) 약속된 기간 내 협업 채널 내 콘텐츠를 올려주신 후, 스튜디오
                쉘위에 등록해 주셔야 캐시 지급이 가능해요.
                <br />
                <span className="text-[#666]">
                  * 콘텐츠 등록 마감일 1~2일 경과 시 20% 차감,
                  <br />
                  3일 경과 시 50% 차감 (이후 실패 + 캠페인 신청 불가 패널티)
                </span>
                <br />
                3) 업로드된 콘텐츠는 안내된 유지기간까지 채널 내 유지해야 하며,
                위반 시 위약금 청구 및 패널티가 적용될 수 있어요.
              </p>
            </div>
          </div>
        </section>

        {/* 박스 3: 진행 중 취소 불가 */}
        <section className="mb-8">
          <div className="flex gap-2 mb-1">
            <span className="text-[22px]">✅</span>
            <div>
              <div className="font-bold text-[15px]">
                진행 중 취소는 불가해요
              </div>
              <p className="text-[13px] mt-1.5 leading-[1.7]">
                선정된 이후에는 취소가 불가하니, 신중하게 신청해 주세요.
                <br />
                진행 중 취소하실 경우, 이후 협업 참여에 제약이 있을 수 있어요.
                <br />
                <span className="text-[#666]">
                  * 협업 실패 시 제품 및 배송비 변상 필요
                  <br />* 캠페인 신청 불가 패널티 영구 적용
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* 체크 항목 */}
        <div className="mb-[30px]">
          <label
            className="
              flex items-center gap-2
              mb-2
              cursor-pointer
              text-[13px]
            "
          >
            <input type="checkbox" />
            개인정보 수집·제공 동의
            <span className="ml-auto text-[12px] underline">내용보기</span>
          </label>

          <label
            className="
              flex items-center gap-2
              cursor-pointer
              text-[13px]
            "
          >
            <input type="checkbox" />
            제공된 제품의 상거래 활동 금지 동의
            <span className="ml-auto text-[12px] underline">내용보기</span>
          </label>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div
        className="
          fixed left-0 bottom-0
          w-full
          py-[10px]
          bg-black/10
          backdrop-blur-sm
          box-border
          z-30
          flex justify-center
        "
      >
        {/* 모바일 컨테이너 (폭 제한) */}
        <div
          className="
            w-full max-w-[530px]
            px-5
            box-border
          "
        >
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="
              w-full
              py-[14px]
              rounded-[8px]
              border-0
              bg-[#AFFF33]
              text-[15px] font-bold
              text-black
              cursor-pointer
            "
          >
            모두 동의하고 신청하기
          </button>
        </div>
      </div>

      {/* ApplyCompleteModal 모달 */}
      <ApplyCompleteModal open={showModal} onConfirm={() => router.push("/")} />
    </main>
  );
}
