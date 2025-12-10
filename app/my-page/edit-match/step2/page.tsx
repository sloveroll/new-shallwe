"use client";

import { useRouter } from "next/navigation";

export default function MatchEditSkinPage() {
  const router = useRouter();

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="w-full max-w-[530px] mx-auto px-5 pt-4 pb-10 box-border flex-1">
        {/* 상단 헤더 */}
        <header className="relative mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 text-[22px]"
          >
            ←
          </button>
          <div className="h-[22px]"></div>
          <div className="absolute right-0 w-[22px]" />
        </header>

        {/* 상단 진행바 (2단계 느낌으로 더 채운 막대) */}
        <div className="mb-6">
          <div className="flex w-full">
            <div className="h-[3px] bg-[#AFFF33] flex-1 rounded-full mr-1"></div>
            <div className="h-[3px] bg-[#AFFF33] flex-1 rounded-full ml-1"></div>
          </div>
        </div>

        {/* 피부 타입 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">피부 타입</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {["복합성", "건성", "지성", "중성", "민감성"].map((label) => (
              <label key={label} className="flex items-center gap-1">
                <input type="radio" name="skin-type" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 피부 고민 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">피부 고민</h3>
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

        {/* 두피/모발 타입 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">두피/모발 타입</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {["복합성", "건성", "지성", "중성", "민감성"].map((label) => (
              <label key={label} className="flex items-center gap-1">
                <input type="radio" name="hair-type" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 두피/모발 고민 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">두피/모발 고민</h3>
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

        {/* 바디 타입 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">바디 타입</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {["복합성", "건성", "지성", "중성", "민감성"].map((label) => (
              <label key={label} className="flex items-center gap-1">
                <input type="radio" name="body-type" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 바디 고민 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">바디 고민</h3>
          <div className="flex flex-wrap gap-2">
            {["건조/가려움", "트러블", "각질/닳살", "아토피", "색소 침착"].map(
              (label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-full border border-[#ccc] px-3 py-[6px] text-[12px]"
                >
                  {label}
                </button>
              )
            )}
          </div>
        </section>

        {/* 건강 고민 */}
        <section className="mb-6">
          <h3 className="mb-2 text-[14px] font-semibold">건강 고민</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "체중 관리",
              "수면/피로",
              "눈 건강",
              "간 건강",
              "장 건강",
              "면역력",
              "활력/에너지",
              "혈액 순환",
              "관절/뼈",
              "여성 건강",
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

        {/* 맞춤형 시딩 제품 받아보기 체크 */}
        <section className="mb-4">
          <label className="flex items-start gap-2 text-[13px]">
            <input
              type="checkbox"
              defaultChecked
              className="mt-[2px] w-4 h-4"
            />
            <div>
              <p className="font-semibold mb-[2px]">
                맞춤형 시딩 제품 받아보기
              </p>
              <p className="text-[12px] text-[#555]">
                내 타입과 고민에 적합한 시딩 제품이 준비되면 보내드려요{" "}
                <span className="underline">(개인정보 수집·이용 동의)</span>
              </p>
            </div>
          </label>
        </section>
      </div>

      {/* 하단 완료 버튼 */}
      <button
        type="button"
        className="w-full py-4 text-[16px] font-bold bg-[#AFFF33]"
        onClick={() => {
          // TODO: 저장 후 마이페이지로 이동 등
          // router.push("/my-page");
          alert("완료 클릭");
        }}
      >
        완료
      </button>
    </main>
  );
}
