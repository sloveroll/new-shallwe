"use client";

import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  platform: string; // e.g., "Youtube", "Instagram", "Blog"
  onClose: () => void;
  onConfirm: () => void;
};

export default function UnlinkConfirmModal({
  open,
  platform,
  onClose,
  onConfirm,
}: Props) {
  // 플랫폼 영문 -> 한글 매핑 헬퍼
  const getKoreanPlatformName = (engName: string) => {
    switch (engName) {
      case "Youtube":
        return "유튜브";
      case "Instagram":
        return "인스타그램";
      case "Blog":
        return "블로그";
      default:
        return engName;
    }
  };

  const platformKr = getKoreanPlatformName(platform);

  return (
    <BaseModal open={open} onClose={onClose}>
      <h2 className="mb-2 text-[18px] font-extrabold leading-tight text-black">
        {platformKr} 연동을 해제할까요?
      </h2>
      <p className="mb-6 text-[14px] text-[#555]">
        언제든지 다시 연동할 수 있어요.
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-[#a5ff3f] py-3 text-[15px] font-bold text-black"
        >
          해제하기
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl bg-[#f0f0f0] py-3 text-[15px] font-bold text-[#555]"
        >
          취소
        </button>
      </div>
    </BaseModal>
  );
}
