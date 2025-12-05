"use client";

import React from "react";

type Props = {
  open: boolean;
  onConfirm: () => void; // 확인 버튼 클릭
};

export default function ApplyCompleteModal({ open, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        boxSizing: "border-box",
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "24px 20px",
          width: "100%",
          maxWidth: 360,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontSize: 15, marginBottom: 12 }}>신청이 완료되었어요.</div>

        <div style={{ fontSize: 14, marginBottom: 24 }}>
          선정 결과는 <strong>선정자에 한해</strong>
          <br />
          <strong>11/10(월)까지</strong> 안내해 드려요.
        </div>

        <button
          onClick={onConfirm}
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 8,
            border: "none",
            background: "#AFFF33",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
