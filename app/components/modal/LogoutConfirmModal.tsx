"use client";

import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutConfirmModal({ open, onClose, onConfirm }: Props) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <h2 className="mb-8 text-[18px] font-extrabold leading-tight text-black mt-2">
        로그아웃 할까요?
      </h2>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-[#a5ff3f] py-3 text-[15px] font-bold text-black"
        >
          로그아웃
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
