import { db } from "@/lib/db";
import { campaigns } from "@/lib/schema";
import { eq } from "drizzle-orm";
import MyCollabClient, { Campaign } from "./MyCollabClient";

// 이 부분은 실제로는 DB 데이터를 가져오는 로직으로 대체되어야 합니다.
// 현재는 DB가 비어있을 수 있으므로, 기존 더미 데이터를 유지하되
// 구조적으로는 서버에서 데이터를 '준비'해서 내려주는 형태로 구현합니다.
// 추후 DB가 채워지면 db.select().from(campaigns)... 형태로 교체하면 됩니다.

async function getCampaigns() {
    // 예시: 실제 DB 연동 시 코드
    // const allCampaigns = await db.select().from(campaigns);
    // return allCampaigns;

    // 현재는 더미 데이터 반환 (기존 로직 유지)
    // 실제로는 DB에서 status나 type에 따라 쿼리하거나, 전체를 가져와서 분류할 수 있습니다.
    const applyList: Campaign[] = [
        {
            id: 1,
            platform: "youtube",
            type: "쇼츠",
            status: "신청 확인",
            title: "아윤채 인리치 본딩 케어 크림",
            announce_date: "선정자 발표: 11/17(월)까지",
            thumbnail: "/images/sample.png",
        },
        {
            id: 2,
            platform: "youtube",
            type: "릴스",
            status: "신청 확인",
            title: "메디힐 수분 선세럼 체험단",
            announce_date: "선정자 발표: 11/20(수)까지",
            thumbnail: "/images/sample.png",
        },
        {
            id: 3,
            platform: "youtube",
            type: "영상",
            status: "신청 확인",
            title: "비플레인 진정 수분 크림 리뷰",
            announce_date: "선정자 발표: 11/25(월)까지",
            thumbnail: "/images/sample.png",
        },
        {
            id: 4,
            platform: "youtube",
            type: "쇼츠",
            status: "신청 확인",
            title: "닥터지 레드 블레미쉬 라인 체험",
            announce_date: "선정자 발표: 12/01(월)까지",
            thumbnail: "/images/sample.png",
        },
    ];

    const progressList: Campaign[] = [
        {
            id: 201,
            platform: "youtube",
            type: "쇼츠",
            status: "진행 중",
            title: "두 번째 캠페인 제목 예시",
            announce_date: "콘텐츠 등록 마감: 11/27(목)까지",
            thumbnail: "/images/sample.png",
        },
        {
            id: 202,
            platform: "youtube",
            type: "쇼츠",
            status: "진행 중",
            title: "두 번째 캠페인 제목 예시",
            announce_date: "콘텐츠 등록 마감: 11/27(목)까지",
            thumbnail: "/images/sample.png",
        },
    ];

    const doneList: Campaign[] = [
        {
            id: 301,
            platform: "instagram",
            type: "릴스",
            status: "미선정",
            title: "리얼베리어, 믹순 12월 올리브영 세일 특집 A",
            announce_date: null,
            thumbnail: "/images/sample.png",
        },
    ];

    return { applyList, progressList, doneList };
}

export default async function MyCollabPage() {
    // Server Component로서 데이터 페칭 수행
    const { applyList, progressList, doneList } = await getCampaigns();

    return (
        <MyCollabClient
            applyList={applyList}
            progressList={progressList}
            doneList={doneList}
        />
    );
}
