import ContentRegisterClient from "./ContentRegisterClient";

// 이는 서버 컴포넌트입니다.
// 필요한 경우 DB 접근 등의 비동기 작업을 수행하고 데이터를 Client Component로 전달할 수 있습니다.

export default async function ContentRegisterPage() {
  // 예시: const data = await fetchSomeData();

  return <ContentRegisterClient />;
}
