"use client";

import React from "react";

type Props = {
  open: boolean;
  onConfirm: () => void; // 등록하기 클릭
  onCancel: () => void;  // 취소 클릭
};

export default function RegisterConfirmModal({ open, onConfirm, onCancel }: Props) {
  if (!open) return null; // 열려있지 않으면 렌더 안 함

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          borderRadius: 16,
          padding: "40px 30px 30px",
          boxSizing: "border-box",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            margin: "0 0 8px",
          }}
        >
          협업 콘텐츠를 등록할까요?
        </h3>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            margin: "0 0 16px",
          }}
        >
          담당자 승인 전일 경우,
          <br />
          등록 기간 내 얼마든지 수정이 가능해요.
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 4,
          }}
        >
          <button
            type="button"
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 999,
              border: "none",
              background: "#AFFF33",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            등록하기
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fff",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
