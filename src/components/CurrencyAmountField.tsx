import { useId } from "react";
import Badge, { FLAG_IMAGES, type CurrencyType } from "./Badge";

function isSupportedCurrency(currency: string): currency is CurrencyType {
  return Object.prototype.hasOwnProperty.call(FLAG_IMAGES, currency);
}

export interface CurrencyOption {
  code: string;
  label: string;
}

interface CurrencyAmountFieldProps {
  label: string;
  currency: string;
  currencies: readonly CurrencyOption[];
  value: string;
  onChange?: (value: string) => void;
  onCurrencyChange?: (currency: string) => void;
  readOnly?: boolean;
  error?: string;
  helperText?: string;
  variant?: "card" | "plain";
}

function CurrencyAmountField({
  label,
  currency,
  currencies,
  value,
  onChange,
  onCurrencyChange,
  readOnly = false,
  error,
  helperText,
  variant = "plain",
}: CurrencyAmountFieldProps) {
  const id = useId();
  return (
    <div
      className={`w-full ${variant === "card" ? "rounded-medium bg-surface-default p-padding-wide" : "px-padding-wide py-padding-medium"}`}
    >
      <div className="flex items-center gap-gap-8">
        <div className="flex shrink-0 items-center gap-gap-8">
          {isSupportedCurrency(currency) && (
            <Badge currency={currency} size="md" aria-hidden="true" />
          )}
          <select
            aria-label={`${label} 통화`}
            value={currency}
            onChange={(event) => onCurrencyChange?.(event.target.value)}
            disabled={!onCurrencyChange || currencies.length < 2}
            className="cursor-pointer bg-transparent text-body-1-semibold text-text-default disabled:cursor-default disabled:opacity-100"
          >
            {currencies.map((option) => (
              <option key={option.code} value={option.code} label={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-end gap-gap-4">
          <label
            htmlFor={id}
            className="text-title-1-semibold text-text-tertiary"
          >
            {label}
          </label>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            value={value}
            placeholder="0"
            readOnly={readOnly || !onChange}
            onChange={(event) =>
              onChange?.(event.target.value.replace(/[^0-9]/g, ""))
            }
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
