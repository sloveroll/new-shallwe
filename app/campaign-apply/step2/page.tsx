"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ApplyCompleteModal from "../../components/modal/ApplyCompleteModal";

export default function CampaignApplyConfirmPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        paddingBottom: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          padding: "16px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          ←
        </button>

        <h1
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          캠페인 신청
        </h1>

        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.4,
            marginBottom: 24,
          }}
        >
          협업 진행 중 아래 내용들은 꼭 지켜주세요.
        </h2>

        {/* ---------------------------
        박스 1: 원활한 소통
        ---------------------------- */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                원활한 소통은 필수예요
              </div>
              <p style={{ fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
                캠페인 관련 중요 안내는 문자와 카톡으로 안내해 드리고 있으니
                반드시 확인해 주세요.
                <br />
                <span style={{ color: "#777", fontSize: 12 }}>
                  * 안내를 확인하지 않아 발생하는 문제에 대해선 책임지지
                  않습니다.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------
        박스 2: 일정 + 가이드
        ---------------------------- */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                일정과 가이드를 준수해 주세요
              </div>
              <p style={{ fontSize: 13, marginTop: 6, lineHeight: 1.7 }}>
                1) 콘텐츠 가이드 미준수 시 재촬영·편집 요청될 수 있어요.
                <br />
                2) 약속된 기간 내 협업 채널 내 콘텐츠를 올려주신 후, 스튜디오
                쉘위에 등록해 주셔야 캐시 지급이 가능해요.
                <br />
                <span style={{ color: "#666" }}>
                  * 콘텐츠 등록 마감일 1~2일 경과 시 20% 차감,
                  <br />
                  3일 경과 시 50% 차감 (이후 실패 + 캠페인 신청 불가 패널티)
                </span>
                <br />
                3) 업로드된 콘텐츠는안내된 유지기간까지 채널 내 유지해야 하며,
                위반 시 위약금 청구 및 패널티가 적용될 수 있어요.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------
        박스 3: 진행 중 취소 불가
        ---------------------------- */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                진행 중 취소는 불가해요
              </div>
              <p style={{ fontSize: 13, marginTop: 6, lineHeight: 1.7 }}>
                선정된 이후에는 취소가 불가하니, 신중하게 신청해 주세요.
                <br />
                진행 중 취소하실 경우, 이후 협업 참여에 제약이 있을 수 있어요.
                <br />
                <span style={{ color: "#666" }}>
                  * 협업 실패 시 제품 및 배송비 변상 필요
                  <br />* 캠페인 신청 불가 패널티 영구 적용
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* 체크 항목 */}
        <div style={{ marginBottom: 30 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <input type="checkbox" />
            개인정보 수집·제공 동의
            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                textDecoration: "underline",
              }}
            >
              내용보기
            </span>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <input type="checkbox" />
            제공된 제품의 상거래 활동 금지 동의
            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                textDecoration: "underline",
              }}
            >
              내용보기
            </span>
          </label>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      {/* 하단 고정 버튼 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          padding: "10px 0",
          background: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
          boxSizing: "border-box",
          zIndex: 30,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* 모바일 컨테이너 (폭 제한) */}
        <div
          style={{
            width: "100%",
            maxWidth: 430, // 📌 모바일 폭
            padding: "0 20px", // 좌우 여백
            boxSizing: "border-box",
          }}
        >
          <button
            type="button"
            onClick={() => setShowModal(true)} // ← 여기서 다음페이지로 보내고 싶으면 router.push 로 변경
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              border: "none",
              background: "#AFFF33",
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              cursor: "pointer",
            }}
          >
            모두 동의하고 신청하기
          </button>
        </div>
      </div>

      {/* ApplyCompleteModal 모달 */}
      <ApplyCompleteModal
        open={showModal}
        onConfirm={() => router.push("/")}
      />
    </main>
  );
}
