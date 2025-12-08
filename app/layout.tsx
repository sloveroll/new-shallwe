// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { MainTabProvider } from "./MainTabContext";
import FloatingQrBox from "./components/FloatingQrBox";

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
      <body className="m-0 min-h-screen flex justify-center bg-[#f3f5f6]">
        <MainTabProvider>
          {/* 모바일 화면 캔버스 */}
          <div
            className="
    w-full
    max-w-[530px]     // ← 캠핏과 동일하게 530px
    min-h-screen
    bg-white
    shadow-[0_0_20px_rgba(0,0,0,0.03)]
    relative
  "
          >
            {children}
          </div>

          {/* PC에서만 보이고 싶으면 hidden/md:block 등으로 감싸도 됨 */}
          <div className="hidden md:block">
            <FloatingQrBox />
          </div>
        </MainTabProvider>
      </body>
    </html>
  );
}
