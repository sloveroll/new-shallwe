// app/(my-home)/layout.tsx
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function MyHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* 상단 고정 헤더 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <Header />
      </div>

      {/* 스크롤 되는 콘텐츠 영역 (홈, 검색 등) */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "70px", // 하단 네비 높이만큼 확보
        }}
      >
        {children}
      </div>

      {/* 하단 고정 네비 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 60,
          background: "#fff",
          borderTop: "1px solid #eee",
        }}
      >
        <BottomNav />
      </div>
    </div>
  );
}