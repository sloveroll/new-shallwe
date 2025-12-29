// app/(my-home)/my-cash/withdraw/page.tsx
import WithdrawClient from "./WithdrawClient";

export const metadata = {
  title: "출금 신청 | My Cash",
};

export default function CashWithdrawPage() {
  // TODO: Fetch real data from DB/API
  const currentCash = 1_000_000;
  const withdrawableCash = 1_000_000;
  const withdrawAmount = 1_000_000; // 전액 출금 가정
  const taxAmount = 33_000; // 3.3% 가정
  const actualAmount = withdrawAmount - taxAmount;

  return (
    <WithdrawClient
      currentCash={currentCash}
      withdrawableCash={withdrawableCash}
      withdrawAmount={withdrawAmount}
      taxAmount={taxAmount}
      actualAmount={actualAmount}
    />
  );
}

