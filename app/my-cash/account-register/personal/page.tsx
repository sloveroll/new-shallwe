import PersonalRegisterClient from "./PersonalRegisterClient";

export default async function PersonalAccountRegisterPage() {
  // TODO: 실제 DB에서 유저 정보 조회
  // const user = await db.query.users.findFirst(...)

  // Mock Data
  const initialData = {
    userName: "김르뷰",
    idNumber: "880101-1******",
  };

  return <PersonalRegisterClient initialData={initialData} />;
}
