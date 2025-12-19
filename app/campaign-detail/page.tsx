// app/campaign-detail/page.tsx
import CampaignDetailContent from "./CampaignDetailContent";

// TODO: 실제 DB에서 데이터를 가져오는 함수로 교체
async function getCampaignData(id: string) {
  // 예시: const response = await fetch(`/api/campaigns/${id}`);
  // return await response.json();
  
  // 임시 더미 데이터
  return {
    id,
    type: "쇼츠",
    total: 10,
    current: 1,
    dDay: "마감임박!",
    brand: "아르마니 뷰티",
    product: "NEW 파워 패브릭 PRO 파운데이션",
    imageUrl: "/images/sample.png",
    imageAlt: "캠페인 상품 이미지",
    contentPeriod: "11/16(일) - 11/27(목)",
    reviewDeadline: "11/27(목)까지",
    cashPaymentDate: "11/27(목)까지",
    contentMaintainPeriod: "60일",
    deadline: "11/13(목)",
    announcementDate: "11/14(금)",
  };
}

interface CampaignDetailPageProps {
  params: {
    id?: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function CampaignDetailPage({
  params,
}: CampaignDetailPageProps) {
  // TODO: 실제 ID를 params에서 가져오기
  const campaignId = params.id || "1";
  const campaignData = await getCampaignData(campaignId);

  return (
    <main className="min-h-screen bg-white pb-[90px]">
      {/* 안쪽 모바일 캔버스 */}
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen box-border">
        <CampaignDetailContent campaignData={campaignData} />
      </div>
    </main>
  );
}
