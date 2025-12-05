export default function CampaignDetailFooter() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: "16px",
        background: "#fff",
        borderTop: "1px solid #eee",
      }}
    >
      <button
        style={{
          width: "100%",
          padding: "14px 0",
          background: "#1ad079",
          color: "#fff",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        신청하기
      </button>
    </div>
  );
}
