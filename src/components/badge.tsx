import type { ComponentPropsWithoutRef } from "react";

import krwFlag from "../assets/flags/krw.png";
import sgdFlag from "../assets/flags/sgd.png";
import idrFlag from "../assets/flags/idr.png";
import vndFlag from "../assets/flags/vnd.png";

export const FLAG_IMAGES = {
  KRW: krwFlag,
  SGD: sgdFlag,
  IDR: idrFlag,
  VND: vndFlag,
} as const;

export type CurrencyType = keyof typeof FLAG_IMAGES;

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
  currency: CurrencyType;
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
        src={FLAG_IMAGES[currency]}
        alt={`${currency} flag`}
        className={`${currentSize.icon} shrink-0 radius-full object-cover`}
      />
    </div>
  );
}

export default Badge;