// app/campaign-apply/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SKIN_TYPES = ["건성", "복합성", "지성", "민감성", "중성"] as const;

const SKIN_CONCERNS = [
  "트러블/흉터",
  "기미/잡티",
  "주름/탄력",
  "모공/피지",
  "미백",
  "속건조",
  "블랙헤드",
  "다크서클",
  "홍조",
];

export default function CampaignApplyPage() {
  const router = useRouter();
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [productColor, setProductColor] = useState<"21호" | "22호" | null>(
    null
  );
  const [skinType, setSkinType] = useState<(typeof SKIN_TYPES)[number] | null>(
    null
  );
  const [skinConcerns, setSkinConcerns] = useState<string[]>([]);

  const toggleConcern = (value: string) => {
    setSkinConcerns((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          minHeight: "100vh",
          padding: "12px 20px 50px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* 상단 헤더 */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 20,
              padding: 4,
            }}
          >
            ←
          </button>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            캠페인 신청
          </div>
          {/* 오른쪽 여백용 */}
          <div style={{ width: 24 }} />
        </header>

        {/* 본인 인증 영역 */}
        <section style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 6,
              marginTop: 30,
            }}
          >
            본인 인증을 진행해 주세요
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#666",
              marginBottom: 16,
            }}
          >
            협업 진행을 위해 최초 1회 본인 인증이 필요해요.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 14,
              fontSize: 15,
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                checked={agreePersonal}
                onChange={() => setAgreePersonal(true)}
              />
              <span>개인정보 수집·이용 동의</span>
            </label>

            <button
              type="button"
              style={{
                marginLeft: "auto",
                border: "none",
                background: "transparent",
                fontSize: 13,
                textDecoration: "underline",
                cursor: "pointer",
                color: "#555",
              }}
              onClick={() =>
                alert("약관 내용을 보여주는 모달을 연결해 주세요.")
              }
            >
              내용보기
            </button>
          </div>

          <button
            type="button"
            style={{
              width: "50%",
              padding: "13px 0",
              borderRadius: 8,
              border: "none",
              background: agreePersonal ? "#AFFF33" : "#e2e2e2",
              color: "#000",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            동의하고 인증하기
          </button>
        </section>

        {/* 캠페인 정보 확인 제목 */}
        <section style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            신청하시는 캠페인의 정보를
            <br />
            다시 한 번 확인해 주세요.
          </div>
        </section>

        {/* 캠페인 정보 카드 */}
        <section
          style={{
            borderRadius: 12,
            border: "1px solid #eee",
            padding: 14,
            marginBottom: 20,
            background: "#fafafa",
          }}
        >
          {/* 상단 라인 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
              gap: 8,
            }}
          >
            <div
              style={{
                borderRadius: 4,
                border: "1px solid #000",
                padding: "4px 8px",
                fontSize: 11,
              }}
            >
              쇼츠
            </div>
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 4,
              lineHeight: 1.5,
            }}
          >
            [메디힐, 비플레인] 요즘 잘 쓰는 아이템 추천템 특집 캠페인명 두줄 일
            때
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              margin: "10px 0 6px",
            }}
          >
            제품 협찬
          </div>

          <ul
            style={{
              fontSize: 12,
              lineHeight: 1.7,
              color: "#444",
              paddingLeft: 16,
              margin: 0,
            }}
          >
            <li>콘텐츠 등록 기간: 11/16(일) ~ 11/27(목)</li>
            <li>제품 발송·가이드 전달: 11/27(목)까지</li>
            <li>사전 검사 마감일: 11/27(목)까지</li>
            <li>캐시 지급일: 11/27(목)까지</li>
            <li>콘텐츠 유지 기간: 60일</li>
          </ul>
        </section>

        {/* 유의사항 */}
        <section style={{ marginBottom: 20 }}>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            유의사항
          </h3>

          <div
            style={{
              borderRadius: 12,
              border: "1px solid #e5e5e5",
              padding: 14,
              fontSize: 12,
            }}
          >
            {/* 상단 뱃지들 */}
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: 999,
                    background: "#e7fbdc",
                    fontSize: 11,
                    marginRight: 8,
                  }}
                >
                  ✅ 2차 활용
                </span>
                <span style={{ fontSize: 12, color: "#555" }}>
                  협업 영상이 상업적으로 활용될 수 있습니다.
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: 999,
                    background: "#e7fbdc",
                    fontSize: 11,
                    marginRight: 8,
                  }}
                >
                  ✅ 클린본 제출
                </span>
                <span style={{ fontSize: 12, color: "#555" }}>
                  BGM, 효과음 등을 제거한 영상 제출이 필요합니다.
                </span>
              </div>
            </div>

            <ul
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                paddingLeft: 16,
                margin: 0,
                color: "#444",
              }}
            >
              <li>유튜브 제품 태그 필수</li>
              <li>추가 제공품 노출 필수</li>
              <li>협업금에 2차 활용 비용 포함</li>
            </ul>
          </div>
        </section>

        {/* 노출 시간 */}
        <section style={{ marginBottom: 24 }}>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            노출 시간
          </h3>
          <div
            style={{
              borderRadius: 10,
              border: "1px solid #eee",
              fontSize: 12,
              padding: "10px 12px",
              color: "#555",
            }}
          >
            메디힐 30초, 비플레인 30초 (총 60초)
          </div>
        </section>

        {/* 참여 정보 입력 */}
        <section style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.4,
              marginBottom: 16,
            }}
          >
            캠페인 참여 시 필요한 정보를
            <br />
            입력해 주세요.
          </h2>

          {/* 컬러 선택 */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              협업 제품의 컬러를 선택해 주세요.
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 13,
                marginBottom: 6,
                gap: 6,
              }}
            >
              <input
                type="radio"
                name="productColor"
                checked={productColor === "21호"}
                onChange={() => setProductColor("21호")}
              />
              <span>21호</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 13,
                gap: 6,
              }}
            >
              <input
                type="radio"
                name="productColor"
                checked={productColor === "22호"}
                onChange={() => setProductColor("22호")}
              />
              <span>22호</span>
            </label>
          </div>

          {/* 설명 문구 + 텍스트 입력 */}
          <div style={{ marginBottom: 18 }}>
            <p
              style={{
                fontSize: 14,
                marginBottom: 6,
                marginTop: 30,
              }}
            >
              <b>
                협업 콘텐츠는 브랜드에 귀속되며 마케팅 활동에 활용됩니다.
                단답형으로 응답해 주세요.
              </b>
            </p>
            <textarea
              rows={3}
              style={{
                width: "100%",
                borderRadius: 10,
                border: "1px solid #ddd",
                padding: "10px 12px",
                fontSize: 13,
                resize: "none",
                boxSizing: "border-box",
              }}
              placeholder="예: 네, 동의합니다."
            />
          </div>
        </section>

        {/* 배송 정보 */}
        <section style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                margin: 0,
              }}
            >
              배송 정보
            </h3>
            <button
              type="button"
              style={{
                marginLeft: "auto",
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
              onClick={() =>
                alert("배송지 수정 페이지로 이동을 연결해 주세요.")
              }
            >
              수정하기
            </button>
          </div>

          {/* 🔥 두 번째 이미지처럼 회색 배경 + 인풋박스 2개 */}
          <div
            style={{
              background: "#f7f7f7",
              borderRadius: 14,
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* 주소 1 */}
            <input
              type="text"
              defaultValue="서울시 강남구 언주로 726 두산빌딩"
              style={{
                width: "100%",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: "#333",
                boxSizing: "border-box",
              }}
            />

            {/* 주소 2 */}
            <input
              type="text"
              defaultValue="3층 스튜디오 쉘위"
              style={{
                width: "100%",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: "#333",
                boxSizing: "border-box",
              }}
            />
          </div>
        </section>

        {/* 피부 타입 */}
        <section style={{ marginBottom: 20 }}>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            피부 타입
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 13,
            }}
          >
            {SKIN_TYPES.map((type) => (
              <label
                key={type}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="skinType"
                  checked={skinType === type}
                  onChange={() => setSkinType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 피부 고민 */}
        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: 6,
              gap: 2,
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                margin: 0,
              }}
            >
              피부 고민
            </h3>
            <span
              style={{
                fontSize: 11,
                color: "#888",
                marginBottom: 10,
              }}
            >
              복수 선택이 가능해요.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {SKIN_CONCERNS.map((c) => {
              const active = skinConcerns.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleConcern(c)}
                  style={{
                    borderRadius: 999,
                    padding: "6px 12px",
                    border: active ? "1px solid #111" : "1px solid #ddd",
                    background: active ? "#111" : "#fff",
                    color: active ? "#fff" : "#333",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* 하단 고정 버튼 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          padding: "10px 12px",
          background: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <button
          type="button"
          onClick={() => router.push("/campaign-apply/step2")}
          style={{
            width: "100%",
            maxWidth: 430,
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
          다음 페이지 &gt;
        </button>
      </div>
    </main>
  );
}
