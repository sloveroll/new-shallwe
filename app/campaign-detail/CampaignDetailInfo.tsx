export default function CampaignDetailInfo() {
  return (
    <section className="px-5 py-4">
      {/* 브랜드명 */}
      <div className="text-[18px] font-bold mb-1">메디힐</div>

      {/* 제품명 */}
      <div className="text-[14px] leading-[1.5] mb-4">
        마데카소사이드 수분 선세럼 촉촉 리페어 50g
      </div>

      {/* 쇼츠 + 지원자 수 + 디데이 */}
      <div className="flex gap-2 mb-4">
        <span className="text-[12px] px-2 py-[2px] bg-[#eee] rounded-md">
          쇼츠
        </span>

        <span className="text-[12px] text-[#333]">1,230/20</span>

        <span className="text-[12px] bg-[#ff6584] text-white px-2 py-[2px] rounded-md">
          D-12
        </span>
      </div>

      {/* 날짜 정보 */}
      <ul className="text-[13px] leading-[1.6] text-[#444] list-disc pl-5">
        <li>리뷰 작성 기간: 11/6(금) ~ 11/27(목)</li>
        <li>제품 발송·가이드 전달: 11/27(목)까지</li>
        <li>사전 검사 마감일: 11/27(목)까지</li>
        <li>캐시 지급일: 11/27(목)까지</li>
        <li>콘텐츠 유지 기간: 60일</li>
      </ul>
    </section>
  );
}
