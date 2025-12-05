// app/my-collab/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

type Tab = "apply" | "progress" | "done";

export default function MyCollabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("apply");

  // 탭별 더미 데이터 (나중에 API 연동하면 여기만 교체)
  const applyList = [
    {
      id: 1,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "신청 확인",
      title: "아윤채 인리치 본딩 케어 크림",
      announceText: "선정자 발표: 11/17(월)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 2,
      platform: "youtube",
      typeLabel: "릴스",
      statusLabel: "신청 확인",
      title: "메디힐 수분 선세럼 체험단",
      announceText: "선정자 발표: 11/20(수)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 3,
      platform: "youtube",
      typeLabel: "영상",
      statusLabel: "신청 확인",
      title: "비플레인 진정 수분 크림 리뷰",
      announceText: "선정자 발표: 11/25(월)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 4,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "신청 확인",
      title: "닥터지 레드 블레미쉬 라인 체험",
      announceText: "선정자 발표: 12/01(월)까지",
      thumbnail: "/images/sample.png",
    },
  ];

  const progressList = [
    {
      id: 2,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "진행 중",
      title: "두 번째 캠페인 제목 예시",
      announceText: "콘텐츠 등록 마감: 11/27(목)까지",
      thumbnail: "/images/sample.png",
    },
    {
      id: 3,
      platform: "youtube",
      typeLabel: "쇼츠",
      statusLabel: "진행 중",
      title: "두 번째 캠페인 제목 예시",
      announceText: "콘텐츠 등록 마감: 11/27(목)까지",
      thumbnail: "/images/sample.png",
    },
  ];

  const doneList = [
    {
      id: 3,
      platform: "instagram",
      typeLabel: "릴스",
      statusLabel: "미선정",
      title: "리얼베리어, 믹순 12월 올리브영 세일 특집 A",
      thumbnail: "/images/sample.png",
    },
  ];

  const renderList = () => {
    if (activeTab === "apply") {
      return applyList.map((item) => (
        <CollabItemApply key={item.id} {...item} />
      ));
    }
    if (activeTab === "progress") {
      return progressList.map((item) => (
        <CollabItemProgress key={item.id} {...item} />
      ));
    }
    // done
    return doneList.map((item) => <CollabItemDone key={item.id} {...item} />);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        paddingBottom: 70,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          padding: "12px 12px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* 상단 탭 */}
        <section
          style={{
            borderBottom: "1px solid #eee",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              textAlign: "center",
            }}
          >
            <TabButton
              label="신청"
              active={activeTab === "apply"}
              onClick={() => setActiveTab("apply")}
            />
            <TabButton
              label="진행 중"
              active={activeTab === "progress"}
              onClick={() => setActiveTab("progress")}
            />
            <TabButton
              label="완료"
              active={activeTab === "done"}
              onClick={() => setActiveTab("done")}
            />
          </div>
        </section>

        {/* 리스트 영역 */}
        <section>{renderList()}</section>
      </div>

      {/* ✅ 하단 고정 네비 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          background: "#fff",
          borderTop: "1px solid #eee",
          zIndex: 60,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 430,
          }}
        >
          <BottomNav />
        </div>
      </div>
    </main>
  );
}

/* -----------------------------
   탭 버튼 컴포넌트
-------------------------------- */
type TabButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        padding: "12px 0",
        border: "none",
        background: "transparent",
        fontSize: 15,
        fontWeight: active ? 700 : 500,
        color: active ? "#000" : "#999",
        borderBottom: active ? "2px solid #000" : "2px solid transparent",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

/* -----------------------------
   리스트 아이템 - 신청 탭
-------------------------------- */
type BaseItemProps = {
  thumbnail: string;
  title: string;
  platform: string;
  typeLabel: string;
};

type ApplyItemProps = BaseItemProps & {
  statusLabel: string;
  announceText: string;
};

function CollabItemApply({
  thumbnail,
  title,
  platform,
  typeLabel,
  statusLabel,
  announceText,
}: ApplyItemProps) {
  const router = useRouter();

  return (
    <article
      style={{
        display: "flex",
        padding: "12px 0",
        borderBottom: "1px solid #f3f3f3",
      }}
    >
      {/* 썸네일 */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 8,
          overflow: "hidden",
          background: "#f5f5f5",
          marginRight: 12,
        }}
      >
        {/* 실제 이미지로 바꾸면 좋음 */}
        <img
          src={thumbnail}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 오른쪽 내용 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* 상단 플랫폼/타입 태그 */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>
            {platform === "youtube" ? "▶️" : "📷"}
          </span>
          <span
            style={{
              borderRadius: 4,
              border: "1px solid #000",
              padding: "2px 6px",
              fontSize: 11,
            }}
          >
            {typeLabel}
          </span>
        </div>

        {/* 제목 */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {title}
        </div>

        {/* 선정자 발표일 */}
        <div
          style={{
            fontSize: 11,
            color: "#666",
          }}
        >
          {announceText}
        </div>

        {/* 버튼 영역 */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 6,
          }}
        >
          {/* <button
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: "#AFFF33",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {statusLabel}
          </button> */}
          <button
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#fff",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            신청 취소
          </button>
          {/* 콘텐츠 등록 */}
          <button
            onClick={() => router.push("/my-collab/content-register")}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: "#AFFF33",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            콘텐츠 등록
          </button>
          <button
            onClick={() => router.push("/my-collab/survey-register")}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background: "#AFFF33",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            설문 등록
          </button>
        </div>
      </div>
    </article>
  );
}

/* -----------------------------
   리스트 아이템 - 진행 중 탭
-------------------------------- */
type ProgressItemProps = ApplyItemProps;

function CollabItemProgress(props: ProgressItemProps) {
  // 일단 신청과 거의 비슷하게
  return <CollabItemApply {...props} />;
}

/* -----------------------------
   리스트 아이템 - 완료 탭
-------------------------------- */
type DoneItemProps = BaseItemProps & {
  statusLabel: string; // "미선정" 같은 표시
};

function CollabItemDone({
  thumbnail,
  title,
  platform,
  typeLabel,
  statusLabel,
}: DoneItemProps) {
  return (
    <article
      style={{
        display: "flex",
        padding: "12px 0",
        borderBottom: "1px solid #f3f3f3",
      }}
    >
      {/* 썸네일 + 오버레이 */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 8,
          overflow: "hidden",
          background: "#ddd",
          marginRight: 12,
          position: "relative",
        }}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(0.2)",
            opacity: 0.9,
          }}
        />
        {/* 상태 오버레이 (예: 미선정) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {statusLabel}
        </div>
      </div>

      {/* 오른쪽 내용 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          justifyContent: "center",
        }}
      >
        {/* 플랫폼 / 타입 */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>
            {platform === "youtube" ? "▶️" : "📷"}
          </span>
          <span
            style={{
              borderRadius: 4,
              border: "1px solid #000",
              padding: "2px 6px",
              fontSize: 11,
            }}
          >
            {typeLabel}
          </span>
        </div>

        {/* 제목 */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {title}
        </div>
      </div>
    </article>
  );
}
