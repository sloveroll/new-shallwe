"use client";

import { useRouter } from "next/navigation";
import CampaignDetailHeader from "./CampaignDetailHeader";
import CampaignDetailInfo from "./CampaignDetailInfo";
import CampaignDetailGuide from "./CampaignDetailGuide";
import CampaignDetailFooter from "./CampaignDetailFooter";

export default function CampaignDetailPage() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* 1) 상단 고정 헤더 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <CampaignDetailHeader onBack={() => router.back()} />
      </div>

      {/* 2) 스크롤 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "100px", // 하단 탭바 고려
        }}
      >
        <CampaignDetailInfo />
        <CampaignDetailGuide />
      </div>

      {/* 3) 하단 고정 버튼/탭바 */}
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
        <CampaignDetailFooter />
      </div>
    </div>
  );
}
