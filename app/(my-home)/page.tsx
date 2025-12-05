"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useMainTab } from "../MainTabContext";  // 🔥 추가

export default function HomePage() {
  const { mainTab } = useMainTab();            // 🔥 탭 상태 읽기
  const [bestIndex, setBestIndex] = useState(0);
  const bestListRef = useRef<HTMLDivElement | null>(null);

  const handleBestScroll = () => {
    const el = bestListRef.current;
    if (!el) return;

    const totalCards = 4; // Best Campaign 카드 개수

    // 스크롤 가능한 전체 길이
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setBestIndex(0);
      return;
    }

    const ratio = el.scrollLeft / maxScroll; // 0 ~ 1 사이 값
    const idx = Math.round(ratio * (totalCards - 1));
    setBestIndex(idx);
  };
  return (
    <main>
      {mainTab === "home" && (
      
      <section style={{ padding: "0px 20px 80px" }}>
        {/* 상단 배너 카드 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "16px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/shallwe-banner.png" // 방금 넣은 파일 경로
            alt="쉘위 사용 설명서 배너"
            width={1140} // 원본 이미지 가로/세로 비율에 맞춰서 대충 넣어주면 됨
            height={768}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
            priority // 첫 화면 배너니까 로딩 우선순위 높이기
          />
        </div>

        {/* 카테고리 버튼 영역 (태그들) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          {["basic", "color", "body", "hair", "fashion", "food", "etc"].map(
            (label) => (
              <button
                key={label}
                style={{
                  borderRadius: "999px",
                  border: "1px solid black",
                  padding: "6px 12px",
                  fontSize: "12px",
                  background: "#fff",
                }}
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* Best Campaign 영역 */}
        <section
          style={{
            marginTop: "32px",
            marginLeft: "-20px", // 바깥 padding 없애서 양옆 꽉 차게
            marginRight: "-20px",
            background: "#262626", // 어두운 배경
            padding: "24px 20px 28px",
          }}
        >
          {/* 제목 */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Best Campaign
          </h2>

          {/* 카드 슬라이드 영역 */}
          <div
            ref={bestListRef}
            onScroll={handleBestScroll}
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              paddingBottom: "16px",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
            className="no-scrollbar"
          >
            {[1, 2, 3, 4].map((no) => (
              <a key={no} className="best-card" href="/campaign-detail">
                {/* 상단: 이미지 + 숫자 */}
                <div className="best-card-main">
                  <div className="best-card-rank">{no}</div>

                  <div className="best-card-image">
                    <img
                      src="/images/sample.png"
                      alt="상품"
                      className="best-card-image-img"
                    />
                  </div>
                </div>

                {/* 하단: 텍스트 영역 */}
                <div className="best-card-bottom">
                  <strong className="best-card-brand">브랜드명</strong>
                  <div className="best-card-name">상품명 텍스트</div>

                  <div className="best-card-people">
                    100명 | <span className="best-card-strong">45명</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* 하단 페이지 인디케이터 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {[0, 1, 2, 3].map((i) => {
              const active = bestIndex === i;
              return (
                <span
                  key={i}
                  style={{
                    width: active ? "18px" : "6px",
                    height: "6px",
                    borderRadius: active ? "999px" : "50%",
                    background: active ? "#a5ff3f" : "#666",
                    display: "inline-block",
                    transition: "all 0.2s ease",
                  }}
                />
              );
            })}
          </div>
        </section>

        {/* new 캠페인 리스트 섹션 */}
        <section
          style={{
            padding: "20px 0",
            borderRadius: "16px",
          }}
        >
          {/* 상단 제목 + 전체보기 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>New Campaign</h2>
            <button
              style={{
                background: "transparent",
                border: "none",
                fontSize: "14px",
                color: "#444",
              }}
            >
              전체보기 &gt;
            </button>
          </div>

          {/* 카드 리스트 (그리드) */}
          <div className="new-card-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="new-card">
                {/* 상단: 배경 도형 + 이미지 (이미지 영역 50%) */}
                <div className={`new-card-shape new-card-shape-${(i - 1) % 3}`}>
                  <img src="/images/sample.png" alt="상품 이미지" />
                </div>

                {/* 하단: 텍스트 영역 50% */}
                <div className="new-card-text">
                  <div className="new-card-brand">브랜드명</div>
                  <div className="new-card-name">상품명 텍스트</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="shallwe-divider" />

        {/* Recommend 섹션 */}
        <section
          className="recommend-section"
          style={{
            marginLeft: "-20px",
            marginRight: "-20px",
            padding: "28px 20px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Recommend
          </h2>

          {/* 1) 메인 대형 카드 1개 */}
          <div className="recommend-main-card">
            <div className="recommend-main-image">
              <img src="/images/sample.png" alt="추천 메인 상품" />
            </div>

            <div className="recommend-main-info">
              {/* 상단 라벨 영역은 나중에 필요하면 채우기 */}
              <div className="recommend-main-top-row">
                <span className="recommend-main-tag">유튜브</span>
                <span className="recommend-main-badge">마감임박!</span>
              </div>

              <div className="recommend-main-brand">동아제약</div>
              <div className="recommend-main-name">
                아일로 화이트치윤 30포 세트
              </div>

              <div className="recommend-main-count">
                50명 | <b>25명</b>
              </div>
            </div>
          </div>

          {/* 2) 아래 작은 카드들 – 2열 그리드 (2 x 2) */}
          <div className="recommend-small-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="recommend-small-card">
                {/* 도형 + 이미지 */}
                <div className={`small-shape small-shape-${i % 2}`}>
                  <img src="/images/sample.png" alt="추천 상품" />
                </div>

                {/* 텍스트 */}
                <div className="small-info">
                  <div className="small-top-row">
                    <span className="small-channel">웰스</span>
                    <span className="small-dday">D-10</span>
                  </div>
                  <div className="small-brand">브랜드명</div>
                  <div className="small-name">상품명 텍스트 두줄 정도 입력</div>
                  <div className="small-count">
                    100명 | <b>36명</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🔥 Footer */}
        <footer className="app-footer">
          <div className="footer-logo">
            <img
              src="/images/scroll-logo.png"
              alt="Shallwe Logo"
              className="footer-logo-img"
            />
          </div>

          <div className="footer-info">
            <p>상호 : 두산매거진</p>
            <p>주소 : 서울특별시 강남구 언주로 726 (논현동, 두산빌딩)</p>
            <p>대표 : 송현승 | 사업자등록번호 : 211-85-51635</p>
            <p>
              통신판매업신고번호 : 강남-15934호 |{" "}
              <span className="footer-strong">사업자정보확인</span>
            </p>
            <p>메일 : shallwe@doosan.com</p>
            <p>호스팅 : 케이티 클라우드 (KT Cloud)</p>
          </div>

          <div className="footer-links">
            <span>이용약관</span>
            <span className="footer-link-divider">|</span>
            <span>개인정보 처리방침</span>
            <span className="footer-link-divider">|</span>
            <span>광고/제휴문의</span>
          </div>

          <p className="footer-copy">
            COPYRIGHT © DOOSAN MAGAZINE. INC. ALL RIGHTS RESERVED
          </p>
        </footer>
      </section>
      )}

      {/* 🔥 2. Youtube 탭 화면 (소츠 / all / skincare ... + 카드 리스트) */}
      {mainTab === "youtube" && (
        <section style={{ padding: "0 20px 80px" }}>
          {/* 상단 필터 (소츠 + 칩들) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "12px 0",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "4px 10px",
                borderRadius: "999px",
                border: "1px solid #000",
                background: "#000",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              소츠 ▼
            </button>

            {["all", "skincare", "makeup", "etc"].map((label) => (
              <button
                key={label}
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: "1px solid #000",
                  background: "#fff",
                  fontSize: "12px",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 카드 리스트 2열 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px 12px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <article key={i} style={{ fontSize: "12px" }}>
                {/* 이미지 영역 */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    background: "#f0f0f0",
                    marginBottom: "8px",
                  }}
                >
                  <Image
                    src="/images/sample.png"
                    alt="상품 이미지"
                    width={300}
                    height={400}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                {/* 채널/상태 라인 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: "#555" }}>소츠</span>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background: "#a5ff3f",
                      fontWeight: 700,
                    }}
                  >
                    D-3
                  </span>
                </div>

                {/* 타이틀 */}
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "2px",
                  }}
                >
                  아르마니 뷰티
                </div>
                <div style={{ marginBottom: "4px" }}>
                  NEW 파워 패브릭 PRO 파운데이션
                </div>

                {/* 인원 정보 */}
                <div>
                  10명 | <b>1명</b>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 🔥 3. 인스타 / 블로그는 일단 자리만 */}
      {mainTab === "instagram" && (
        <section style={{ padding: "16px 20px" }}>
          Instagram 탭 내용 넣을 자리
        </section>
      )}

      {mainTab === "blog" && (
        <section style={{ padding: "16px 20px" }}>
          Blog 탭 내용 넣을 자리
        </section>
      )}
    </main>
  );
}
