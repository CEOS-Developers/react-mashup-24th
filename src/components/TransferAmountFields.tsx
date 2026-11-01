import CurrencyAmountField from "./CurrencyAmountField";

interface TransferAmountFieldsProps {
  fromCurrency: string;
  toCurrency: string;
  sendAmount: string;
  receiveAmount: string;
  onSendAmountChange: (amount: string) => void;
  onFromCurrencyClick?: () => void;
  onToCurrencyClick?: () => void;
  helperText?: string;
  variant?: "plain" | "card";
}

function TransferAmountFields({
  fromCurrency,
  toCurrency,
  sendAmount,
  receiveAmount,
  onSendAmountChange,
  onFromCurrencyClick,
  onToCurrencyClick,
  helperText,
  variant = "plain",
}: TransferAmountFieldsProps) {
  return (
    <div className="flex w-full flex-col gap-gap-12">
      <CurrencyAmountField
        label="보내는 금액"
        currency={fromCurrency}
        value={sendAmount}
        onChange={onSendAmountChange}
        onCurrencyClick={onFromCurrencyClick}
        helperText={helperText}
        variant={variant}
      />
      <CurrencyAmountField
        label="받는 금액"
        currency={toCurrency}
        value={receiveAmount}
        readOnly
        onCurrencyClick={onToCurrencyClick}
        variant={variant}
      />
    </div>
  );
}

export default TransferAmountFields;
