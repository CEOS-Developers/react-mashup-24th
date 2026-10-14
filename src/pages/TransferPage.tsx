import { useState } from "react";
import { Navigate } from "react-router";
import Header from "../components/Header";
import ExchangeRate from "../components/ExchangeRate";
import TransferAmountFields from "../components/TransferAmountFields";
import CurrencySelectSheet from "../components/CurrencySelectSheet";
import { getMockQuote, getMockRate } from "../mocks/exchangeRates";
import {
  useTransferStore,
  type TransferInfo,
} from "../stores/useTransferStore";
import { PATHS } from "../routes/paths";
import {
  MIN_SEND_AMOUNT_MESSAGE,
  isBelowMinimum,
} from "../utils/transferAmount";

type TransferInput = Pick<
  TransferInfo,
  "fromCurrency" | "toCurrency" | "sendAmount"
>;

// 송금액 입력 및 받는 방법 선택 페이지 (W-2)
function TransferPage() {
  // 홈에서 송금하기를 눌렀을 때 저장한 송금 정보입니다. 이 페이지에서 바꾸면 바로 store 에 반영됩니다.
  const transfer = useTransferStore((state) => state.transfer);
  const setTransfer = useTransferStore((state) => state.setTransfer);
  const [openSheet, setOpenSheet] = useState<"from" | "to" | null>(null);

  // 홈을 거치지 않고 들어오면 송금 정보가 없으므로 홈으로 돌려보냅니다.
  if (!transfer) return <Navigate to={PATHS.HOME} replace />;

  // 금액·통화가 바뀌면 환율과 받는 금액을 다시 계산해서 store 에 저장합니다.
  const updateTransfer = (patch: Partial<TransferInput>) => {
    const next = { ...transfer, ...patch };
    const quote = getMockQuote({ region: "overseas", ...next });
    setTransfer({
      ...next,
      rate: getMockRate(next.fromCurrency, next.toCurrency) ?? next.rate,
      receiveAmount: quote?.receiveAmount ?? "",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F6F8FB]">
      <Header>
        <ExchangeRate
          fromCurrency={transfer.fromCurrency}
          toCurrency={transfer.toCurrency}
          rate={transfer.rate}
        />
      </Header>

      <main className="flex w-[402px] flex-1 flex-col items-center gap-gap-12 px-[20px] py-padding-wide">
        <TransferAmountFields
          variant="card"
          fromCurrency={transfer.fromCurrency}
          toCurrency={transfer.toCurrency}
          sendAmount={transfer.sendAmount}
          receiveAmount={transfer.receiveAmount}
          onSendAmountChange={(sendAmount) => updateTransfer({ sendAmount })}
          onFromCurrencyClick={() => setOpenSheet("from")}
          onToCurrencyClick={() => setOpenSheet("to")}
          helperText={
            isBelowMinimum(transfer.fromCurrency, transfer.sendAmount)
              ? MIN_SEND_AMOUNT_MESSAGE
              : undefined
          }
        />
        {/* 받는 방법 탭 + 카드 */}
      </main>

      {/* 하단 확인 버튼 */}

      <CurrencySelectSheet
        open={openSheet === "from"}
        onClose={() => setOpenSheet(null)}
        title="보내는 국가 / 통화"
        value={transfer.fromCurrency}
        onChange={(fromCurrency) => updateTransfer({ fromCurrency })}
        disabledCurrencies={["VND"]}
      />
      <CurrencySelectSheet
        open={openSheet === "to"}
        onClose={() => setOpenSheet(null)}
        title="받는 국가 / 통화"
        value={transfer.toCurrency}
        onChange={(toCurrency) => updateTransfer({ toCurrency })}
        searchable
      />
    </div>
  );
}

export default TransferPage;
