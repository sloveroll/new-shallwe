// app/(my-home)/layout.tsx
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function MyHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 가운데 콘텐츠 – 그냥 자연스럽게 페이지 스크롤 */}
      <div className="pb-[70px]">
        {children}
      </div>

      {/* 하단 고정 네비 */}
      <div className="fixed bottom-0 left-0 w-full border-t border-[#eee] bg-white z-[60]">
        <BottomNav />
      </div>
    </div>
  );
}
