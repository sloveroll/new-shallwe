"use client";

import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteAccountConfirmModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <h2 className="mb-2 text-[18px] font-extrabold leading-tight text-black">
        탈퇴를 진행할까요?
      </h2>
      <p className="mb-6 text-[14px] text-[#555]">
        탈퇴 시 보유 캐시를 포함한 모든
        <br></br>
        정보가 삭제되며, 복구가 불가능해요.
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-[#a5ff3f] py-3 text-[15px] font-bold text-black"
        >
          탈퇴하기
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
