"use client";

import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function YoutubeReferenceRegisterModal({
  open,
  onClose,
}: Props) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <h2 className="mb-4 text-[20px] font-bold leading-tight text-center text-black">
        저장 완료
      </h2>
      <p className="mb-6 text-[15px] text-[#555] text-center leading-relaxed">
        현재 <span className="font-bold text-black">롱폼, 쇼츠 캠페인</span>에
        <br />
        모두 참여할 수 있어요.
      </p>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onClose}
          className="w-[160px] rounded-xl bg-[#AFFF33] py-3.5 text-[16px] font-bold text-black"
        >
          확인
        </button>
      </div>
    </BaseModal>
  );
}
