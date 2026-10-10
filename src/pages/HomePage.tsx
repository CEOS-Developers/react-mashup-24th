import { useState } from "react";
import NavBar from "../components/NavBar";
import MyWallet from "../components/MyWallet";
import CardTransfer, { type TransferDraft } from "../components/CardTransfer";

const SEND_CURRENCIES = [{ code: "KRW", label: "대한민국 원" }];
const RECEIVE_CURRENCIES = [
  { code: "VND", label: "베트남 동" },
  { code: "SGD", label: "싱가포르 달러" },
  { code: "IDR", label: "인도네시아 루피아" },
];

// UI 확인용 임의 환율입니다. 실시간 시세가 아니며 1 KRW 기준입니다.
const MOCK_EXCHANGE_RATES: Record<string, number> = {
  VND: 19.03,
  SGD: 0.00095,
  IDR: 11.5,
};

// 임시 잔액입니다. API 연동 시 계좌 잔액 응답값으로 교체합니다.
const MOCK_WALLET_BALANCE = 10000;

function HomePage() {
  const [draft, setDraft] = useState<TransferDraft>({
    region: "overseas",
    fromCurrency: "KRW",
    toCurrency: "VND",
    sendAmount: "",
  });

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F6F8FB]">
      <main className="flex flex-1 flex-col items-center gap-gap-12 px-[20px] py-padding-wide">
        <MyWallet balance={MOCK_WALLET_BALANCE} />
        {/* API 연결 시 quote, 로딩/오류 상태, onSubmit을 전달합니다. */}
        <CardTransfer
          value={draft}
          onChange={setDraft}
          sendCurrencies={SEND_CURRENCIES}
          receiveCurrencies={RECEIVE_CURRENCIES}
          walletBalance={MOCK_WALLET_BALANCE.toLocaleString("ko-KR")}
          indicativeRate={MOCK_EXCHANGE_RATES[draft.toCurrency]}
        />
      </main>
      <NavBar />
    </div>
  );
}
export default HomePage;
