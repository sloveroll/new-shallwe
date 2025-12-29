import MyCashClient, { CashHistoryItem } from "./MyCashClient";

export const metadata = {
  title: "보유 캐시 - My Cash",
};

const MOCK_HISTORY: CashHistoryItem[] = [
  {
    id: 1,
    type: "income",
    date: "2025.11.25",
    title: "아벤느 캠페인 협업 완료",
    amount: 200_000,
  },
  {
    id: 2,
    type: "withdraw",
    date: "2025.11.25",
    title: "출금 신청",
    amount: -200_000,
  },
  {
    id: 3,
    type: "expire",
    date: "2025.11.25",
    title: "유효기간 경과",
    amount: -200_000,
  },
];

export default async function MyCashPage() {
  // 나중에 DB 연동 시 여기서 데이터를 fetch합니다.
  // const history = await getCashHistory(); 
  
  return <MyCashClient initialHistory={MOCK_HISTORY} />;
}
