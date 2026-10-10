import type { ComponentPropsWithoutRef } from "react";

const VARIANT_STYLES = {
  blue: "bg-action-default",
  indigo: "bg-action-pressed",
};

const SIZE_STYLES = {
  lg: "w-[362px] h-(--unit-56) p-padding-large",
  md: "w-[322px] h-[50px] p-padding-medium",
  sm: "w-[232px] h-[50px] p-padding-medium",
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonVariant = "blue" | "indigo";
type ButtonSize = "lg" | "md" | "sm";

function Button({
  variant = "blue",
  size = "lg",
  type = "button",
  disabled = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  // disabled 가 참인지 거짓인지에 따라 스타일이 결정 됩니다. (거짓이면 위의 blue, indigo 참이면 회색 버튼으로 출력되며 버튼 기능이 막힙니다)
  const variantStyle = disabled
    ? "bg-action-disabled cursor-not-allowed"
    : `${VARIANT_STYLES[variant]} cursor-pointer`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex items-center justify-center gap-gap-small rounded-small text-body-1-bold text-text-inverse ${SIZE_STYLES[size]} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
