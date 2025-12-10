// app/my-page/youtube-reference/edit/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RefVideo = {
  id: number;
  url: string;
  memo: string;
  date: string; // YYYY-MM-DD
};

export default function YoutubeReferenceEditPage() {
  const router = useRouter();

  // 더미 데이터 (나중에 API 연동 시 교체)
  const [longForm, setLongForm] = useState<RefVideo[]>([
    {
      id: 1,
      url: "https://www.youtube.com/watch?v=1-xyzvzoEQ",
      memo: "영상 스타일의 기획과 진행을 그대로 확인해 주세요.",
      date: "2025-11-10",
    },
    {
      id: 2,
      url: "https://www.youtube.com/watch?v=2-xyzvzoEQ",
      memo: "영상 스타일의 기획과 진행을 그대로 확인해 주세요.",
      date: "2025-11-10",
    },
  ]);

  const [collabVideos, setCollabVideos] = useState<RefVideo[]>([
    {
      id: 3,
      url: "https://www.youtube.com/watch?v=3-xyzvzoEQ",
      memo: "협업 완료된 영상 레퍼런스입니다.",
      date: "2025-11-10",
    },
    {
      id: 4,
      url: "https://www.youtube.com/watch?v=4-xyzvzoEQ",
      memo: "협업 완료된 영상 레퍼런스입니다.",
      date: "2025-11-10",
    },
  ]);

  const [shortForm, setShortForm] = useState<RefVideo[]>([
    {
      id: 5,
      url: "",
      memo: "",
      date: "",
    },
  ]);

  const [showCollab, setShowCollab] = useState(true);

  const handleChange = (
    kind: "long" | "short" | "collab",
    id: number,
    value: string
  ) => {
    const setter =
      kind === "long"
        ? setLongForm
        : kind === "short"
        ? setShortForm
        : setCollabVideos;

    setter((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              url: value,
            }
          : item
      )
    );
  };

  const handleRemove = (kind: "long" | "short" | "collab", id: number) => {
    const setter =
      kind === "long"
        ? setLongForm
        : kind === "short"
        ? setShortForm
        : setCollabVideos;

    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = (kind: "long" | "short") => {
    const setter = kind === "long" ? setLongForm : setShortForm;

    setter((prev) => [
      ...prev,
      {
        id: Date.now(),
        url: "",
        memo: "",
        date: "",
      },
    ]);
  };

  const handleSubmit = () => {
    // TODO: 실제 저장 API 연동
    console.log("롱폼:", longForm);
    console.log("협업 영상:", collabVideos);
    console.log("쇼츠:", shortForm);
    alert("유튜브 레퍼런스 저장하기 클릭");
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-[530px] mx-auto px-5 pt-4 pb-10 box-border flex-1">
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
            유튜브 레퍼런스 수정
          </h1>

          <div className="absolute right-0 w-[22px]" />
        </header>

        {/* 카드 영역 */}
        <div className="rounded-2xl bg-white">
          {/* 상단 설명 박스 */}
          <section className="mb-6 rounded-xl bg-[#f5f5f5] px-4 py-4">
            <h2 className="mb-2 text-[16px] font-bold leading-snug">
              추후 제작할 협업 영상과
              <br />
              최대한 유사한 영상을 등록해 주세요.
            </h2>

            <ul className="mt-2 space-y-1 text-[13px] text-[#555] leading-relaxed">
              <li>
                ● 레퍼런스 영상으로 광고주 니즈와의 적합성을 판단하고 협업 진행
                여부를 검토해요.
              </li>
              <li>
                ● 다양한 스타일의 영상을 등록할수록 선정될 가능성이 높아져요.
              </li>
              <li>
                ● 레퍼런스가 등록된 포맷의 캠페인에 참여할 수 있어요.
              </li>
              <li>
                ● 협업 완료 후 등록된 콘텐츠도 레퍼런스로 전환돼요.
              </li>
            </ul>
          </section>

          {/* 롱폼 섹션 */}
          <section className="mb-8">
            <h3 className="mb-1 text-[14px] font-semibold">
              롱폼 (브이로그 3, 리뷰 1)
            </h3>
            <p className="mb-3 text-[12px] text-[#777]">
              업로드 후 15일이 경과한 영상만 등록 가능해요.
            </p>

            {/* 롱폼 리스트 */}
            <div className="space-y-3">
              {longForm.map((item) => (
                <div key={item.id} className="rounded-[10px] border border-[#ddd] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <input
                      value={item.url}
                      onChange={(e) =>
                        handleChange("long", item.id, e.target.value)
                      }
                      placeholder="영상의 URL을 붙여 넣어주세요"
                      className="flex-1 border-none bg-transparent p-0 text-[14px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove("long", item.id)}
                      className="text-[14px] text-[#999]"
                    >
                      X
                    </button>
                  </div>
                  {item.memo && (
                    <p className="mt-1 text-[12px] text-[#777]">
                      {item.memo}
                    </p>
                  )}
                  {item.date && (
                    <p className="mt-1 text-right text-[11px] text-[#aaa]">
                      {item.date}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* 협업 영상 보기 토글 */}
            <div className="mt-5 border-t border-[#eee] pt-3">
              <button
                type="button"
                onClick={() => setShowCollab((prev) => !prev)}
                className="flex w-full items-center justify-between text-[14px] font-semibold"
              >
                <span>협업 영상 보기</span>
                <span>{showCollab ? "▲" : "▼"}</span>
              </button>

              {showCollab && (
                <div className="mt-3 space-y-3">
                  {collabVideos.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[10px] border border-[#ddd] px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          value={item.url}
                          onChange={(e) =>
                            handleChange("collab", item.id, e.target.value)
                          }
                          placeholder="영상의 URL을 붙여 넣어주세요"
                          className="flex-1 border-none bg-transparent p-0 text-[14px] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemove("collab", item.id)}
                          className="text-[14px] text-[#999]"
                        >
                          X
                        </button>
                      </div>
                      {item.memo && (
                        <p className="mt-1 text-[12px] text-[#777]">
                          {item.memo}
                        </p>
                      )}
                      {item.date && (
                        <p className="mt-1 text-right text-[11px] text-[#aaa]">
                          {item.date}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 롱폼 영상 추가 버튼 */}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => handleAdd("long")}
                className="flex items-center rounded-full border border-[#00b761] bg-[#f5fff9] px-4 py-2 text-[13px] font-semibold text-[#00b761]"
              >
                <span className="mr-2 text-[18px]">＋</span>
                영상 추가
              </button>
            </div>
          </section>

          {/* 쇼츠 섹션 */}
          <section className="mb-2">
            <h3 className="mb-1 text-[14px] font-semibold">
              쇼츠 (브이로그 0, 리뷰 0)
            </h3>
            <p className="mb-3 text-[12px] text-[#777]">
              업로드 후 15일이 경과한 영상 최소 2개를 등록해 주세요.
            </p>

            <div className="space-y-3">
              {shortForm.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[10px] border border-[#ddd] px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      value={item.url}
                      onChange={(e) =>
                        handleChange("short", item.id, e.target.value)
                      }
                      placeholder="영상의 URL을 붙여 넣어주세요"
                      className="flex-1 border-none bg-transparent p-0 text-[14px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove("short", item.id)}
                      className="text-[14px] text-[#999]"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 쇼츠 영상 추가 버튼 */}
            <div className="mt-4 mb-2 flex justify-center">
              <button
                type="button"
                onClick={() => handleAdd("short")}
                className="flex items-center rounded-full border border-[#00b761] bg-[#f5fff9] px-4 py-2 text-[13px] font-semibold text-[#00b761]"
              >
                <span className="mr-2 text-[18px]">＋</span>
                영상 추가
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* 하단 저장하기 버튼 */}
      <button
        type="button"
        className="w-full py-4 text-[16px] font-bold bg-[#AFFF33]"
        onClick={handleSubmit}
      >
        저장하기
      </button>
    </main>
  );
}
