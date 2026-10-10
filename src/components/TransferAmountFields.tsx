import CurrencyAmountField, {
  type CurrencyOption,
} from "./CurrencyAmountField";

interface TransferAmountFieldsProps {
  fromCurrency: string;
  toCurrency: string;
  sendAmount: string;
  receiveAmount: string;
  sendCurrencies: readonly CurrencyOption[];
  receiveCurrencies: readonly CurrencyOption[];
  onSendAmountChange: (amount: string) => void;
  onFromCurrencyChange?: (currency: string) => void;
  onToCurrencyChange?: (currency: string) => void;
  helperText?: string;
  variant?: "plain" | "card";
}

function TransferAmountFields({
  fromCurrency,
  toCurrency,
  sendAmount,
  receiveAmount,
  sendCurrencies,
  receiveCurrencies,
  onSendAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  helperText,
  variant = "plain",
}: TransferAmountFieldsProps) {
  return (
    <div className="flex w-full flex-col gap-gap-12">
      <CurrencyAmountField
        label="보내는 금액"
        currency={fromCurrency}
        currencies={sendCurrencies}
        value={sendAmount}
        onChange={onSendAmountChange}
        onCurrencyChange={onFromCurrencyChange}
        helperText={helperText}
        variant={variant}
      />
      <CurrencyAmountField
        label="받는 금액"
        currency={toCurrency}
        currencies={receiveCurrencies}
        value={receiveAmount}
        readOnly
        onCurrencyChange={onToCurrencyChange}
        variant={variant}
      />
    </div>
  );
}

export default TransferAmountFields;
