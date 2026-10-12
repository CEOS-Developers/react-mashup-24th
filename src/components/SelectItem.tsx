import type { ComponentPropsWithoutRef } from "react";
import Badge from "./Badge";
import type { CurrencyCode } from "../constants/currencies";

interface SelectItemProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  currency?: CurrencyCode;
  selected?: boolean;
}

// 선택 항목에만 보이는 체크 아이콘입니다.
function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 11.5L9.29541 15.2073C9.67766 15.6374 10.3431 15.6569 10.7499 15.2501L18 8"
        stroke="var(--icon-brand)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// currency 가 있으면 왼쪽에 국기가 붙고(국가/통화), 없으면 글자만 출력됩니다(은행).
// selected 면 파란 배경 + 체크, disabled 면 회색으로 출력되며 클릭이 막힙니다.
function SelectItem({
  label,
  currency,
  selected = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}: SelectItemProps) {
  const stateStyle = disabled
    ? "bg-surface-disabled text-text-disabled cursor-not-allowed"
    : selected
      ? "bg-surface-focused text-text-informative cursor-pointer"
      : "bg-surface-default text-text-default cursor-pointer";

  return (
    <button
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex h-(--unit-56) w-[362px] items-center gap-gap-8 rounded-small px-padding-medium py-padding-large text-left text-body-1-semibold ${stateStyle} ${className}`}
      {...props}
    >
      {currency && (
        <Badge
          currency={currency}
          size="lg"
          aria-hidden="true"
          className={disabled ? "opacity-40" : ""}
        />
      )}
      <span className="flex-1">{label}</span>
      {selected && !disabled && <CheckIcon />}
    </button>
  );
}

export default SelectItem;
