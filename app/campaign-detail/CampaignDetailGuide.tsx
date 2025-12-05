export default function CampaignDetailGuide() {
  return (
    <section style={{ padding: "0 20px" }}>
      {/* 탭 버튼 영역 */}
      <div
        style={{
          display: "flex",
          marginBottom: "16px",
          borderBottom: "1px solid #eee",
        }}
      >
        <button
          style={{
            flex: 1,
            padding: "12px 0",
            background: "none",
            border: "none",
            fontWeight: 700,
            borderBottom: "2px solid #333",
          }}
        >
          캠페인 정보
        </button>

        <button
          style={{
            flex: 1,
            padding: "12px 0",
            background: "none",
            border: "none",
            color: "#888",
          }}
        >
          콘텐츠 가이드
        </button>
      </div>

      {/* 희망 크리에이터 */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "14px",
          borderRadius: "10px",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ fontSize: "15px", marginBottom: "8px" }}>희망 크리에이터</h3>

        <ul style={{ fontSize: "13px", lineHeight: "1.7" }}>
          <li>피부 타임: 복합성, 민감성</li>
          <li>피부 고민: 여드름, 홍조, 기미</li>
          <li>연령대: 18-24 여성</li>
        </ul>
      </div>

      {/* 유의사항 */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "14px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ fontSize: "15px", marginBottom: "8px" }}>유의사항</h3>

        <ul style={{ fontSize: "13px", lineHeight: "1.7" }}>
          <li>✔ 2차 활용 가능</li>
          <li>✔ 콘텐츠 필수 요소 포함</li>
          <li>✔ 유튜브 제품 링크 포함 필수</li>
        </ul>
      </div>
    </section>
  );
}
