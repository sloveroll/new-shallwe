"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ApplyCompleteModal from "../../components/modal/ApplyCompleteModal";
import SubPageHeader from "../../components/common/SubPageHeader";

export default function CampaignApplyConfirmPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [agreements, setAgreements] = useState({
    privacy: false,
    commerce: false,
  });

  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApply = () => {
    if (!agreements.privacy || !agreements.commerce) {
      alert("필수 항목에 모두 동의해 주세요.");
      return;
    }
    setShowModal(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-[530px] mx-auto min-h-screen box-border relative">
        <SubPageHeader title="캠페인 신청" />

        <div className="px-5 pt-4 pb-[50px]">

        <h2 className="text-[20px] font-bold leading-[1.4] mb-6 mt-5">
          협업 진행 중<br />
          아래 내용들은 꼭 지켜주세요.
        </h2>

        {/* 박스 1: 원활한 소통 */}
        <section className="mb-6">
          <div className="flex gap-2 mb-1 items-start">
            <Image
              src="/images/common/ic-winklogo.png"
              alt="icon"
              width={20}
              height={20}
              className="mt-[2px]"
            />
            <div>
              <div className="font-bold text-[15px]">원활한 소통은 필수예요</div>
              <p className="text-[13px] mt-1.5 leading-[1.6]">
                캠페인 관련 중요 안내는 문자와 카톡으로 안내해 드리고 있으니
                반드시 확인해 주세요.
                <br />
                <span className="text-[12px] text-[#ff0000] font-bold">
                  *안내를 확인하지 않아 발생하는 문제에 대해서는 책임지지 않습니다.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* 박스 2: 일정 + 가이드 */}
        <section className="mb-6">
          <div className="flex gap-2 mb-1 items-start">
            <Image
              src="/images/common/ic-lookinglogo.png"
              alt="icon"
              width={20}
              height={20}
              className="mt-[2px]"
            />
            <div>
              <div className="font-bold text-[15px]">
                일정과 가이드를 준수해 주세요
              </div>
              <div className="text-[13px] mt-1.5 leading-[1.7]">
                <p className="m-0 mb-1">1) 콘텐츠 가이드 미준수 시 재촬영·편집 요청 될 수 있어요.</p>
                <p className="m-0 mb-1">2) 약속된 기간 내 협업 채널 내 콘텐츠를 올려주신 후, 스튜디오 쉘위에 등록해 주셔야 캐시 지급이 가능합니다.</p>
                <p className="m-0 mb-1 text-[#ff0000] font-bold">
                  *콘텐츠 등록 마감일 1-2일 경과 시 20% 차감, 3일 경과 시 50% 차감 (이후 실패+캠페인 신청 불가 패널티)
                </p>
                <p className="m-0">
                  3) 업로드된 콘텐츠는 안내된 유지기간까지 채널 내 유지되어야 하며, 위반 시 위약금 청구 및 패널티가 적용될 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 박스 3: 진행 중 취소 불가 */}
        <section className="mb-8">
          <div className="flex gap-2 mb-1 items-start">
            <Image
              src="/images/common/ic-lookinglogo-2.png"
              alt="icon"
              width={20}
              height={20}
              className="mt-[2px]"
            />
            <div>
              <div className="font-bold text-[15px]">
                진행 중 취소는 불가해요
              </div>
              <p className="text-[13px] mt-1.5 leading-[1.7]">
                선정된 이후에는 취소가 불가하니, 신중하게 신청해주세요.
                <br />
                진행 중 취소하실 경우, 이후 협업 참여에 제약이 있을 수 있어요.
                <br />
                <span className="text-[#ff0000] font-bold">
                  *협업 실패 시 제품 및 배송비 변상 필요
                  <br />*캠페인 신청 불가 패널티 영구 적용
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* 체크 항목 */}
        <div className="mb-[30px]">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => toggleAgreement('privacy')}
              className="appearance-none min-w-[14px] min-h-[14px] w-[14px] h-[14px] rounded-full border border-[#ddd] bg-white checked:bg-[#AFFF33] checked:border-[3.5px] checked:border-white checked:ring-1 checked:ring-[#ddd] cursor-pointer"
            />
             <div className="flex-1 flex items-center justify-between">
                <span className="text-[14px]">개인정보 수집·제공 동의</span>
                <span className="text-[12px] text-[#999] underline">내용보기</span>
             </div>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
             <input
              type="checkbox"
              checked={agreements.commerce}
              onChange={() => toggleAgreement('commerce')}
              className="appearance-none min-w-[14px] min-h-[14px] w-[14px] h-[14px] rounded-full border border-[#ddd] bg-white checked:bg-[#AFFF33] checked:border-[3.5px] checked:border-white checked:ring-1 checked:ring-[#ddd] cursor-pointer"
            />
             <div className="flex-1 flex items-center justify-between">
                <span className="text-[14px]">제공된 제품의 상거래 활동 금지 동의</span>
                <span className="text-[12px] text-[#999] underline">내용보기</span>
             </div>
          </label>
        </div>
      </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div
        className="
          fixed left-1/2 bottom-0 w-full max-w-[530px] -translate-x-1/2
          z-20
        "
      >
        <button
          type="button"
          onClick={handleApply}
          className="
            w-full
            py-4
            border-0
            bg-[#AFFF33]
            text-black
            text-[15px] font-semibold
            cursor-pointer
          "
        >
          모두 동의하고 신청하기
        </button>
      </div>

      {/* ApplyCompleteModal 모달 */}
      <ApplyCompleteModal open={showModal} onConfirm={() => router.push("/")} />
    </main>
  );
}
