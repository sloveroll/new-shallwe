// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
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
      <body className="app-bg">
        <MainTabProvider>
          {/* 모바일 화면 캔버스 */}
          <div className="app-shell">{children}</div>
        </MainTabProvider>
      </body>
    </html>
  );
}