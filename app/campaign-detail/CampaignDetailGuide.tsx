export default function CampaignDetailGuide() {
  return (
    <section className="px-5">
      {/* 탭 버튼 영역 */}
      <div className="flex mb-4 border-b border-[#eee]">
        <button
          className="
            flex-1 py-3
            bg-transparent border-0
            font-bold
            border-b-2 border-[#333]
          "
        >
          캠페인 정보
        </button>

        <button
          className="
            flex-1 py-3
            bg-transparent border-0
            text-[#888]
          "
        >
          콘텐츠 가이드
        </button>
      </div>

      {/* 희망 크리에이터 */}
      <div className="border border-[#ddd] p-[14px] rounded-[10px] mb-4">
        <h3 className="text-[15px] mb-2">희망 크리에이터</h3>

        <ul className="text-[13px] leading-[1.7] list-disc pl-4">
          <li>피부 타임: 복합성, 민감성</li>
          <li>피부 고민: 여드름, 홍조, 기미</li>
          <li>연령대: 18-24 여성</li>
        </ul>
      </div>

      {/* 유의사항 */}
      <div className="border border-[#ddd] p-[14px] rounded-[10px]">
        <h3 className="text-[15px] mb-2">유의사항</h3>

        <ul className="text-[13px] leading-[1.7] list-disc pl-4">
          <li>✔ 2차 활용 가능</li>
          <li>✔ 콘텐츠 필수 요소 포함</li>
          <li>✔ 유튜브 제품 링크 포함 필수</li>
        </ul>
      </div>
    </section>
  );
}
