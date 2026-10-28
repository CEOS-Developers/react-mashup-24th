import { useId, useLayoutEffect, useRef } from "react";
import Badge from "./Badge";
import { isCurrencyCode } from "../constants/currencies";

interface CurrencyAmountFieldProps {
  label: string;
  currency: string;
  value: string;
  onChange?: (value: string) => void;
  // 통화 버튼을 눌렀을 때 실행됩니다. (국가/통화 선택 시트 열기) 없으면 버튼이 비활성화됩니다.
  onCurrencyClick?: () => void;
  readOnly?: boolean;
  error?: string;
  helperText?: string;
  variant?: "card" | "plain";
}

function CurrencyAmountField({
  label,
  currency,
  value,
  onChange,
  onCurrencyClick,
  readOnly = false,
  error,
  helperText,
  variant = "plain",
}: CurrencyAmountFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const caretDigitCount = useRef<number | null>(null);
  const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useLayoutEffect(() => {
    const digitCount = caretDigitCount.current;
    const input = inputRef.current;
    if (digitCount === null || !input) return;

    let position = 0;
    let digitsSeen = 0;
    while (position < formattedValue.length && digitsSeen < digitCount) {
      if (/\d/.test(formattedValue[position])) digitsSeen += 1;
      position += 1;
    }

    input.setSelectionRange(position, position);
    caretDigitCount.current = null;
  }, [formattedValue]);

  return (
    <div
      className={`w-full ${variant === "card" ? "rounded-medium bg-surface-default p-padding-wide" : "px-padding-wide py-padding-medium"}`}
    >
      <div className="flex items-center gap-gap-8">
        <button
          type="button"
          aria-label={`${label} 통화 선택, 현재 ${currency}`}
          aria-haspopup="dialog"
          onClick={onCurrencyClick}
          disabled={!onCurrencyClick}
          className="flex shrink-0 cursor-pointer items-center gap-gap-8 text-body-1-semibold text-text-default disabled:cursor-default"
        >
          {isCurrencyCode(currency) && (
            <Badge currency={currency} size="md" aria-hidden="true" />
          )}
          {currency}
          {onCurrencyClick && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.1428 4.126L5.55549 7.76188C5.6105 7.83657 5.67874 7.89652 5.75552 7.93762C5.8323 7.97872 5.91582 8 6.00033 8C6.08484 8 6.16835 7.97872 6.24514 7.93762C6.32192 7.89652 6.39016 7.83657 6.44517 7.76188L9.85787 4.126C10.1836 3.6835 9.91353 3 9.41303 3L2.58666 3C2.08615 3 1.81612 3.6835 2.1428 4.126Z"
                fill="var(--icon-default)"
              />
            </svg>
          )}
        </button>
        <div className="flex min-w-0 flex-1 flex-col items-end gap-gap-4">
          <label
            htmlFor={id}
            className="text-title-1-semibold text-text-tertiary"
          >
            {label}
          </label>
          <input
            ref={inputRef}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formattedValue}
            placeholder="0"
            readOnly={readOnly || !onChange}
            onChange={(event) => {
              const input = event.currentTarget;
              const cursor = input.selectionStart ?? input.value.length;
              caretDigitCount.current = input.value
                .slice(0, cursor)
                .replace(/\D/g, "").length;
              onChange?.(input.value.replace(/\D/g, ""));
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className="w-full bg-transparent text-right text-title-1-bold text-text-default outline-none"
          />
        </div>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-caption-1-semibold text-text-alert"
        >
          {error}
        </p>
      )}
      {!error && helperText && (
        <p
          id={`${id}-helper`}
          className="mt-2 text-right text-body-2-semibold text-text-informative"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
export default CurrencyAmountField;
