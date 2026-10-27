import { useEffect, useId } from "react";
import SelectItem from "./SelectItem";
import SearchIcon from "./icons/SearchIcon";
import {
  CURRENCIES,
  CURRENCY_CODES,
  type CurrencyCode,
} from "../constants/currencies";

interface CurrencySelectSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  value: string;
  onChange: (currency: CurrencyCode) => void;
  disabledCurrencies?: readonly CurrencyCode[];
  searchable?: boolean;
}

// 아래에서 올라오는 국가/통화 선택 시트입니다. 어두운 배경을 누르거나 ESC 를 누르면 닫힙니다.
// 항목을 누르면 onChange 로 통화를 넘기고, value 와 같은 항목이 파란색으로 표시됩니다.
// searchable 이면 제목 아래에 검색창이 보입니다. (검색 필터 기능은 아직 미구현)
function CurrencySelectSheet({
  open,
  onClose,
  title,
  value,
  onChange,
  disabledCurrencies = [],
  searchable = false,
}: CurrencySelectSheetProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex min-h-[356px] w-[402px] animate-[recipient-sheet-rise_240ms_ease-out] flex-col items-center rounded-t-large bg-surface-default px-[20px] pb-[40px] motion-reduce:animate-none"
      >
        <h2
          id={titleId}
          className="flex justify-center self-stretch py-(--unit-20) text-body-1-bold text-text-default"
        >
          {title}
        </h2>
        {searchable && (
          <label className="mb-(--unit-16) flex h-(--unit-36) w-[362px] items-start gap-gap-8 border-b border-border-default">
            <span className="flex h-6 items-center">
              <SearchIcon aria-hidden="true" />
            </span>
            <input
              type="search"
              placeholder="국가명, 통화 검색"
              aria-label="국가명, 통화 검색"
              className="min-w-0 flex-1 bg-transparent text-body-1-semibold text-text-default outline-none placeholder:text-text-disabled"
            />
          </label>
        )}
        <ul className="flex flex-col gap-gap-4">
          {CURRENCY_CODES.map((code) => (
            <li key={code}>
              <SelectItem
                currency={code}
                label={`${CURRENCIES[code].country} / ${code}`}
                selected={code === value}
                disabled={disabledCurrencies.includes(code)}
                onClick={() => onChange(code)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CurrencySelectSheet;
