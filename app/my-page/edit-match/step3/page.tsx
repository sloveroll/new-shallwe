"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function MatchEditStep3Page() {
  const router = useRouter();

  // 상태 관리
  const [scalpConcerns, setScalpConcerns] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState("");
  const [bodyConcerns, setBodyConcerns] = useState<string[]>([]);
  const [healthConcerns, setHealthConcerns] = useState<string[]>([]);
  const [seedingAgree, setSeedingAgree] = useState(true);

  // 토글 핸들러 (다중 선택)
  const toggleSelection = (
    item: string,
    state: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // 스타일 클래스 (Step 1 참고)
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
          {/* 두피/모발 고민 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">두피/모발 고민</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "손상모",
                "비듬/각질",
                "가려움",
                "탈모",
                "엉킴/정전기",
                "볼륨/탄력",
                "유분/기름기",
                "건조/푸석",
                "열감/트러블",
                "윤기/광채",
              ].map((item) => {
                const isSelected = scalpConcerns.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleSelection(item, scalpConcerns, setScalpConcerns)
                    }
                    className={`
                      rounded-full px-3 py-[7px] text-[12px] border transition-colors flex items-center gap-1
                      ${
                        isSelected
                          ? "bg-[#AFFF33] border-[#AFFF33] text-black font-bold"
                          : "bg-white border-[#ddd] text-[#333]"
                      }
                    `}
                  >
                    {item}
                    {isSelected && <span className="text-[10px]">✕</span>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 바디 타입 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">바디 타입</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["복합성", "건성", "지성", "중성", "민감성"].map((item) => (
                <label key={item} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="bodyType"
                    value={item}
                    checked={bodyType === item}
                    onChange={(e) => setBodyType(e.target.value)}
                    className={radioClass}
                  />
                  <span className="ml-2 text-[13px] text-[#333]">{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 바디 고민 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">바디 고민</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "건조/가려움",
                "트러블",
                "각질/닭살",
                "아토피",
                "색소 침착",
              ].map((item) => {
                const isSelected = bodyConcerns.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleSelection(item, bodyConcerns, setBodyConcerns)
                    }
                    className={`
                        rounded-full px-3 py-[7px] text-[12px] border transition-colors flex items-center gap-1
                        ${
                          isSelected
                            ? "bg-[#AFFF33] border-[#AFFF33] text-black font-bold"
                            : "bg-white border-[#ddd] text-[#333]"
                        }
                      `}
                  >
                    {item}
                    {isSelected && <span className="text-[10px]">✕</span>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 건강 고민 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">건강 고민</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "체중관리",
                "수면/피로",
                "눈 건강",
                "간 건강",
                "장 건강",
                "면역력",
                "활력/에너지",
                "혈액 순환",
                "관절/뼈",
                "여성 건강",
              ].map((item) => {
                const isSelected = healthConcerns.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleSelection(item, healthConcerns, setHealthConcerns)
                    }
                    className={`
                      rounded-full px-3 py-[7px] text-[12px] border transition-colors flex items-center gap-1
                      ${
                        isSelected
                          ? "bg-[#AFFF33] border-[#AFFF33] text-black font-bold"
                          : "bg-white border-[#ddd] text-[#333]"
                      }
                    `}
                  >
                    {item}
                    {isSelected && <span className="text-[10px]">✕</span>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 구분선 및 시딩 섹션 */}
          <div>
            <div className="h-2 bg-[#f5f5f5] -mx-5 mb-6"></div>
            <section className="mb-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={seedingAgree}
                  onChange={(e) => setSeedingAgree(e.target.checked)}
                  className="mt-[3px] w-4 h-4 accent-[#AFFF33]"
                />
                <div>
                  <p className="font-bold mb-1 text-[#222] text-[14px]">
                    맞춤형 시딩 제품 받아보기
                  </p>
                  <p className="text-[13px] text-[#666] leading-snug">
                    내 타입과 고민에 적합한 시딩 제품이 준비되면 보내드려요.
                  </p>
                  <p className="text-[12px] text-[#aaa] underline mt-2 block">
                    개인정보 수집 이용 동의
                  </p>
                </div>
              </label>
            </section>
          </div>
        </div>

        {/* 하단 "완료" 버튼 (Fixed) */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] bg-white border-t border-[#f0f0f0] z-20">
          <button
            type="button"
            className="w-full h-[52px] text-[16px] font-bold text-black bg-[#AFFF33]"
            onClick={() => {
              // TODO: 최종 저장 로직
              router.push("/my-page");
            }}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
