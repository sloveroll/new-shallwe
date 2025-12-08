// app/my-alerts/campaign-proposal/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function CampaignProposalDetailPage() {
  const router = useRouter();

  return (
    <main className="flex-1 bg-white">
      {/* 상단 헤더 */}
      <header className="flex items-center px-5 pt-5 pb-4 border-b border-[#eee]">
        <button
          onClick={() => router.back()}
          className="mr-3 text-[20px]"
        >
          &lt;
        </button>
        <h1 className="flex-1 text-center text-[18px] font-semibold">
          캠페인 진행 제안
        </h1>
        <div className="w-[20px]" />
      </header>

      {/* 내용 */}
      <section className="px-5 py-6 text-[14px] leading-[1.7]">
        <p className="mb-4 text-[13px] font-medium text-[#555]">
          [쉘위] 캠페인 진행 제안
        </p>

        <p className="whitespace-pre-line">
          {`권중훈님, [토니모리, 더샘] 유튜브 쇼츠 캠페인에 적합하실 것 같아 진행 제안 드립니다. :)

아래 링크에서 내용을 확인하시고, 캠페인에 신청하시면 진행이 확정됩니다.

■ 제안 캠페인: https://www.studioshallwe.com/campaign/detail.jsp?product_idx=597
■ 신청 기한: 11/14(금)까지

본 문자는 발신 전용으로, 추가 문의사항은 아래 메일주소로 문의 부탁드립니다.

∙ 문의: 조수지 매니저, suji.cho@doosan.com

※ 제안드린 캠페인에 지원 시 진행이 확정됩니다.
※ 지원 기한이 경과할 경우 제안이 자동 드랍될 수 있습니다.`}
        </p>
      </section>
    </main>
  );
}
