"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SubPageHeader from "@/app/components/common/SubPageHeader";

export default function MatchEditSkinPage() {
  const router = useRouter();

  // 상태 관리
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [personalColor, setPersonalColor] = useState("");
  const [skinType, setSkinType] = useState("");
  const [skinConcerns, setSkinConcerns] = useState<string[]>([]);
  const [hairType, setHairType] = useState("");

  // 토글 핸들러
  const toggleHobby = (hobby: string) => {
    setHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const toggleSkinConcern = (concern: string) => {
    setSkinConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
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
          {/* 취미 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">취미</h3>

            {/* 스포츠/액티비티 */}
            <div className="mb-3">
              <div className="text-[12px] text-[#999] mb-2">
                스포츠/액티비티
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "러닝",
                  "요가",
                  "필라테스",
                  "헬스",
                  "수영",
                  "골프",
                  "테니스",
                  "등산",
                  "캠핑",
                ].map((item) => {
                  const isSelected = hobbies.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleHobby(item)}
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
            </div>

            {/* 라이프 스타일 */}
            <div>
              <div className="text-[12px] text-[#999] mb-2">라이프 스타일</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "제빵",
                  "커피",
                  "요리",
                  "인테리어",
                  "사진",
                  "드로잉/미술",
                  "공연/전시",
                ].map((item) => {
                  const isSelected = hobbies.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleHobby(item)}
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
            </div>
          </section>

          {/* 퍼스널 컬러 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">퍼스널 컬러</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["봄웜", "여름쿨", "가을웜", "겨울쿨", "모름"].map((item) => (
                <label key={item} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="personalColor"
                    value={item}
                    checked={personalColor === item}
                    onChange={(e) => setPersonalColor(e.target.value)}
                    className={radioClass}
                  />
                  <span className="ml-2 text-[13px] text-[#333]">{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 피부 타입 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">피부 타입</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["복합성", "건성", "지성", "중성", "민감성"].map((item) => (
                <label key={item} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="skinType"
                    value={item}
                    checked={skinType === item}
                    onChange={(e) => setSkinType(e.target.value)}
                    className={radioClass}
                  />
                  <span className="ml-2 text-[13px] text-[#333]">{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 피부 고민 */}
          <section className="mb-8">
            <h3 className="mb-3 text-[14px] font-bold">피부 고민</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "트러블/흉터",
                "기미/잡티",
                "주름/탄력",
                "모공/피지",
                "미백",
                "속건조",
                "블랙헤드",
                "다크서클",
                "홍조",
              ].map((item) => {
                const isSelected = skinConcerns.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSkinConcern(item)}
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

          {/* 두피/모발 타입 */}
          <section className="mb-10">
            <h3 className="mb-3 text-[14px] font-bold">두피/모발 타입</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["복합성", "건성", "지성", "중성", "민감성"].map((item) => (
                <label key={item} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="hairType"
                    value={item}
                    checked={hairType === item}
                    onChange={(e) => setHairType(e.target.value)}
                    className={radioClass}
                  />
                  <span className="ml-2 text-[13px] text-[#333]">{item}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* 하단 "다음" 버튼 (Fixed) */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[530px] bg-white border-t border-[#f0f0f0] z-20">
          <button
            type="button"
            className="w-full h-[52px] text-[16px] font-bold text-black bg-[#AFFF33]"
            onClick={() => {
              router.push("/my-page/edit-match/step3");
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
