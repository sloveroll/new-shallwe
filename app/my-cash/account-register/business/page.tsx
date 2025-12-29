import BusinessRegisterClient from "./BusinessRegisterClient";

export default function BusinessAccountRegisterPage() {
  // TODO: 필요한 경우 DB에서 초기 데이터를 가져오는 로직 추가
  const initialData = {
    shopName: "두산매거진",
    ceoName: "홍길동",
    regNumber: "436-29-00148",
    accountNumber: "123456789000",
  };

  return <BusinessRegisterClient initialData={initialData} />;
}
