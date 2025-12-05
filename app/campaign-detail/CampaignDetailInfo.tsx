export default function CampaignDetailInfo() {
  return (
    <section style={{ padding: "16px 20px" }}>
      <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
        메디힐
      </div>

      <div style={{ marginBottom: "16px", fontSize: "14px", lineHeight: "1.5" }}>
        마데카소사이드 수분 선세럼 촉촉 리페어 50g
      </div>

      {/* 쇼츠 + 지원자 수 + 디데이 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <span
          style={{
            fontSize: "12px",
            padding: "2px 8px",
            background: "#eee",
            borderRadius: "6px",
          }}
        >
          쇼츠
        </span>

        <span style={{ fontSize: "12px", color: "#333" }}>1,230/20</span>

        <span
          style={{
            fontSize: "12px",
            background: "#ff6584",
            color: "#fff",
            padding: "2px 8px",
            borderRadius: "6px",
          }}
        >
          D-12
        </span>
      </div>

      {/* 날짜 정보 */}
      <ul style={{ fontSize: "13px", lineHeight: "1.6", color: "#444" }}>
        <li>리뷰 작성 기간: 11/6(금) ~ 11/27(목)</li>
        <li>제품 발송·가이드 전달: 11/27(목)까지</li>
        <li>사전 검사 마감일: 11/27(목)까지</li>
        <li>캐시 지급일: 11/27(목)까지</li>
        <li>콘텐츠 유지 기간: 60일</li>
      </ul>
    </section>
  );
}
