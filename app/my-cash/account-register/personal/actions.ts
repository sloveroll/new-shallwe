"use server";

export interface PersonalAccountData {
  bankName: string;
  accountNumber: string;
  userName: string;
  idNumber: string;
}

export async function registerPersonalAccount(data: PersonalAccountData) {
  // TODO: 실제 DB 저장 로직 구현
  // 예: await db.insert(accounts).values(data);
  
  console.log("Server Action Called:", data);

  // 임시 딜레이 (네트워크 요청 흉내)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "계좌 등록이 완료되었습니다.",
  };
}
