import { useState } from "react";
import NavBar from "../components/NavBar";
import MyWallet from "../components/MyWallet";
import CardTransfer, { type TransferDraft } from "../components/CardTransfer";
import CurrencySelectSheet from "../components/CurrencySelectSheet";
import { getMockRate } from "../mocks/exchangeRates";

// 임시 잔액입니다. API 연동 시 계좌 잔액 응답값으로 교체합니다.
const MOCK_WALLET_BALANCE = 10000;

function HomePage() {
  const [draft, setDraft] = useState<TransferDraft>({
    region: "overseas",
    fromCurrency: "KRW",
    toCurrency: "VND",
    sendAmount: "",
  });
  const [openSheet, setOpenSheet] = useState<"from" | "to" | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F6F8FB]">
      <main className="flex flex-1 flex-col items-center gap-gap-12 px-[20px] py-padding-wide">
        <MyWallet balance={MOCK_WALLET_BALANCE} />
        {/* API 연결 시 quote, 로딩/오류 상태, onSubmit을 전달합니다. */}
        <CardTransfer
          value={draft}
          onChange={setDraft}
          walletBalance={MOCK_WALLET_BALANCE.toLocaleString("ko-KR")}
          indicativeRate={getMockRate(draft.fromCurrency, draft.toCurrency)}
          onFromCurrencyClick={() => setOpenSheet("from")}
          onToCurrencyClick={() => setOpenSheet("to")}
        />
      </main>
      <NavBar />

      <CurrencySelectSheet
        open={openSheet === "from"}
        onClose={() => setOpenSheet(null)}
        title="보내는 국가 / 통화"
        value={draft.fromCurrency}
        onChange={(fromCurrency) => setDraft({ ...draft, fromCurrency })}
        disabledCurrencies={["VND"]}
      />
      <CurrencySelectSheet
        open={openSheet === "to"}
        onClose={() => setOpenSheet(null)}
        title="받는 국가 / 통화"
        value={draft.toCurrency}
        onChange={(toCurrency) => setDraft({ ...draft, toCurrency })}
        searchable
      />
    </div>
  );
}
export default HomePage;
