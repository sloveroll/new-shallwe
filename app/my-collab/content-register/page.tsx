"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RegisterConfirmModal from "../../components/modal/ContentRegisterConfirmModal";

export default function ContentRegisterPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <main
      style={{
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          padding: "16px 20px 0px",
          boxSizing: "border-box",
        }}
      >
        {/* 상단: 뒤로가기 + 타이틀 */}
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
          협업 콘텐츠 등록
        </h1>

        {/* 1. 경고 배너 */}
        <section
          style={{
            borderRadius: 999,
            border: "1px solid #ff3b30",
            padding: "10px 14px",
            fontSize: 12,
            color: "#000", // ⭐ 기본 텍스트는 검정
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          콘텐츠 등록 기간이{" "}
          <strong style={{ color: "#ff3b30" }}>2일 경과</strong>하여 캐시가{" "}
          <strong style={{ color: "#ff3b30" }}>80%만 지급</strong>될 예정이에요.
        </section>

        {/* 2. 캠페인 요약 박스 */}
        <section
          style={{
            borderRadius: 14,
            background: "#fafafa",
            padding: "12px 12px",
            marginBottom: 24,
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          {/* 상단 태그들 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 11,
                padding: "2px 6px",
                borderRadius: 4,
                border: "1px solid #000",
              }}
            >
              쇼츠
            </span>
          </div>

          <div
            style={{
              fontSize: 13,
              marginBottom: 4,
            }}
          >
            <strong>[메디힐, 비플레인]</strong> 요즘 잘 쓰는 아이템 추천템 특집
            캠페인명 두줄 일 때
          </div>

          <div
            style={{
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            <strong>제품 협찬</strong>
          </div>

          <ul
            style={{
              fontSize: 12,
              margin: 0,
              paddingLeft: 16,
              lineHeight: 1.7,
            }}
          >
            <li>
              <strong>콘텐츠 등록 기간: 11/16(일) ~ 11/27(목)</strong>
            </li>
            <li>
              <strong>
                사전 검수 마감일: 11/27(목)까지{" "}
                <a href="#" style={{ color: "#0070c9" }}>
                  (→ 사전 검수)
                </a>
              </strong>
            </li>
            <li>캐시 지급일: 11/27(목)까지</li>
            <li>콘텐츠 유지 기간: 60일</li>
          </ul>
        </section>

        {/* 3. 섹션 타이틀 */}
        <section style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            <strong style={{ color: "red" }}>①</strong> 콘텐츠 등록 전 한번 더
            확인해 주세요.
          </h2>

          {/* 유의사항 제목 */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            유의사항
          </div>
          {/* 유의사항 박스 */}
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #e5e5e5",
              padding: 14,
              marginBottom: 14,
              background: "white",
              fontSize: 12,
            }}
          >
            {/* 1줄: 2차 활용 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                gap: 10,
              }}
            >
              <span
                style={{
                  background: "#e7fbdc",
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                ✅ 2차 활용
              </span>
              <span style={{ lineHeight: 1.6 }}>
                협업 영상이 상업적으로 활용될 수 있습니다.
              </span>
            </div>

            {/* 2줄: 사전 검수 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
                gap: 10,
              }}
            >
              <span
                style={{
                  background: "#e7fbdc",
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                ✅ 사전 검수
              </span>
              <span style={{ lineHeight: 1.6 }}>
                콘텐츠 초안을 미리 제출하여 검수받아야 해요.
              </span>
            </div>

            {/* 아래 bullet 목록 */}
            <ul
              style={{
                margin: 0,
                paddingLeft: 16,
                lineHeight: 1.7,
              }}
            >
              <li>유튜브 제품 태그 필수</li>
              <li>추가 제공품 노출 필수</li>
              <li>협업금에 2차 활용 비용 포함</li>
            </ul>
          </div>

          {/* 노출 시간 */}
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              노출 시간
            </div>
            <div
              style={{
                borderRadius: 8,
                border: "1px solid #eee",
                padding: "10px 12px",
                fontSize: 13,
              }}
            >
              30초
            </div>
          </div>

          {/* 더보기란 내용 */}
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                더보기란 내용
              </div>
              <button
                type="button"
                onClick={() => {
                  const text = `메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공 받았습니다.

메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair Special Set
#선크림 #선세럼 #선크림추천
https://bepla.in/HTtM`;
                  navigator.clipboard?.writeText(text);
                  alert("복사되었습니다.");
                }}
                style={{
                  marginLeft: "auto",
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid #d4ff8f",
                  background: "#AFFF33",
                  cursor: "pointer",
                }}
              >
                복사
              </button>
            </div>

            <div
              style={{
                borderRadius: 8,
                border: "1px solid #eee",
                padding: "10px 12px",
                fontSize: 12,
                lineHeight: 1.7,
                whiteSpace: "pre-line",
              }}
            >
              메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공
              받았습니다.
              {"\n"}
              {"\n"}
              메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
              {"\n"}
              MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair Special
              Set
              {"\n"}
              #선크림 #선세럼 #선크림추천
              {"\n"}
              https://bepla.in/HTtM
            </div>
          </div>

          {/* 제목 키워드 */}
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                제목 키워드
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText("메디힐");
                  alert("복사되었습니다.");
                }}
                style={{
                  marginLeft: "auto",
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid #d4ff8f",
                  background: "#AFFF33",
                  cursor: "pointer",
                }}
              >
                복사
              </button>
            </div>

            <div
              style={{
                borderRadius: 8,
                border: "1px solid #eee",
                padding: "10px 12px",
                fontSize: 12,
              }}
            >
              메디힐
            </div>
          </div>

          {/* 유료 프로모션 체크 */}
          <div style={{ marginBottom: 4 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              유료 프로모션 체크
            </div>
            <div
              style={{
                borderRadius: 8,
                border: "1px solid #eee",
                padding: "10px 12px",
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              Youtube 영상 옵션 &gt; 세부정보 &gt; &apos;유료 프로모션 라벨
              추가&apos; 설정해 주세요.
            </div>
          </div>
        </section>

        {/* 4. 최종 콘텐츠 URL 등록 */}
        <section style={{ marginBottom: 18 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            <strong style={{ color: "red" }}>②</strong> 최종 업로드된 콘텐츠를
            등록해 주세요.
          </h2>

          <div style={{ marginBottom: 6 }}>
            <input
              placeholder="협업 채널에 최종 업로드된 콘텐츠의 URL을 붙여 넣어주세요"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #eee",
                padding: "10px 12px",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#ff3b30",
              marginBottom: 20,
            }}
          >
            연동된 채널의 콘텐츠만 등록 가능해요.
          </div>

          {/* 체크박스 */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            <input
              type="checkbox"
              style={{
                verticalAlign: "middle",
              }}
            />
            <span>
              <strong>콘텐츠 내 가이드 내용을 전부 반영하였습니다. </strong>
              <a href="#" style={{ color: "#0070c9" }}>
                (→ 가이드 확인)
              </a>
            </span>
          </label>

          <div
            style={{
              fontSize: 11,
              color: "#ff3b30",
              marginLeft: 25,
              marginTop: 4,
            }}
          >
            ※ 미준수된 항목이 있을 경우, 수정·재업로드 요청 및 실패 처리될 수
            있어요.
          </div>
        </section>
      </div>

      {/* 하단 등록하기 버튼 */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        style={{
          width: "100%",
          marginTop: 20,
          padding: "12px 0",
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

      {/* RegisterConfirmModal모달 */}
      <RegisterConfirmModal
        open={showModal}
        onConfirm={() => {
          // TODO: 실제 등록 API 호출 후 성공 시 이동
          router.push("/");
        }}
        onCancel={() => setShowModal(false)}
      />
    </main>
  );
}
