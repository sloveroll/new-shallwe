"use client";

import React from "react";

export default function SurveyRegisterConfirmModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

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
          padding: "36px 28px 28px",
          textAlign: "center",
          boxSizing: "border-box",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* 제목 */}
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            margin: "0 0 10px",
          }}
        >
          설문을 등록할까요?
        </h3>

        {/* 설명 */}
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            margin: "0 0 20px",
            color: "#444",
          }}
        >
          등록 기간 내, 담당자 승인 전일 경우
          <br />
          변경이 가능해요.
        </p>

        {/* 버튼 그룹 */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 4,
          }}
        >
          {/* 등록하기 */}
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

          {/* 취소 */}
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 999,
              border: "none",
              background: "#D0D4C8",
              fontSize: 14,
              fontWeight: 600,
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
