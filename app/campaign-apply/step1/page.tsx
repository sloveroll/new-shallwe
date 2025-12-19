import React from "react";
// import { db } from "@/lib/db";
// import { campaigns } from "@/lib/schema";
// import { eq } from "drizzle-orm";
import CampaignApplyStep1Client from "./CampaignApplyStep1Client";
import { Campaign } from "@/app/my-collab/MyCollabClient";

// Campaign 타입을 공유하거나 새로 정의
interface CampaignDetail extends Campaign {
  description?: string;
  category_label?: string;
  content_start_date?: string;
  content_end_date?: string;
  guide_send_date?: string;
  pre_check_end_date?: string;
  cash_pay_date?: string;
  maintain_period?: string;
  notice?: string;
  exposure_time?: string;
}

async function getCampaignDetail(id: number): Promise<CampaignDetail> {
  // 실제 DB 연동 시:
  // const campaign = await db.query.campaigns.findFirst({ where: eq(campaigns.id, id) });
  // return campaign;

  // 더미 데이터 반환
  return {
    id: 1,
    platform: "youtube", // 'youtube' | 'instagram'
    type: "쇼츠",
    status: "신청 확인",
    title: "아윤채 인리치 본딩 케어 크림",
    announce_date: "선정자 발표: 11/17(월)까지",
    thumbnail: "/images/sample.png",

    // 상세 정보 (하드코딩 된 내용을 데이터로 변환)
    description: "요즘 잘 쓰는 아이템 추천템",
    category_label: "제품 협찬",
    content_start_date: "11/16(일)",
    content_end_date: "11/27(목)",
    guide_send_date: "11/27(목)까지",
    pre_check_end_date: "11/27(목)까지",
    cash_pay_date: "11/27(목)까지",
    maintain_period: "60일",
    notice: "", // 필요 시 JSON 등
    exposure_time: "아르마니 뷰티 30초, 입생로랑 뷰티 30초 (총 60초)",
  };
}

export default async function CampaignApplyPage() {
  // 예: URL 파라미터에서 ID를 가져온다고 가정 (현재는 ID: 1로 고정)
  const campaign = await getCampaignDetail(1);

  return <CampaignApplyStep1Client campaign={campaign} />;
}
