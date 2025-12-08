// app/components/FloatingQrBox.tsx

export default function FloatingQrBox() {
  return (
    <div
      style={{
        width: "300px",
        height: "286px",
        position: "fixed",
        left: "calc(-600px + 50vw)", // 캠핏 느낌 좌측 배치
        bottom: "56px",
        padding: "24px",
        borderRadius: "10px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        zIndex: 1000,
      }}
    >
      {/* QR 자리 - 임시 빈 박스 */}
      <div
        style={{
          width: "120px",
          height: "120px",
          background: "#e5e5e5",
          borderRadius: "6px",
          marginBottom: "16px",
        }}
      />

      <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>
        앱으로 더 편하게 이용하세요
      </div>

      <div style={{ fontSize: "13px", color: "#666" }}>
        QR 코드를 스캔하여 다운로드
      </div>
    </div>
  );
}
