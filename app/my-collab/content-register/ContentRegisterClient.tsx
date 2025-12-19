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
        {/* 1. 경고 배너 */}
        <section
          className="
            mb-[10px]
            w-full
            rounded-[8px]
            bg-[#F5F5F5]
            px-4 py-4
            text-[13px]
            text-center
          "
        >
          ⚠️ 콘텐츠 등록 기간이{" "}
          <strong className="text-[#ff3b30] underline">2일 경과</strong>하여
          캐시가 <strong className="text-[#ff3b30] underline">80%만 지급</strong>
          될 예정이에요.
        </section>

        {/* 2. 캠페인 요약 박스 */}
        {/* 2. 캠페인 요약 박스 */}
        <section
          className="
            mb-6
            rounded-[12px]
            bg-[#F5F5F5]
            p-5
            text-[12px]
            leading-relaxed
          "
        >
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/images/common/shorts.png"
              alt="shorts"
              className="h-[20px] w-auto object-contain"
            />
          </div>

          <div className="text-[15px] font-bold mb-1">아르마니 뷰티</div>
          <div className="text-[13px] text-[#444] mb-4">
            요즘 잘 쓰는 아이템 추천템
          </div>

          <div className="text-[13px] font-bold mb-2">제품 협찬</div>

          {/* 구분선 */}
          <div className="h-[1px] bg-[#ddd] mb-3"></div>

          <dl className="text-[12px] text-[#333] space-y-1">
            <div className="flex">
              <dt className="font-bold w-[120px] shrink-0">
                콘텐츠 등록 기간 :
              </dt>
              <dd>11/16(일) - 11/27(목)</dd>
            </div>
            <div className="flex">
              <dt className="text-[#666] w-[120px] shrink-0">
                제품 발송 가이드 전달 :
              </dt>
              <dd className="text-[#666]">11/27(목)까지</dd>
            </div>
            <div className="flex">
              <dt className="text-[#666] w-[120px] shrink-0">
                사전 검수 마감일 :
              </dt>
              <dd className="text-[#666]">11/27(목)까지</dd>
            </div>
            <div className="flex">
              <dt className="text-[#666] w-[120px] shrink-0">캐시 지급일 :</dt>
              <dd className="text-[#666]">11/27(목)까지</dd>
            </div>
            <div className="flex">
              <dt className="text-[#666] w-[120px] shrink-0">
                콘텐츠 유지 기간 :
              </dt>
              <dd className="text-[#666]">60일</dd>
            </div>
          </dl>
        </section>

        {/* 3. 섹션 타이틀 */}
        <section className="mb-10">
          <h2 className="text-[16px] font-bold mb-3">
            <strong className="text-red-500"></strong> 콘텐츠 등록 전 한번 더
            확인해 주세요.
          </h2>

          {/* 유의사항 박스 */}
          <div
            className="
              mb-5
              rounded-[12px]
              border border-[#e5e5e5]
              p-[14px]
              text-[12px]
              bg-[#fafafa]
            "
          >
            <h3 className="text-[15px] font-bold mb-3 pb-3 border-b border-[#eee]">
              유의 사항
            </h3>

            {/* 체크 항목들 */}
            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-1.5">
                <span className="text-[14px]">✅</span>
                <div>
                  <span className="font-bold text-[13px] text-black mr-1">
                    2차 활용
                  </span>
                  <span className="text-[12px] text-[#888]">
                    *협업 영상이 상업적으로 활용될 수 있습니다.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[14px]">✅</span>
                <div>
                  <span className="font-bold text-[13px] text-black mr-1">
                    클린본 제출
                  </span>
                  <span className="text-[12px] text-[#888]">
                    *BGM, 효과음 등을 제거한 영상 제출이 필수입니다.
                  </span>
                </div>
              </div>
            </div>

            {/* 일반 텍스트 목록 */}
            <ul className="text-[12px] leading-[1.7] text-[#666] m-0 pl-4 list-disc">
              <li>유튜브 제품 태그 필수</li>
              <li>추가 제공품 노출 필수</li>
              <li>협업금에 2차 활용 비용 포함</li>
            </ul>
          </div>

          {/* 노출 시간 */}
          {/* 노출 시간 */}
          <div
            className="
              mb-5
              rounded-[10px]
              border border-[#eee]
              bg-[#fafafa]
              text-[12px]
              px-3 py-[14px]
              text-[#555]
            "
          >
            <h3 className="text-[15px] font-bold mb-3 pb-3 border-b border-[#eee] text-black">
              노출 시간
            </h3>
            <div className="text-[13px] text-[#333]">
              아르마니 뷰티 30초, 입생로랑 뷰티 30초 (총 60초)
            </div>
          </div>

          {/* 더보기란 내용 */}
          {/* 더보기란 내용 */}
          <div className="mb-3.5 bg-[#F5F5F5] rounded-[12px] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] font-bold">더보기란 내용</div>
              <button
                type="button"
                onClick={() => {
                  const text = `아르마니 뷰티, 입생로랑 뷰티의 유료 광고를 포함하고 있으며, 스튜디오 쉘위를 통해 제공 받았습니다.

아르마니 뷰티 NEW 파워 패브릭 PRO 파운데이션
Armani Beauty NEW Power Fabric Pro Foundation
#선크림 #선세럼 #선크림추천
https://bepla.in/HTtM`;
                  navigator.clipboard?.writeText(text);
                  alert("복사되었습니다.");
                }}
                className="
                  text-[11px] font-bold text-[#AFFF33]
                  bg-black
                  px-2.5 py-1
                  rounded-[4px]
                  cursor-pointer
                  border-0
                "
              >
                복사
              </button>
            </div>

            <div className="text-[12px] text-[#333] leading-[1.6] whitespace-pre-line">
              아르마니 뷰티, 입생로랑 뷰티의 유료 광고를 포함하고 있으며, 스튜디오
              쉘위를 통해 제공 받았습니다.
              {"\n"}
              {"\n"}
              아르마니 뷰티 NEW 파워 패브릭 PRO 파운데이션
              {"\n"}
              Armani Beauty NEW Power Fabric Pro Foundation
              {"\n"}
              #선크림 #선세럼 #선크림추천
              {"\n"}
              https://bepla.in/HTtM
            </div>
          </div>

          {/* 제목 키워드 */}
          {/* 제목 키워드 */}
          <div className="mb-3.5 bg-[#F5F5F5] rounded-[12px] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] font-bold">제목 키워드</div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText("아르마니 뷰티");
                  alert("복사되었습니다.");
                }}
                className="
                  text-[11px] font-bold text-[#AFFF33]
                  bg-black
                  px-2.5 py-1
                  rounded-[4px]
                  cursor-pointer
                  border-0
                "
              >
                복사
              </button>
            </div>

            <div className="text-[12px] text-[#333]">아르마니 뷰티</div>
          </div>

          {/* 유료 프로모션 체크 */}
          {/* 유료 프로모션 체크 */}
          <div className="mb-1 bg-[#F5F5F5] rounded-[12px] p-5">
            <div className="text-[13px] font-bold mb-3">유료 프로모션 체크</div>
            <div className="text-[12px] text-[#333] leading-relaxed">
              Youtube 영상 옵션 &gt; 세부정보 &gt; &apos;유료 프로모션 라벨
              추가&apos; 설정해 주세요.
            </div>
          </div>
        </section>
      </div>
      </div>

      <div className="w-full h-3 bg-[#f7f7f7] border-t border-[#eee]" />

      <div className="w-full max-w-[530px] mx-auto box-border">
        <div className="px-5 pt-10">
        {/* 4. 최종 콘텐츠 URL 등록 */}
        <section className="mb-10">
          <h2 className="text-[16px] font-bold mb-4">
            최종 업로드된 콘텐츠를 등록해 주세요.
          </h2>

          <div className="mb-3">
            <div className="relative">
              <input
                placeholder=""
                defaultValue="http://www.youtube.com/watch?v=D3v94HND..."
                className="
                  w-full
                  rounded-[8px]
                  border border-[#ccc]
                  pl-3 pr-10 py-3
                  text-[13px]
                  box-border
                  outline-none
                "
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc] hover:text-[#999]"
                onClick={() => {
                  /* clear input logic */
                }}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-[12px] font-bold">
              영상 스타일에 더 가까운 것을 선택해 주세요.
            </span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="videoStyle"
                  className="appearance-none min-w-[14px] min-h-[14px] w-[14px] h-[14px] rounded-full border border-[#ddd] bg-white checked:bg-[#AFFF33] checked:border-[3.5px] checked:border-white checked:ring-1 checked:ring-[#ddd] cursor-pointer"
                />
                <span className="text-[12px] font-bold">브이로그</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="videoStyle"
                  className="appearance-none min-w-[14px] min-h-[14px] w-[14px] h-[14px] rounded-full border border-[#ddd] bg-white checked:bg-[#AFFF33] checked:border-[3.5px] checked:border-white checked:ring-1 checked:ring-[#ddd] cursor-pointer"
                />
                <span className="text-[12px] font-bold">리뷰</span>
              </label>
            </div>
          </div>

          {/* 체크박스 */}
          <label
            className="
              flex items-center
              gap-2
              text-[12px]
              mb-1.5
              cursor-pointer
            "
          >
            <input
              type="checkbox"
              className="appearance-none min-w-[14px] min-h-[14px] w-[14px] h-[14px] rounded-full border border-[#ddd] bg-white checked:bg-[#AFFF33] checked:border-[3.5px] checked:border-white checked:ring-1 checked:ring-[#ddd] cursor-pointer"
            />
            <span className="font-bold text-[#333]">
              콘텐츠 내 가이드 내용을 전부 반영하였습니다.
            </span>
          </label>

          <div className="text-[11px] text-[#ff3b30] ml-6 leading-tight">
            *미준수된 항목이 있을 경우, 수정·재업로드 요청 및 실패 처리될 수
            있어요.
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="
          w-full
          py-4
          border-0
          bg-[#AFFF33]
          text-[16px] font-bold
          cursor-pointer
          sticky bottom-0
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
