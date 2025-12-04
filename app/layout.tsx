// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import { MainTabProvider } from "./MainTabContext";

export const metadata: Metadata = {
  title: "New Shallwe",
  description: "뉴쉘위 모바일 중심 웹",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* body에 바로 배경 클래스 지정 */}
      <body className="app-bg">
        {/* 이 div가 "모바일 화면" 캔버스 */}
        <div className="app-shell">
          <MainTabProvider>
            <Header />    {/* 🔥 모든 페이지에서 공통 */}
            {children}
            <BottomNav /> {/* 🔥 공통 하단네비 */}
          </MainTabProvider>
        </div>
      </body>
    </html>
  );
}