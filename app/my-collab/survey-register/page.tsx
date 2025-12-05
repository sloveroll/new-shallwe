"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SurveyRegisterConfirmModal from "../../components/modal/SurveyRegisterConfirmModal";

export default function SurveyRegisterPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <main
      style={{
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          padding: "16px 20px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* 상단 뒤로가기 */}
        <button
          onClick={() => router.back()}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 22,
            marginBottom: 6,
          }}
        >
          ←
        </button>

        <h1
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          설문 등록
        </h1>

        {/* 1) 경고 배너 */}
        <section
          style={{
            borderRadius: 999,
            border: "1px solid #ff3b30",
            padding: "10px 14px",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          설문 등록 기간이{" "}
          <strong style={{ color: "#ff3b30" }}>2일 경과</strong>하여 캐시가{" "}
          <strong style={{ color: "#ff3b30" }}>80%만 지급</strong>될 예정이에요.
        </section>

        {/* 2) 캠페인 요약 */}
        <section
          style={{
            borderRadius: 14,
            background: "#fafafa",
            padding: "12px 12px",
            marginBottom: 28,
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              padding: "2px 6px",
              borderRadius: 4,
              border: "1px solid #000",
              display: "inline-block",
              marginBottom: 10,
            }}
          >
            쇼츠
          </span>

          <div style={{ fontSize: 13, marginBottom: 6 }}>
            <strong>[메디힐, 비플레인]</strong> 요즘 잘 쓰는 아이템 추천템 특집
            캠페인명 두줄 일 때
          </div>

          <ul
            style={{
              paddingLeft: 16,
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            <li>
              <strong>콘텐츠 등록 기간: 11/16(일) ~ 11/27(목)</strong>
            </li>
            <li>※ 콘텐츠 등록 기간 내 콘텐츠와 설문이 모두 등록되어야 해요.</li>
          </ul>
        </section>

        {/* -------------------------------------------------- */}
        {/* 3) 설문 문항들 */}
        {/* -------------------------------------------------- */}

        {/* Q1 */}
        <section style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
            사용 후 외부 자극으로 손상된 피부장벽이 개선된 느낌을 받으셨나요?
          </div>

          <label style={labelStyle}>
            <input type="radio" name="q1" />
            <span>네</span>
          </label>

          <label style={labelStyle}>
            <input type="radio" name="q1" />
            <span>아니요</span>
          </label>
        </section>

        {/* Q2 */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            추천한다면 누구에게 추천하고 싶은가요?
          </div>
          <input type="text" style={inputStyle} />
        </section>

        {/* Q3 체크박스 */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              제품에 기대한 효과는?
            </div>
            <span style={tag}>복수 응답</span>
          </div>

          {["수분감 개선", "슬로우에이징", "피부결 개선", "브라이트닝", "피부 장벽 강화"].map(
            (label) => (
              <label key={label} style={labelStyle}>
                <input type="checkbox" />
                <span>{label}</span>
              </label>
            )
          )}
        </section>

        {/* Q4 */}
        <section style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
            제품을 재구매할 의사가 있나요?
          </div>

          <label style={labelStyle}>
            <input type="radio" name="q4" />
            <span>네</span>
          </label>

          <label style={labelStyle}>
            <input type="radio" name="q4" />
            <span>아니요</span>
          </label>
        </section>

        {/* Q5 */}
        <section>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
            제품을 지인에게 추천할 의사가 있나요?
          </div>

          <label style={labelStyle}>
            <input type="radio" name="q5" />
            <span>네</span>
          </label>

          <label style={labelStyle}>
            <input type="radio" name="q5" />
            <span>아니요</span>
          </label>
        </section>

        {/* ------------------------------ */}
        {/* 하단 등록하기 버튼 */}
        {/* ------------------------------ */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{
            width: "100%",
            marginTop: 30,
            padding: "14px 0",
            borderRadius: 8,
            border: "none",
            background: "#AFFF33",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          등록하기
        </button>
      </div>

      {/* 등록 모달 */}
      <SurveyRegisterConfirmModal
        open={showModal}
        onConfirm={() => router.push("/")}
        onCancel={() => setShowModal(false)}
      />
    </main>
  );
}

/* ----------------------- 공통 스타일 ----------------------- */
const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid #eee",
  padding: "10px 12px",
  fontSize: 13,
  boxSizing: "border-box",
};

const tag = {
  fontSize: 11,
  padding: "2px 6px",
  borderRadius: 999,
  border: "1px solid #ccc",
};
