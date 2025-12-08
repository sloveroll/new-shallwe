// app/campaign-apply/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SKIN_TYPES = ["건성", "복합성", "지성", "민감성", "중성"] as const;

const SKIN_CONCERNS = [
  "트러블/흉터",
  "기미/잡티",
  "주름/탄력",
  "모공/피지",
  "미백",
  "속건조",
  "블랙헤드",
  "다크서클",
  "홍조",
];

export default function CampaignApplyPage() {
  const router = useRouter();
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [productColor, setProductColor] = useState<"21호" | "22호" | null>(null);
  const [skinType, setSkinType] = useState<(typeof SKIN_TYPES)[number] | null>(
    null
  );
  const [skinConcerns, setSkinConcerns] = useState<string[]>([]);

  const toggleConcern = (value: string) => {
    setSkinConcerns((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <div
        className="
          w-full max-w-[430px] mx-auto
          min-h-screen
          px-5 pt-3 pb-[50px]
          box-border
          relative
        "
      >
        {/* 상단 헤더 */}
        <header className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="
              border-0 bg-transparent
              cursor-pointer
              text-[20px]
              p-1
            "
          >
            ←
          </button>
          <div className="text-[16px] font-semibold">캠페인 신청</div>
          {/* 오른쪽 여백용 */}
          <div className="w-6" />
        </header>

        {/* 본인 인증 영역 */}
        <section className="mb-6">
          <h2 className="text-[20px] font-bold mb-1.5 mt-[30px]">
            본인 인증을 진행해 주세요
          </h2>
          <p className="text-[13px] text-[#666] mb-4">
            협업 진행을 위해 최초 1회 본인 인증이 필요해요.
          </p>

          <div className="flex items-center mb-3.5 text-[15px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={agreePersonal}
                onChange={() => setAgreePersonal(true)}
              />
              <span>개인정보 수집·이용 동의</span>
            </label>

            <button
              type="button"
              className="
                ml-auto
                border-0 bg-transparent
                text-[13px]
                underline
                cursor-pointer
                text-[#555]
              "
              onClick={() =>
                alert("약관 내용을 보여주는 모달을 연결해 주세요.")
              }
            >
              내용보기
            </button>
          </div>

          <button
            type="button"
            className={`
              w-1/2
              py-[13px]
              rounded-[8px]
              border-0
              text-[15px] font-semibold
              text-black
              cursor-pointer
              ${
                agreePersonal
                  ? "bg-[#AFFF33]"
                  : "bg-[#e2e2e2]"
              }
            `}
          >
            동의하고 인증하기
          </button>
        </section>

        {/* 캠페인 정보 확인 제목 */}
        <section className="mb-4">
          <div className="text-[15px] font-bold leading-[1.4]">
            신청하시는 캠페인의 정보를
            <br />
            다시 한 번 확인해 주세요.
          </div>
        </section>

        {/* 캠페인 정보 카드 */}
        <section
          className="
            rounded-[12px]
            border border-[#eee]
            p-[14px]
            mb-5
            bg-[#fafafa]
          "
        >
          {/* 상단 라인 */}
          <div className="flex items-center mb-2 gap-2">
            <div
              className="
                rounded
                border border-black
                px-2 py-1
                text-[11px]
              "
            >
              쇼츠
            </div>
          </div>

          <div className="text-[14px] font-bold mb-1 leading-[1.5]">
            [메디힐, 비플레인] 요즘 잘 쓰는 아이템 추천템 특집 캠페인명 두줄 일
            때
          </div>

          <div className="text-[13px] font-semibold mt-[10px] mb-1.5">
            제품 협찬
          </div>

          <ul className="text-[12px] leading-[1.7] text-[#444] pl-4 m-0 list-disc">
            <li>콘텐츠 등록 기간: 11/16(일) ~ 11/27(목)</li>
            <li>제품 발송·가이드 전달: 11/27(목)까지</li>
            <li>사전 검사 마감일: 11/27(목)까지</li>
            <li>캐시 지급일: 11/27(목)까지</li>
            <li>콘텐츠 유지 기간: 60일</li>
          </ul>
        </section>

        {/* 유의사항 */}
        <section className="mb-5">
          <h3 className="text-[14px] font-bold mb-2">유의사항</h3>

          <div
            className="
              rounded-[12px]
              border border-[#e5e5e5]
              p-[14px]
              text-[12px]
            "
          >
            {/* 상단 뱃지들 */}
            <div className="mb-2.5">
              <div className="flex items-center mb-1.5">
                <span
                  className="
                    px-2 py-1
                    rounded-full
                    bg-[#e7fbdc]
                    text-[11px]
                    mr-2
                  "
                >
                  ✅ 2차 활용
                </span>
                <span className="text-[12px] text-[#555]">
                  협업 영상이 상업적으로 활용될 수 있습니다.
                </span>
              </div>

              <div className="flex items-center">
                <span
                  className="
                    px-2 py-1
                    rounded-full
                    bg-[#e7fbdc]
                    text-[11px]
                    mr-2
                  "
                >
                  ✅ 클린본 제출
                </span>
                <span className="text-[12px] text-[#555]">
                  BGM, 효과음 등을 제거한 영상 제출이 필요합니다.
                </span>
              </div>
            </div>

            <ul className="text-[12px] leading-[1.7] pl-4 m-0 text-[#444] list-disc">
              <li>유튜브 제품 태그 필수</li>
              <li>추가 제공품 노출 필수</li>
              <li>협업금에 2차 활용 비용 포함</li>
            </ul>
          </div>
        </section>

        {/* 노출 시간 */}
        <section className="mb-6">
          <h3 className="text-[14px] font-bold mb-2">노출 시간</h3>
          <div
            className="
              rounded-[10px]
              border border-[#eee]
              text-[12px]
              px-3 py-[10px]
              text-[#555]
            "
          >
            메디힐 30초, 비플레인 30초 (총 60초)
          </div>
        </section>

        {/* 참여 정보 입력 */}
        <section className="mb-6">
          <h2 className="text-[16px] font-bold leading-[1.4] mb-4">
            캠페인 참여 시 필요한 정보를
            <br />
            입력해 주세요.
          </h2>

          {/* 컬러 선택 */}
          <div className="mb-4">
            <div className="text-[14px] font-semibold mb-2">
              협업 제품의 컬러를 선택해 주세요.
            </div>

            <label className="flex items-center text-[13px] mb-1.5 gap-1.5">
              <input
                type="radio"
                name="productColor"
                checked={productColor === "21호"}
                onChange={() => setProductColor("21호")}
              />
              <span>21호</span>
            </label>

            <label className="flex items-center text-[13px] gap-1.5">
              <input
                type="radio"
                name="productColor"
                checked={productColor === "22호"}
                onChange={() => setProductColor("22호")}
              />
              <span>22호</span>
            </label>
          </div>

          {/* 설명 문구 + 텍스트 입력 */}
          <div className="mb-[18px]">
            <p className="text-[14px] mb-1.5 mt-[30px]">
              <b>
                협업 콘텐츠는 브랜드에 귀속되며 마케팅 활동에 활용됩니다.
                단답형으로 응답해 주세요.
              </b>
            </p>
            <textarea
              rows={3}
              className="
                w-full
                rounded-[10px]
                border border-[#ddd]
                px-3 py-[10px]
                text-[13px]
                resize-none
                box-border
              "
              placeholder="예: 네, 동의합니다."
            />
          </div>
        </section>

        {/* 배송 정보 */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <h3 className="text-[14px] font-bold m-0">배송 정보</h3>
            <button
              type="button"
              className="
                ml-auto
                text-[11px]
                px-[10px] py-[4px]
                rounded-full
                border border-[#ddd]
                bg-white
                cursor-pointer
              "
              onClick={() =>
                alert("배송지 수정 페이지로 이동을 연결해 주세요.")
              }
            >
              수정하기
            </button>
          </div>

          {/* 회색 박스 + 인풋 2개 */}
          <div
            className="
              bg-[#f7f7f7]
              rounded-[14px]
              px-[14px] py-4
              flex flex-col gap-3
            "
          >
            <input
              type="text"
              defaultValue="서울시 강남구 언주로 726 두산빌딩"
              className="
                w-full
                bg-white
                border border-[#ddd]
                rounded-[10px]
                px-3 py-[10px]
                text-[13px]
                text-[#333]
                box-border
              "
            />

            <input
              type="text"
              defaultValue="3층 스튜디오 쉘위"
              className="
                w-full
                bg-white
                border border-[#ddd]
                rounded-[10px]
                px-3 py-[10px]
                text-[13px]
                text-[#333]
                box-border
              "
            />
          </div>
        </section>

        {/* 피부 타입 */}
        <section className="mb-5">
          <h3 className="text-[14px] font-bold mb-2">피부 타입</h3>

          <div className="flex flex-wrap gap-3 text-[13px]">
            {SKIN_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="skinType"
                  checked={skinType === type}
                  onChange={() => setSkinType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 피부 고민 */}
        <section className="mb-10">
          <div className="flex flex-col items-start mb-1.5 gap-[2px]">
            <h3 className="text-[14px] font-bold m-0">피부 고민</h3>
            <span className="text-[11px] text-[#888] mb-2.5">
              복수 선택이 가능해요.
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {SKIN_CONCERNS.map((c) => {
              const active = skinConcerns.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleConcern(c)}
                  className={`
                    rounded-full
                    px-3 py-[6px]
                    text-[12px]
                    cursor-pointer
                    ${
                      active
                        ? "border border-[#111] bg-[#111] text-white"
                        : "border border-[#ddd] bg-white text-[#333]"
                    }
                  `}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* 하단 고정 버튼 */}
      <div
        className="
          fixed left-0 bottom-0
          w-full
          px-3 py-[10px]
          bg-black/10
          backdrop-blur-sm
          box-border
          flex justify-center
          z-30
        "
      >
        <button
          type="button"
          onClick={() => router.push("/campaign-apply/step2")}
          className="
            w-full max-w-[430px]
            py-[14px]
            rounded-[8px]
            border-0
            bg-[#AFFF33]
            text-[15px] font-bold
            text-black
            cursor-pointer
          "
        >
          다음 페이지 &gt;
        </button>
      </div>
    </main>
  );
}
