"use server";

export async function registerBusinessAccount(data: {
  shopName: string;
  ceoName: string;
  regNumber: string;
  bankName: string;
  accountNumber: string;
}) {
  // TODO: 실제 DB 저장 로직 구현
  console.log("Registering Business Account:", data);

  // 모의 지연
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 성공 응답 (실제 로직에 따라 분기 처리)
  return {
    success: true,
    message: "사업자 계좌가 등록되었습니다.",
  };
}
