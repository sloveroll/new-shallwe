"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function MatchEditPage() {
  const router = useRouter();

  // 상태 관리
  const [job, setJob] = useState("");
  const [marriage, setMarriage] = useState("");
  const [children, setChildren] = useState("");
  const [petStatus, setPetStatus] = useState(""); // 'none' or 'exist'
  const [petTypes, setPetTypes] = useState<string[]>([]);

  const handlePetTypeToggle = (type: string) => {
    setPetStatus("exist");
    setPetTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handlePetNone = () => {
    setPetStatus("none");
    setPetTypes([]);
  };

  // SurveyRegisterClient와 동일한 라디오 스타일
  const radioClass = `
    appearance-none
    min-w-[18px] min-h-[18px] w-[18px] h-[18px]
    rounded-full
    border border-[#ddd]
    bg-white
    checked:bg-[#AFFF33]
    checked:border-[5px]
    checked:border-white
    checked:ring-1
    checked:ring-[#ddd]
    cursor-pointer
  `;

  return (
    <div className="bg-white min-h-screen flex flex-col relative text-[#222]">
      <div className="w-full max-w-[530px] mx-auto bg-white min-h-screen flex flex-col shadow-sm">
        {/* 상단 헤더 */}
        <SubPageHeader title="프로필 설정" />

        <div className="flex-1 px-5 pt-6 pb-32">
          {/* 타이틀 + 서브텍스트 */}
          <section className="mb-6">
            <h2 className="text-[20px] font-bold leading-snug mb-2">
              크리에이터님에 대해 알려주세요.
            </h2>
            <p className="text-[14px] text-[#666] leading-relaxed whitespace-pre-line">
              선정 가능성이 더 올라가고,{"\n"}나와 맞는 제품을 추천받을 수
              있어요.
            </p>
          </section>

          <hr className="border-t-[3px] border-[#f0f0f0] mb-8" />

          {/* 직업 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">직업 (크리에이터 외)</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["해당없음", "학생", "직장인", "주부", "기타"].map((item) => (
                <label key={item} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="job"
                    value={item}
                    checked={job === item}
                    onChange={(e) => setJob(e.target.value)}
                    className={radioClass}
                  />
                  <span className="ml-2 text-[13px] text-[#333]">{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 결혼 여부 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">결혼 여부</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["미혼", "기혼"].map((item) => (
                <label key={item} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="marriage"
                    value={item}
                    checked={marriage === item}
                    onChange={(e) => setMarriage(e.target.value)}
                    className={radioClass}
                  />
                  <span className="ml-2 text-[13px] text-[#333]">{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 자녀 유무 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">자녀 유무</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["자녀없음", "자녀있음"].map((item) => (
                <label key={item} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="children"
                    value={item}
                    checked={children === item}
                    onChange={(e) => setChildren(e.target.value)}
                    className={radioClass}
                  />
                  <span className="ml-2 text-[13px] text-[#333]">{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 반려동물 유무 */}
          <section className="mb-10">
            <h3 className="mb-3 text-[14px] font-bold">반려동물 유무</h3>
            <div className="flex flex-col gap-3">
              {/* 없음 (라디오) */}
              <label className="flex items-center cursor-pointer mb-1">
                <input
                  type="radio"
                  name="pet-status"
                  checked={petStatus === "none"}
                  onChange={handlePetNone}
                  className={radioClass}
                />
                <span className="ml-2 text-[13px] text-[#333]">없음</span>
              </label>

              {/* 종류 선택 (칩 스타일) - 사이즈 축소 */}
              <div className="flex flex-wrap gap-2 text-[14px]">
                {["강아지", "고양이", "기타"].map((label) => {
                  const isSelected = petTypes.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handlePetTypeToggle(label)}
                      className={`
                        rounded-full px-3 py-[7px] text-[12px] border transition-colors flex items-center gap-1
                        ${
                          isSelected
                            ? "bg-[#AFFF33] border-[#AFFF33] text-black font-bold"
                            : "bg-white border-[#ddd] text-[#333]"
                        }
                      `}
                    >
                      {label}
                      {isSelected && <span className="text-[10px]">✕</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* 하단 "다음" 버튼 (Fixed container constrained to max-w-[530px]) */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] bg-white border-t border-[#f0f0f0] z-20">
          <button
            type="button"
            className="w-full h-[52px] text-[16px] font-bold text-black bg-[#AFFF33]"
            onClick={() => {
              router.push("/my-page/edit-match/step2");
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
