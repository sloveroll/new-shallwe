"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RegisterConfirmModal from "../../components/modal/ContentRegisterConfirmModal";
import SubPageHeader from "../../components/common/SubPageHeader";

export default function ContentRegisterClient() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="bg-white">
      <div className="w-full max-w-[530px] mx-auto box-border">
        <SubPageHeader title="협업 콘텐츠 등록" />
        <div className="px-5 pt-4">

        {/* 1. 경고 배너 */}
        <section
          className="
            mb-[10px]
            w-[90%]
            mx-auto
            rounded-full
            border border-[#ff3b30]
            px-1.5 py-2.5
            text-[12px]
            text-black
            text-center
          "
        >
          콘텐츠 등록 기간이{" "}
          <strong className="text-[#ff3b30]">2일 경과</strong>하여 캐시가{" "}
          <strong className="text-[#ff3b30]">80%만 지급</strong>될 예정이에요.
        </section>

        {/* 2. 캠페인 요약 박스 */}
        <section
          className="
            mb-6
            rounded-[14px]
            bg-[#fafafa]
            px-3 py-3
            text-[12px]
            leading-relaxed
          "
        >
          {/* 상단 태그들 */}
          <div className="flex items-center mb-5 gap-1.5">
            <span
              className="
                text-[11px]
                px-1.5 py-[2px]
                rounded
                border border-black
              "
            >
              쇼츠
            </span>
          </div>

          <div className="text-[13px] mb-1">
            <strong>[메디힐, 비플레인]</strong> 요즘 잘 쓰는 아이템 추천템 특집
            캠페인명 두줄 일 때
          </div>

          <div className="text-[12px] mb-1">
            <strong>제품 협찬</strong>
          </div>

          <ul className="text-[12px] m-0 pl-4 leading-[1.7] list-disc">
            <li>
              <strong>콘텐츠 등록 기간: 11/16(일) ~ 11/27(목)</strong>
            </li>
            <li>
              <strong>
                사전 검수 마감일: 11/27(목)까지{" "}
                <a href="#" className="text-[#0070c9]">
                  (→ 사전 검수)
                </a>
              </strong>
            </li>
            <li>캐시 지급일: 11/27(목)까지</li>
            <li>콘텐츠 유지 기간: 60일</li>
          </ul>
        </section>

        {/* 3. 섹션 타이틀 */}
        <section className="mb-10">
          <h2 className="text-[16px] font-bold mb-3">
            <strong className="text-red-500">①</strong> 콘텐츠 등록 전 한번 더
            확인해 주세요.
          </h2>

          {/* 유의사항 제목 */}
          <div className="text-[13px] font-semibold mb-1.5">유의사항</div>

          {/* 유의사항 박스 */}
          <div
            className="
              mb-3.5
              rounded-[12px]
              border border-[#e5e5e5]
              p-3.5
              bg-white
              text-[12px]
            "
          >
            {/* 1줄: 2차 활용 */}
            <div className="flex items-center mb-2 gap-2.5">
              <span
                className="
                  bg-[#e7fbdc]
                  rounded-full
                  px-2.5 py-1
                  text-[11px] font-semibold
                  whitespace-nowrap
                "
              >
                ✅ 2차 활용
              </span>
              <span className="leading-relaxed">
                협업 영상이 상업적으로 활용될 수 있습니다.
              </span>
            </div>

            {/* 2줄: 사전 검수 */}
            <div className="flex items-center mb-2.5 gap-2.5">
              <span
                className="
                  bg-[#e7fbdc]
                  rounded-full
                  px-2.5 py-1
                  text-[11px] font-semibold
                  whitespace-nowrap
                "
              >
                ✅ 사전 검수
              </span>
              <span className="leading-relaxed">
                콘텐츠 초안을 미리 제출하여 검수받아야 해요.
              </span>
            </div>

            {/* 아래 bullet 목록 */}
            <ul className="m-0 pl-4 leading-[1.7] list-disc">
              <li>유튜브 제품 태그 필수</li>
              <li>추가 제공품 노출 필수</li>
              <li>협업금에 2차 활용 비용 포함</li>
            </ul>
          </div>

          {/* 노출 시간 */}
          <div className="mb-3.5">
            <div className="text-[13px] font-semibold mb-1.5">노출 시간</div>
            <div
              className="
                rounded-[8px]
                border border-[#eee]
                px-3 py-2.5
                text-[13px]
              "
            >
              30초
            </div>
          </div>

          {/* 더보기란 내용 */}
          <div className="mb-3.5">
            <div className="flex items-center mb-1.5">
              <div className="text-[13px] font-semibold">더보기란 내용</div>
              <button
                type="button"
                onClick={() => {
                  const text = `메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공 받았습니다.

메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair Special Set
#선크림 #선세럼 #선크림추천
https://bepla.in/HTtM`;
                  navigator.clipboard?.writeText(text);
                  alert("복사되었습니다.");
                }}
                className="
                  ml-auto
                  text-[11px]
                  px-2.5 py-1
                  rounded-full
                  border border-[#d4ff8f]
                  bg-[#AFFF33]
                  cursor-pointer
                "
              >
                복사
              </button>
            </div>

            <div
              className="
                rounded-[8px]
                border border-[#eee]
                px-3 py-2.5
                text-[12px]
                leading-[1.7]
                whitespace-pre-line
              "
            >
              메디힐의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공
              받았습니다.
              {"\n"}
              {"\n"}
              메디힐 마데카소사이드 수분 선세럼 촉촉 리페어 50g 더블기획
              {"\n"}
              MEDIHEAL Madecassoside Moisture Sun Serum,Blemish Repair Special
              Set
              {"\n"}
              #선크림 #선세럼 #선크림추천
              {"\n"}
              https://bepla.in/HTtM
            </div>
          </div>

          {/* 제목 키워드 */}
          <div className="mb-3.5">
            <div className="flex items-center mb-1.5">
              <div className="text-[13px] font-semibold">제목 키워드</div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText("메디힐");
                  alert("복사되었습니다.");
                }}
                className="
                  ml-auto
                  text-[11px]
                  px-2.5 py-1
                  rounded-full
                  border border-[#d4ff8f]
                  bg-[#AFFF33]
                  cursor-pointer
                "
              >
                복사
              </button>
            </div>

            <div
              className="
                rounded-[8px]
                border border-[#eee]
                px-3 py-2.5
                text-[12px]
              "
            >
              메디힐
            </div>
          </div>

          {/* 유료 프로모션 체크 */}
          <div className="mb-1">
            <div className="text-[13px] font-semibold mb-1.5">
              유료 프로모션 체크
            </div>
            <div
              className="
                rounded-[8px]
                border border-[#eee]
                px-3 py-2.5
                text-[12px]
                leading-relaxed
              "
            >
              Youtube 영상 옵션 &gt; 세부정보 &gt; &apos;유료 프로모션 라벨
              추가&apos; 설정해 주세요.
            </div>
          </div>
        </section>

        {/* 4. 최종 콘텐츠 URL 등록 */}
        <section className="mb-4.5">
          <h2 className="text-[16px] font-bold mb-2.5">
            <strong className="text-red-500">②</strong> 최종 업로드된 콘텐츠를
            등록해 주세요.
          </h2>

          <div className="mb-1.5">
            <input
              placeholder="협업 채널에 최종 업로드된 콘텐츠의 URL을 붙여 넣어주세요"
              className="
                w-full
                rounded-[8px]
                border border-[#eee]
                px-3 py-2.5
                text-[13px]
                box-border
                outline-none
              "
            />
          </div>

          <div className="text-[11px] text-[#ff3b30] mb-5">
            연동된 채널의 콘텐츠만 등록 가능해요.
          </div>

          {/* 체크박스 */}
          <label
            className="
              flex items-center
              gap-1.5
              text-[12px]
              mb-1
            "
          >
            <input type="checkbox" className="align-middle" />
            <span>
              <strong>콘텐츠 내 가이드 내용을 전부 반영하였습니다. </strong>
              <a href="#" className="text-[#0070c9]">
                (→ 가이드 확인)
              </a>
            </span>
          </label>

          <div className="text-[11px] text-[#ff3b30] ml-[25px] mt-1">
            ※ 미준수된 항목이 있을 경우, 수정·재업로드 요청 및 실패 처리될 수
            있어요.
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="
          w-full
          mt-5
          py-3
          rounded-[8px]
          border-0
          bg-[#AFFF33]
          text-[15px] font-bold
          cursor-pointer
          mx-5 mb-5
          w-[calc(100%-40px)]
        "
      >
        등록하기
      </button>
      </div>

      {/* RegisterConfirmModal 모달 */}
      <RegisterConfirmModal
        open={showModal}
        onConfirm={() => {
          // TODO: 실제 등록 API 호출 후 성공 시 이동
          router.push("/");
        }}
        onCancel={() => setShowModal(false)}
      />
    </main>
  );
}
