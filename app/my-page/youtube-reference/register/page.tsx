"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function YoutubeReferencePage() {
  const router = useRouter();

  // 롱폼 / 쇼츠 URL 리스트 (UI용)
  const [longFormUrls, setLongFormUrls] = useState(["", ""]);
  const [shortFormUrls, setShortFormUrls] = useState(["", ""]);

  const handleChangeLong = (index: number, value: string) => {
    setLongFormUrls((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleChangeShort = (index: number, value: string) => {
    setShortFormUrls((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addLongForm = () => {
    setLongFormUrls((prev) => [...prev, ""]);
  };

  const addShortForm = () => {
    setShortFormUrls((prev) => [...prev, ""]);
  };

  const handleSubmit = () => {
    // TODO: 실제 등록 API 연동
    console.log("longFormUrls", longFormUrls);
    console.log("shortFormUrls", shortFormUrls);
    alert("유튜브 레퍼런스 등록하기 클릭!");
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="w-full max-w-[530px] mx-auto px-5 pt-4 box-border flex-1">
        {/* 헤더 */}
        <header className="relative mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 text-[22px]"
          >
            ←
          </button>

          <h1 className="text-[18px] font-bold text-center">
            유튜브 레퍼런스 등록
          </h1>

          <div className="absolute right-0 w-[22px]" />
        </header>

        {/* 내부 카드 영역 */}
        <div className="rounded-2xl bg-white px-5 py-6">
          {/* 상단 설명 */}
          <section className="mb-6">
            <h2 className="mb-2 text-[18px] font-bold leading-snug">
              추후 제작할 협업 영상과
              <br />
              최대한 유사한 영상을 등록해 주세요.
            </h2>

            <ul className="mt-3 space-y-1 text-[13px] text-[#555] leading-relaxed  bg-[#f7f7f7] px-2 py-4">
              <li>
                • 레퍼런스 영상으로 광고주 니즈와의 적합성을 판단하고 협업 진행
                여부를 검토해요.
              </li>
              <li>
                • 다양한 스타일의 영상을 등록할수록 선정될 가능성이 높아져요.
              </li>
              <li>
                • 레퍼런스가 등록된 포맷의 캠페인에 참여할 수 있어요.
              </li>
              <li>
                • 협업 완료 후 등록된 콘텐츠도 레퍼런스로 전환돼요.
              </li>
            </ul>
          </section>

          {/* 롱폼 섹션 */}
          <section className="mb-8">
            <h3 className="mb-1 text-[14px] font-semibold">
              롱폼 (브이로그 0, 리뷰 0)
            </h3>
            <p className="mb-3 text-[12px] text-[#777]">
              업로드 후 15일이 경과한 영상 최소 2개를 등록해 주세요.
            </p>

            <div className="space-y-2">
              {longFormUrls.map((url, idx) => (
                <input
                  key={idx}
                  placeholder="영상의 URL을 붙여 넣어주세요"
                  className="w-full rounded-[10px] border border-[#ddd] px-3 py-3 text-[14px]"
                  value={url}
                  onChange={(e) => handleChangeLong(idx, e.target.value)}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={addLongForm}
                className="flex items-center rounded-full border border-[#00b761] bg-[#f5fff9] px-4 py-2 text-[13px] font-semibold text-[#00b761]"
              >
                <span className="mr-2 text-[18px]">＋</span>
                영상 추가
              </button>
            </div>
          </section>

          {/* 쇼츠 섹션 */}
          <section>
            <h3 className="mb-1 text-[14px] font-semibold">
              쇼츠 (브이로그 0, 리뷰 0)
            </h3>
            <p className="mb-3 text-[12px] text-[#777]">
              업로드 후 15일이 경과한 영상 최소 2개를 등록해 주세요.
            </p>

            <div className="space-y-2">
              {shortFormUrls.map((url, idx) => (
                <input
                  key={idx}
                  placeholder="영상의 URL을 붙여 넣어주세요"
                  className="w-full rounded-[10px] border border-[#ddd] px-3 py-3 text-[14px]"
                  value={url}
                  onChange={(e) => handleChangeShort(idx, e.target.value)}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={addShortForm}
                className="flex items-center rounded-full border border-[#00b761] bg-[#f5fff9] px-4 py-2 text-[13px] font-semibold text-[#00b761]"
              >
                <span className="mr-2 text-[18px]">＋</span>
                영상 추가
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* 하단 전체폭 버튼 */}
      <button
        type="button"
        className="w-full py-4 text-[16px] font-bold bg-[#AFFF33]"
        onClick={handleSubmit}
      >
        등록하기
      </button>
    </main>
  );
}
