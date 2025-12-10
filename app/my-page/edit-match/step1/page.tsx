"use client";

import { useRouter } from "next/navigation";

export default function MatchEditPage() {
  const router = useRouter();

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="w-full max-w-[530px] mx-auto px-5 pt-4 pb-10 box-border flex-1">
        {/* 상단 헤더 (← + 중앙 제목) */}
        <header className="relative mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 text-[22px]"
          >
            ←
          </button>
          <div className="h-[22px]"></div> {/* 중앙 비우기 */}
          <div className="absolute right-0 w-[22px]" />
        </header>

        {/* 상단 진행바 */}
        <div className="mb-6">
          <div className="flex w-full">
            <div className="h-[3px] bg-[#AFFF33] flex-1 rounded-full mr-1"></div>
            <div className="h-[3px] bg-[#e5e5e5] flex-1 rounded-full ml-1"></div>
          </div>
        </div>

        {/* 타이틀 + 서브텍스트 */}
        <section className="mb-6">
          <h2 className="text-[20px] font-bold leading-snug mb-2">
            크리에이터님에 대해 알려주세요.
          </h2>
          <p className="text-[13px] text-[#555] leading-relaxed">
            선정 가능성이 더 올라가고, 나와 맞는 제품을 추천받을 수 있어요.
          </p>
        </section>

        {/* 직업 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">
            직업 (크리에이터 외)
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            <label className="flex items-center gap-1">
              <input type="radio" name="job" />
              <span>해당없음</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="job" />
              <span>학생</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="job" />
              <span>직장인</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="job" />
              <span>주부</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="job" />
              <span>기타</span>
            </label>
          </div>
        </section>

        {/* 결혼 여부 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">결혼 여부</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            <label className="flex items-center gap-1">
              <input type="radio" name="marriage" />
              <span>미혼</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="marriage" />
              <span>기혼</span>
            </label>
          </div>
        </section>

        {/* 자녀 유무 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">자녀 유무</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            <label className="flex items-center gap-1">
              <input type="radio" name="children" />
              <span>자녀없음</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="children" />
              <span>자녀있음</span>
            </label>
          </div>
        </section>

        {/* 반려동물 유무 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">반려동물 유무</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px] mb-3">
            <label className="flex items-center gap-1">
              <input type="radio" name="pet-own" />
              <span>없음</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="pet-own" />
              <span>있음</span>
            </label>
          </div>

          {/* 강아지/고양이/기타 체크박스 (빨간 박스 부분) */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            <label className="flex items-center gap-1">
              <input type="checkbox" name="pet-type-dog" />
              <span>강아지</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" name="pet-type-cat" />
              <span>고양이</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" name="pet-type-etc" />
              <span>기타</span>
            </label>
          </div>
        </section>

        {/* 취미 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">취미</h3>

          {/* 스포츠 / 액티비티 */}
          <div className="mb-3 text-[12px] text-[#777]">스포츠/액티비티</div>
          <div className="mb-4 flex flex-wrap gap-2">
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
            ].map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-full border border-[#ccc] px-3 py-[6px] text-[12px]"
              >
                {label}
              </button>
            ))}
          </div>

          {/* 라이프스타일 */}
          <div className="mb-3 text-[12px] text-[#777]">라이프스타일</div>
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              "제빵",
              "커피",
              "요리",
              "인테리어",
              "사진",
              "드로잉/미술",
              "공연/전시",
            ].map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-full border border-[#ccc] px-3 py-[6px] text-[12px]"
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* 퍼스널 컬러 */}
        <section className="mb-10">
          <h3 className="mb-2 text-[14px] font-semibold">퍼스널 컬러</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            <label className="flex items-center gap-1">
              <input type="radio" name="personal-color" />
              <span>봄웜</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="personal-color" />
              <span>여름쿨</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="personal-color" />
              <span>가을웜</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="personal-color" />
              <span>겨울쿨</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="personal-color" />
              <span>모름</span>
            </label>
          </div>
        </section>
      </div>

      {/* 하단 "다음" 버튼 */}
      <button
        type="button"
        className="w-full py-4 text-[16px] font-bold bg-[#AFFF33]"
        onClick={() => {
          router.push("/my-page/edit-match/step2");
        }}
      >
        다음
      </button>
    </main>
  );
}
