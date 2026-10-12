import type { ComponentPropsWithoutRef } from "react";

import { CURRENCIES, type CurrencyCode } from "../constants/currencies";

const SIZE_STYLES = {
  sm: {
    icon: "w-5 h-5",
    gap: "gap-gap-8",
  },
  md: {
    icon: "w-6 h-6",
    gap: "gap-gap-8",
  },
  lg: {
    icon: "w-8 h-8",
    gap: "gap-gap-8",
  },
};

interface BadgeProps extends ComponentPropsWithoutRef<"div"> {
  currency: CurrencyCode;
  size?: "sm" | "md" | "lg";
}

function Badge({
  currency,
  size = "md",
  className = "",
  ...props
}: BadgeProps) {
  const currentSize = SIZE_STYLES[size];

  return (
    <div
      className={`inline-flex items-center ${currentSize.gap} ${className}`}
      {...props}
    >
      <img
        src={CURRENCIES[currency].flag}
        alt={`${currency} flag`}
        className={`${currentSize.icon} shrink-0 rounded-full object-cover ring-1 ring-border-default`}
      />
    </div>
  );
}

export default Badge;
