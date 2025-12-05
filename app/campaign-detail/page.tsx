// app/campaign-detail/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Tab = "info" | "guide";

export default function CampaignDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const COLLAPSED_HEIGHT = 300;
  const [bannerHeight, setBannerHeight] = useState(COLLAPSED_HEIGHT);
  const bannerRef = React.useRef<HTMLDivElement | null>(null);
  const [isRefOpen, setIsRefOpen] = useState(false);

  React.useEffect(() => {
    if (!bannerRef.current) return;

    if (isBannerOpen) {
      // 전체 높이
      const fullHeight = bannerRef.current.scrollHeight;
      setBannerHeight(fullHeight);
    } else {
      // 접힌 높이
      setBannerHeight(COLLAPSED_HEIGHT);
    }
  }, [isBannerOpen]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        paddingBottom: "90px", // 하단 버튼 영역만큼 여유
      }}
    >
      {/* 안쪽 모바일 캔버스 */}
      <div
        style={{
          width: "100%",
          maxWidth: "430px", // 모바일 폭
          margin: "0 auto", // 가운데 정렬
          background: "#fff",
          minHeight: "100vh",
          paddingBottom: "30px", // 하단 버튼 높이만큼 여유
          boxSizing: "border-box",
        }}
      >
        {/* 상단: 뒤로가기 + 대표 이미지 */}
        <section style={{ position: "relative", background: "#f5f5f5" }}>
          {/* 뒤로가기 */}
          <button
            onClick={() => router.back()}
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 10,
              border: "none",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              width: 32,
              height: 32,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ←
          </button>

          {/* 상품 이미지 영역 */}
          <div
            style={{
              width: "100%",
              height: 360,
              position: "relative",
            }}
          >
            <Image
              src="/images/sample.png"
              alt="캠페인 상품 이미지"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>

        {/* 캠페인 기본 정보 */}
        <section style={{ padding: "16px 20px" }}>
          {/* 태그/지원자수/D-day */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 4,
                background: "#000",
                color: "#fff",
              }}
            >
              쇼츠
            </span>

            <span style={{ fontSize: 12, color: "#333" }}>1,230/20</span>

            <span
              style={{
                marginLeft: "auto",
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 4,
                background: "#ff6675",
                color: "#fff",
              }}
            >
              D-12
            </span>
          </div>

          {/* 상품명/제품 */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            메디힐
          </div>

          <div
            style={{
              fontSize: 15,
              lineHeight: 1.5,
              marginBottom: 12,
            }}
          >
            마데카소사이드 수분 선세럼 촉촉 리페어 50g
          </div>

          {/* 지급 캐시, 기간 등 리스트 */}
          <div
            style={{
              fontSize: 13,
              color: "#333",
              marginBottom: 8,
            }}
          >
            지급 캐시: <strong>100,000</strong>
          </div>

          <ul
            style={{
              fontSize: 12,
              lineHeight: 1.7,
              color: "#555",
              paddingLeft: 16,
              margin: 0,
            }}
          >
            <li>콘텐츠 등록 기간: 11/6(금) ~ 11/27(목)</li>
            <li>제품 발송·가이드 전달: 11/27(목)까지</li>
            <li>사전 검사 마감일: 11/27(목)까지</li>
            <li>캐시 지급일: 11/27(목)까지</li>
            <li>콘텐츠 유지 기간: 60일</li>
          </ul>
        </section>

        {/* 탭 영역 */}
        <section style={{ padding: "0 20px" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #eee",
              marginBottom: 16,
            }}
          >
            <button
              onClick={() => setActiveTab("info")}
              style={{
                flex: 1,
                padding: "12px 0",
                border: "none",
                background: "transparent",
                fontSize: 14,
                fontWeight: activeTab === "info" ? 700 : 500,
                borderTop:
                  activeTab === "info"
                    ? "2px solid #AFFF33"
                    : "2px solid transparent",
                borderBottom: "none",
                borderRight: "1px solid #eee",
                color: activeTab === "info" ? "#111" : "#888",
                cursor: "pointer",
              }}
            >
              캠페인 정보
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              style={{
                flex: 1,
                padding: "12px 0",
                border: "none",
                background: "transparent",
                fontSize: 14,
                fontWeight: activeTab === "guide" ? 700 : 500,
                borderTop:
                  activeTab === "guide"
                    ? "2px solid #AFFF33"
                    : "2px solid transparent",
                borderBottom: "none",
                color: activeTab === "guide" ? "#111" : "#888",
                cursor: "pointer",
              }}
            >
              콘텐츠 가이드
            </button>
          </div>

          {/* 탭 내용 */}
          {activeTab === "info" ? (
            <>
              {/* 희망 크리에이터 */}
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  희망 크리에이터
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 8,
                  }}
                >
                  브랜드는 이런 크리에이터님을 선호해요!
                </p>

                <ul
                  style={{
                    fontSize: 12,
                    lineHeight: 1.8,
                    margin: 0,
                    paddingLeft: 16,
                    color: "#444",
                  }}
                >
                  <li>피부 타입: 복합성, 민감성</li>
                  <li>피부 고민: 여드름, 홍조, 기미</li>
                  <li>타겟 연령대: 18–24, 여성</li>
                </ul>
              </div>

              {/* 유의사항 */}
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  유의사항
                </div>
                <ul
                  style={{
                    fontSize: 12,
                    lineHeight: 1.7,
                    margin: 0,
                    paddingLeft: 16,
                    color: "#444",
                  }}
                >
                  <li>2차 활용 : 협업 영상이 상업적으로 활용될 수 있어요.</li>
                  <li>
                    음원 관련 안내 : BGM, 효과음 등은 저작권 허용 범위를
                    확인해주세요.
                  </li>
                  <li>유튜브 제품 링크 필수 포함</li>
                  <li>협업 영상 2차 활용 비용 포함</li>
                </ul>
              </div>

              {/* 협업 제품 / 단순 선물 카드 2개 (간단 버전) */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    border: "1px solid #eee",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#ff6675",
                      marginBottom: 6,
                    }}
                  >
                    협업 제품
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 120,
                      position: "relative",
                      marginBottom: 8,
                    }}
                  >
                    <Image
                      src="/images/sample.png"
                      alt="협업 제품"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>59,000원</div>
                </div>

                <div
                  style={{
                    flex: 1,
                    border: "1px solid #eee",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#666",
                      marginBottom: 6,
                    }}
                  >
                    단순 선물
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 120,
                      position: "relative",
                      marginBottom: 8,
                    }}
                  >
                    <Image
                      src="/images/sample.png"
                      alt="단순 선물"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>59,000원</div>
                </div>
              </div>
            </>
          ) : (
            // 콘텐츠 가이드 탭 내용
            <>
              {/* 상단 안내 문구 + 인쇄 버튼 (박스 바깥) */}
              <div
                style={{
                  position: "relative",
                  marginBottom: 15,
                  padding: "0 2px",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#ff3b30",
                    textAlign: "center",
                    width: "100%",
                    display: "block",
                  }}
                >
                  ※ 참고자료 외 모든 항목이 콘텐츠 내 전부 반영되어야 합니다.
                </span>

                {/* 인쇄 버튼 — 오른쪽 고정 */}
                <button
                  onClick={() => window.print()}
                  style={{
                    position: "absolute",
                    right: 2, // 오른쪽 끝
                    top: "50%",
                    transform: "translateY(-50%)", // 세로 중앙 맞춤
                    fontSize: 11,
                    padding: "2px 10px",
                    borderRadius: 999,
                    border: "1px solid #e0e0e0",
                    background: "white",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  인쇄
                </button>
              </div>

              {/* 유의사항 박스 (안에는 유의사항만) */}
              <div
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 16,
                  background: "white",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  fontSize: 12,
                  color: "#444",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  유의사항
                </div>

                {/* ✅ 세로 배치: 2차 활용 / 클린본 제출 */}
                <div style={{ marginBottom: 10 }}>
                  {/* 2차 활용 */}
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
                    <span style={{ fontSize: 12 }}>
                      협업 영상이 상업적으로 활용될 수 있습니다.
                    </span>
                  </div>

                  {/* 클린본 제출 */}
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
                    <span style={{ fontSize: 12 }}>
                      BGM, 효과음 등을 제거한 영상 제출이 필요합니다.
                    </span>
                  </div>
                </div>

                {/* 아래 bullet 리스트 */}
                <ul
                  style={{
                    fontSize: 12,
                    lineHeight: 1.7,
                    paddingLeft: 16,
                    margin: 0,
                  }}
                >
                  <li>유튜브 제품 태그 필수</li>
                  <li>추가 제공품 노출 필수</li>
                  <li>협업금에 2차 활용 비용 포함</li>
                </ul>
              </div>

              {/* 아래 텍스트 영역 (박스 밖) */}
              <div
                style={{
                  fontSize: 12,
                  lineHeight: 1.8,
                  color: "#444",
                  marginBottom: 24,
                }}
              >
                {/* [광고 표기] 영역 */}
                <div
                  style={{
                    paddingTop: 4,
                    paddingBottom: 10,
                  }}
                >
                  <div style={{ paddingTop: 4, paddingBottom: 10 }}>
                    {/* 제목 + 복사 버튼 한 줄 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>[광고 표기]</div>

                      {/* 복사 버튼 */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `영상 시작·중간·끝 광고 문구 반복 표기\n"메디힐의 유료광고를 포함하고 있습니다."`
                          );
                          alert("복사되었습니다!");
                        }}
                        style={{
                          marginLeft: "auto",
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "1px solid #d4ff8f",
                          background: "#AFFF33",
                          cursor: "pointer",
                          color: "#000",
                        }}
                      >
                        복사
                      </button>
                    </div>

                    {/* 내용 */}
                    <p style={{ margin: 0 }}>
                      영상 시작·중간·끝 광고 문구 반복 표기
                      <br />
                      메디힐의 유료광고를 포함하고 있습니다.
                    </p>
                  </div>
                </div>

                {/* [촬영/편집 가이드] 영역 (구분선으로 나뉘어 있음) */}
                <div
                  style={{
                    paddingTop: 10,
                    borderTop: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    [촬영/편집 가이드]
                  </div>

                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 16,
                    }}
                  >
                    <li>(롱폼) 영상 총 구간의 50% 이내 제품 소개 시작</li>
                    <li>(숏츠) 영상 시작 30초 이내 제품 소개 시작</li>
                    <li>
                      (숏츠) 영상 내 탑송, K-POP 등 상업적 사용 불가한 BGM 삽입
                      금지
                    </li>
                    <li>
                      본인 등장 및 직접 촬영/제작 필수 (타인의 리뷰 영상 짜깁기,
                      AI 활용 금지)
                    </li>
                    <li>협업 제품과 동일 카테고리 제품 노출 및 비교 불가</li>
                    <li>
                      협업 제품 노출 구간에 제품과 무관한 개인적 이야기 언급
                      불가
                    </li>
                    <li>가이드 내 전달되지 않은 별도 수익화 링크/태그 불가</li>
                  </ul>
                </div>

                {/* [노출시간] 영역 */}
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 10,
                    borderTop: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    [노출시간]
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    30초
                  </div>
                </div>

                {/* 메디힐 블록 */}
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 10,
                    borderTop: "1px solid #eee",
                  }}
                >
                  {/* 메디힐 타이틀 */}
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0070c9",
                      marginBottom: 8,
                    }}
                  >
                    메디힐
                  </div>

                  {/* [협업 제품] + 복사 버튼 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>[협업 제품]</div>

                    <button
                      onClick={() => {
                        const text = `메디힐 MEDIHEAL
마데카소사이드 수분 선세럼 촉촉 리페어 50g
59,000원`;
                        navigator.clipboard?.writeText(text);
                      }}
                      style={{
                        marginLeft: "auto",
                        fontSize: 11,
                        padding: "4px 10px",
                        borderRadius: 999,
                        border: "1px solid #d4ff8f",
                        background: "#AFFF33",
                        cursor: "pointer",
                        color: "#000",
                      }}
                    >
                      복사
                    </button>
                  </div>

                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: 12,
                      lineHeight: 1.7,
                    }}
                  >
                    메디힐 MEDIHEAL
                    <br />
                    마데카소사이드 수분 선세럼 촉촉 리페어 50g
                    <br />
                    59,000원
                  </p>

                  {/* [언급 사항] */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 4,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <div style={{ fontWeight: 700, marginTop: 10 }}>
                      [언급 사항]
                    </div>
                  </div>

                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: 12,
                      lineHeight: 1.7,
                    }}
                  >
                    물처럼 가볍고 산뜻촉촉한 가벼운 클렌징오일!
                    <br />
                    333 세안법으로 자극, 눈사람 없이 순하게 눈에 보이는 피지,
                    블랙헤드 딥클렌징 가능!
                  </p>

                  {/* [연출 사항] */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 4,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <div style={{ fontWeight: 700, marginTop: 10 }}>
                      [연출 사항]
                    </div>
                  </div>

                  <ol
                    style={{
                      margin: "0 0 8px",
                      paddingLeft: 18,
                      fontSize: 12,
                      lineHeight: 1.7,
                    }}
                  >
                    <li>하이라이터 사용 후 자연스러운 광채 연출</li>
                    <li>하이라이터 B&amp;A컷</li>
                    <li>얼굴에 하이라이터 바르는 장면 연출</li>
                  </ol>

                  {/* [금지 사항] */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 4,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <div style={{ fontWeight: 700, marginTop: 10 }}>
                      [금지 사항]
                    </div>
                  </div>

                  <ol
                    style={{
                      margin: 0,
                      paddingLeft: 18,
                      fontSize: 12,
                      lineHeight: 1.7,
                    }}
                  >
                    <li>&apos;가장/제품&apos; 등 최상급 의미를 가진 표현 불가</li>
                    <li>여드름 피부 전용 (x), 여드름 피부가 사용 가능한 (o)</li>
                  </ol>

                  {/* 참고 자료 (접힘/펼침) */}
                  <div
                    style={{
                      marginTop: 20,
                      paddingTop: 10,
                      borderTop: "3px solid #eee",
                    }}
                  >
                    {/* 제목 + 펼침 버튼 */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsRefOpen((prev) => !prev)}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        참고 자료
                      </div>

                      <div
                        style={{
                          fontSize: 20,
                          paddingRight: 4,
                          transform: isRefOpen ? "rotate(180deg)" : "none",
                          transition: "0.2s ease",
                        }}
                      >
                        ▾
                      </div>
                    </div>

                    {/* 펼쳐졌을 때 내용 보이기 */}
                    {isRefOpen && (
                      <div
                        style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6 }}
                      >
                        {/* 단순 선물 */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontWeight: 700, marginBottom: 4 }}>
                            [단순 선물]
                          </div>
                          <div>메디힐 MEDIHEAL</div>
                          <div>마데카소사이드 수분 선세럼 촉촉 리페어 50g</div>
                          <div>59,000원</div>
                        </div>

                        {/* 참고사항 */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontWeight: 700, marginBottom: 4 }}>
                            [참고사항]
                          </div>

                          <ol style={{ margin: 0, paddingLeft: 18 }}>
                            <li>제품 특징점 소개</li>
                            <li>
                              음영 하이라이터 : 코덕 & 인플루언서 사이에서 인기
                              하이라이터
                            </li>
                            <li>
                              텍스처 : 가루날림이 적고, 들뜸· 텁텁함 없이 밀착된
                              베이크드 텍스처
                            </li>
                            <li>
                              요철 부각 없는 하이라이터 : 미세 파우더가 모공과
                              요철 사이를 커버하여 매끈한 결광 표현
                            </li>
                            <li>
                              멀티 유즈 : 치크로도 활용 가능 (베이비 베리 빔
                              컬러)
                            </li>
                            <li>
                              얼굴형 커버 : 볼륨 라인 보정 가능, 입체적인
                              이목구비 연출
                            </li>
                            <li>
                              아이돌 하이라이터 : 데일리 사용부터 아이돌처럼
                              화려한 맥시 볼륨광 연출 가능
                            </li>
                          </ol>
                        </div>

                        {/* 레퍼런스 영상 */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontWeight: 700, marginBottom: 4 }}>
                            [레퍼런스 영상]
                          </div>

                          <div style={{ wordBreak: "break-all" }}>
                            <a
                              href="https://www.youtube.com/shorts/u2SvQgPmbw0"
                              target="_blank"
                            >
                              https://www.youtube.com/shorts/u2SvQgPmbw0
                            </a>
                            <br />
                            <a
                              href="https://www.instagram.com/reel/DPlDaTPepnI/"
                              target="_blank"
                            >
                              https://www.instagram.com/reel/DPlDaTPepnI/
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* [더보기란 내용] */}
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 10,
                      borderTop: "3px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>[더보기란 내용]</div>

                      <button
                        onClick={() => {
                          const text = `메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공 받았습니다.

메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair Special Set
#선크림 #선세럼 #선크림추천
https://bepla.in/HTtM`;
                          navigator.clipboard?.writeText(text);
                        }}
                        style={{
                          marginLeft: "auto",
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "1px solid #d4ff8f",
                          background: "#AFFF33",
                          cursor: "pointer",
                          color: "#000",
                        }}
                      >
                        복사
                      </button>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        lineHeight: 1.7,
                        whiteSpace: "pre-line",
                      }}
                    >
                      메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해
                      제공 받았습니다.
                      {"\n"}
                      {"\n"}
                      메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
                      {"\n"}
                      MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair
                      Special Set
                      {"\n"}
                      #선크림 #선세럼 #선크림추천
                      {"\n"}
                      https://bepla.in/HTtM
                    </p>
                  </div>

                  {/* [제목 키워드] */}
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 10,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>[제목 키워드]</div>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText("메디힐");
                        }}
                        style={{
                          marginLeft: "auto",
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "1px solid #d4ff8f",
                          background: "#AFFF33",
                          cursor: "pointer",
                          color: "#000",
                        }}
                      >
                        복사
                      </button>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        lineHeight: 1.7,
                      }}
                    >
                      메디힐
                    </p>
                  </div>

                  {/* [유료 프로모션 체크] */}
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 10,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>
                        [유료 프로모션 체크]
                      </div>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        lineHeight: 1.7,
                      }}
                    >
                      Youtube 영상 옵션 &gt; 세부정보 &gt; &lsquo;유료 프로모션
                      라벨 추가&rsquo; 설정해 주세요.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* 하단 큰 배너 (이미지 접힘/펼침 기능 포함) */}
        {activeTab === "info" && (
          <section
            style={{
              margin: "0 0 16px",
              padding: "0 20px",
            }}
          >
            <div
              ref={bannerRef}
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                height: bannerHeight, // 숫자로 제어
                transition: "height 0.45s ease-in-out", // 애니메이션
              }}
            >
              <Image
                src="/images/long.jpg"
                alt="배너"
                width={430}
                height={1200}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />

              {/* 🔻 이미지 하단 전체 폭에 맞춘 오버레이 영역 */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "0 12px 14px", // 좌우 여백 + 아래 여백
                  boxSizing: "border-box",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* 펼쳐보기 버튼 (배너 아래 붙임) */}
                <button
                  onClick={() => setIsBannerOpen((prev) => !prev)}
                  style={{
                    width: "100%", // ⬅ 이미지 폭과 동일
                    padding: "10px 0",
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.9)",
                    background: "rgba(0,0,0,0.35)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  {isBannerOpen ? "제품 정보 접기 ▲" : "제품 정보 펼쳐보기 ▼"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 고정 신청하기 버튼 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          padding: "10px 12px", // 회색 반투명 바 안쪽 여백
          background: "rgba(0, 0, 0, 0.25)", // 반투명 회색 (전체를 둘러싸는 박스)
          backdropFilter: "blur(4px)",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480, // 모바일 폭
            background: "transparent", // 흰 배경 카드
            borderRadius: 10,
            padding: "0px 12px 12px",
            boxSizing: "border-box",
          }}
        >
          {/* 모집 마감 텍스트 */}
          <div
            style={{
              fontSize: 12,
              color: "#555",
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            모집 마감: 10/30(목) | 당첨자 발표: 10/31(금)까지
          </div>

          {/* 신청하기 버튼 */}
          <button
            onClick={() => router.push("/campaign-apply/step1")}
            style={{
              width: "100%",
              padding: "12px 0",
              borderRadius: 8,
              border: "none",
              background: "#AFFF33",
              color: "#000",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            신청하기
          </button>
        </div>
      </div>
    </main>
  );
}
