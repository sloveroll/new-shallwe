// app/my-page/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import ChannelLinkedCard from "../components/my-page/ChannelLinkedCard";

export default function MyPage() {
  const router = useRouter();
  const [marketingAgree, setMarketingAgree] = useState(false);

  return (
    <main className="bg-[#f5f5f5] pb-[50px]">
      <div className="bg-white px-5 pt-6 pb-4">
        {/* 1. 인사 영역 */}
        <section className="mb-4">
          <h1 className="text-[22px] leading-snug">
            <span className="font-extrabold">크리에이터님</span>
            <span className="ml-1 font-normal">, 반가워요!</span>
            <button
              type="button"
              onClick={() => router.push("./login")}
              className="ml-20 text-[13px] font-normal text-[#555]"
            >
              로그인
            </button>
          </h1>
        </section>

        {/* 2. 내 정보 카드 (연동/등록 전 상태) */}
        <section className="rounded-2xl bg-[#f0f0f0] px-4 py-3 mb-4">
          {/* 상단: 닉네임 + 내 정보 수정 */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/images/my-page/ic-userlogo.png"
                alt="creator"
                width={18}
                height={18}
              />
              <span className="text-[13px] font-semibold">eve2zzang</span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/my-page/edit-account")}
              className="text-[11px] font-semibold text-[#36b44c] underline underline-offset-2"
            >
              내 정보 수정
            </button>
          </div>

          {/* 하단: 이메일 / 연락처 / 주소 등 (아직 미입력 상태 예시) */}
          <div className="space-y-[4px] text-[12px] leading-[1.5] text-[#666]">
            <p>eve2zzang@gmail.com</p>
            <p className="text-[#aaa]">연락처 정보 입력 필요</p>
            <p className="text-[#aaa]">주소 정보 입력 필요</p>
          </div>
        </section>
      </div>

      <div className="px-5">
        <br></br>
        {/* 3. 채널별 연동 필요 카드 */}
        {/* 3. 연동된 채널 카드들 */}
        <ChannelLinkedCard
          platform="Youtube"
          nickname="후니의 vlog"
          items={[
            { label: "롱폼", desc: "레퍼런스 등록 후 협업이 가능해요." },
            { label: "쇼츠", desc: "협업에 참여하실 수 있어요." },
          ]}
        />

        <ChannelLinkedCard
          platform="Instagram"
          nickname="worldbesthyo"
          items={[
            { label: "릴스", desc: "연동된 채널 내 릴스 콘텐츠가 없어요." },
            { label: "피드", desc: "협업에 참여하실 수 있어요." },
          ]}
        />

        <ChannelLinkedCard
          platform="Blog"
          nickname="worldbesthyo"
          items={[
            { label: "블로그", desc: "블로그 협업에 참여하실 수 있어요." },
          ]}
        />

        <div className="-mx-5 h-2 bg-white mt-5" />

        {/* 4. 맞춤 정보 박스 */}
        <section className="rounded-2xl mt-6 mb-4 bg-white">
          <div className="rounded-2xl bg-white px-4 py-3">
            {/* 상단: 제목 + 버튼 */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">맞춤 정보</h2>
              <button
                type="button"
                onClick={() => router.push("/my-page/edit-match/step1")}
                className="text-[11px] text-[#8c8b8b] border-b"
              >
                맞춤 정보 등록
              </button>
            </div>

            {/* 아래 설명 텍스트 */}
            <div className="text-[12px] leading-[1.6] text-[#444]">
              <p className="mb-1">
                맞춤 정보를 등록하고, 선정 가능성을 높여보세요!
              </p>
              <p>나에게 적합한 제품도 받아볼 수 있어요.</p>
            </div>
          </div>
        </section>

        {/* 5. 설정 / 레퍼런스 / 마케팅 / FAQ / 로그아웃 리스트 */}
        <section className="rounded-2xl bg-white text-[14px] text-[#333] shadow-sm">
          {/* 유튜브 레퍼런스 */}
          <button
            type="button"
            onClick={() => router.push("/my-page/youtube-reference/register")}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span>유튜브 레퍼런스 등록</span>
            <span className="text-[16px] text-[#999]">&gt;</span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/my-page/youtube-reference/edit")}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span>유튜브 레퍼런스 수정</span>
            <span className="text-[16px] text-[#999]">&gt;</span>
          </button>

          <div className="h-[1px] bg-[#e2e2e2]" />

          {/* 마케팅 수신 동의 */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-left">
              <p>마케팅 수신 동의</p>
              <p className="mt-[2px] text-[11px] text-[#999]">
                캠페인 오픈 알림을 받을 수 있어요.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMarketingAgree((prev) => !prev)}
              className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors ${
                marketingAgree ? "bg-[#a5ff3f]" : "bg-[#d5d5d5]"
              }`}
            >
              <span
                className={`
                  absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow
                  transition-transform duration-150
                  ${marketingAgree ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </div>

          <div className="h-[1px] bg-[#e2e2e2]" />

          {/* FAQ */}
          <button
            type="button"
            onClick={() => router.push("/faq")}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span>FAQ</span>
            <span className="text-[16px] text-[#999]">&gt;</span>
          </button>

          <div className="h-[1px] bg-[#e2e2e2]" />

          {/* 로그아웃 (리스트 마지막 셀 형태) */}
          <button
            type="button"
            className="flex w-full items-center justify-between px-4 py-3 text-left"
            onClick={() => {
              // TODO: 실제 로그아웃 로직
            }}
          >
            <span className="text-[13px] font-semibold text-[#ff4b4b]">
              로그아웃
            </span>
          </button>
        </section>
      </div>

      

      {/* Footer (스크롤 아래 위치) */}
      <div className="bg-white px-5 pt-6 pb-16 mt-10">
        {/* 로고 */}
        <div className="mb-4">
          <img
            src="/images/scroll-logo.png"
            alt="Shallwe Logo"
            className="block w-[75px] h-auto"
          />
        </div>

        {/* 회사 정보 */}
        <div className="space-y-1 leading-relaxed text-[12px] text-[#777]">
          <p>상호 : 두산매거진</p>
          <p>주소 : 서울특별시 강남구 언주로 726 (논현동, 두산빌딩)</p>
          <p>대표 : 송현승 | 사업자등록번호 : 211-85-51635</p>
          <p>
            통신판매업신고번호 : 강남-15934호 |{" "}
            <span className="font-semibold text-[#555]">사업자정보확인</span>
          </p>
          <p>메일 : shallwe@doosan.com</p>
          <p>호스팅 : 케이티 클라우드 (KT Cloud)</p>
        </div>

        {/* 링크 */}
        <div className="mt-[18px] mb-[10px] text-[13px] font-medium text-[#333] flex flex-wrap items-center gap-2">
          <span>이용약관</span>
          <span className="text-[#ccc] mx-2">|</span>
          <span>개인정보 처리방침</span>
          <span className="text-[#ccc] mx-2">|</span>
          <span>광고/제휴문의</span>
        </div>

        {/* 카피라이트 */}
        <p className="m-0 text-[11px] text-[#999]">
          COPYRIGHT © DOOSAN MAGAZINE. INC. ALL RIGHTS RESERVED
        </p>
      </div>

      {/* 하단 고정 네비 */}
      <div
        className="
          fixed left-0 bottom-0
          z-[60]
          flex w-full justify-center
          border-t border-[#eee]
          bg-white
        "
      >
        <div className="w-full max-w-[530px]">
          <BottomNav />
        </div>
      </div>
    </main>
  );
}
