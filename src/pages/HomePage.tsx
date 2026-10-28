import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import MyWallet from "../components/w1/MyWallet";
import CardTransfer, {
  type TransferDraft,
  type TransferQuote,
} from "../components/w1/CardTransfer";
import CurrencySelectSheet from "../components/CurrencySelectSheet";
import { getQuoteFromExchangeRate } from "../utils/exchangeRate";
import { useTransferStore } from "../stores/useTransferStore";
import { PATHS } from "../routes/paths";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { getLatestRemittance } from "../apis/remittance";
import { isCurrencyCode } from "../constants/currencies";

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
  const setTransfer = useTransferStore((state) => state.setTransfer);
  const navigate = useNavigate();
  const hasEditedDraft = useRef(false);

  const handleDraftChange = (next: TransferDraft) => {
    hasEditedDraft.current = true;
    setDraft(next);
  };

  useEffect(() => {
    const controller = new AbortController();
    getLatestRemittance(controller.signal)
      .then((history) => {
        if (
          controller.signal.aborted ||
          hasEditedDraft.current ||
          !history.hasHistory
        ) {
          return;
        }
        const fromCurrency = history.send.currency;
        const toCurrency = history.receive.currency;
        // 현재 보내는 통화는 KRW 만 지원합니다.
        if (fromCurrency !== "KRW" || !isCurrencyCode(toCurrency)) return;
        setDraft((current) => ({ ...current, fromCurrency, toCurrency }));
      })
      .catch(() => {
        // 최근 이력은 기본값 설정용입니다. 조회 실패 시 기존 카드로 송금할 수 있습니다.
      });
    return () => controller.abort();
  }, []);

  const { data: exchangeRate } = useExchangeRate(
    draft.fromCurrency,
    draft.toCurrency,
  );
  // 받는 금액은 환율 API 의 rate 로 계산합니다. (불러오는 중이거나 실패하면 견적 없음 → 0 표시, 송금하기 비활성)
  const quote = getQuoteFromExchangeRate(draft, exchangeRate);

  // 송금 정보를 전역 상태에 저장하고 다음 화면으로 이동합니다.
  const handleSubmit = (
    submitted: TransferDraft,
    submittedQuote?: TransferQuote,
  ) => {
    if (!submittedQuote) return;
    setTransfer({
      fromCurrency: submitted.fromCurrency,
      toCurrency: submitted.toCurrency,
      rate: submittedQuote.rate,
      sendAmount: submitted.sendAmount,
      receiveAmount: submittedQuote.receiveAmount,
    });
    navigate(PATHS.TRANSFER);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F6F8FB]">
      <main className="flex flex-1 flex-col items-center gap-gap-12 px-[20px] py-padding-wide">
        <MyWallet balance={MOCK_WALLET_BALANCE} />
        {/* API 연결 시 quote, 로딩/오류 상태, onSubmit을 전달합니다. */}
        <CardTransfer
          value={draft}
          onChange={handleDraftChange}
          walletBalance={MOCK_WALLET_BALANCE.toLocaleString("ko-KR")}
          quote={quote}
          exchangeRate={exchangeRate}
          // 해외일 때만 송금하기를 활성화합니다.
          onSubmit={draft.region === "overseas" ? handleSubmit : undefined}
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
        onChange={(fromCurrency) => handleDraftChange({ ...draft, fromCurrency })}
        disabledCurrencies={["VND", "SGD", "IDR"]}
      />
      <CurrencySelectSheet
        open={openSheet === "to"}
        onClose={() => setOpenSheet(null)}
        title="받는 국가 / 통화"
        value={draft.toCurrency}
        onChange={(toCurrency) => handleDraftChange({ ...draft, toCurrency })}
        searchable
      />
    </div>
  );
}
export default HomePage;
