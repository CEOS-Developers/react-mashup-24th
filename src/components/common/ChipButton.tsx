import type { ButtonHTMLAttributes, ReactNode } from 'react';
import iconFilter from '../../assets/icons/icon-filter.svg';

export type ChipButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> & {
  children: ReactNode;
  checked?: boolean;
  selected?: boolean;
  pressed?: boolean;
  withIcon?: boolean;
  icon?: string;
};

function ChipButton({
  children,
  checked,
  selected = false,
  pressed = false,
  icon,
  withIcon = icon !== undefined,
  type = 'button',
  disabled = false,
  className = '',
  ...buttonProps
}: ChipButtonProps) {
  const isCheckedChip = checked !== undefined;
  const isPressed = pressed && !disabled;
  const sizeClassName = isCheckedChip ? 'h-7 px-3' : withIcon ? 'h-8 gap-1 px-2' : 'h-8 px-3';
  const stateClassName = isCheckedChip
    ? checked
      ? 'bg-bg-neutral-solid text-fg-brand-default'
      : 'bg-bg-neutral-subtle text-fg-neutral-default'
    : selected
      ? `bg-bg-brand-subtle text-fg-neutral-default ${isPressed ? 'scale-95' : ''}`
      : `${isPressed ? 'bg-bg-neutral-subtle-pressed' : 'bg-bg-neutral-subtle'} text-fg-neutral-default`;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      aria-pressed={isCheckedChip ? checked : selected}
      data-pressed={isPressed}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full text-center typo-button-medium-md transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none ${sizeClassName} ${stateClassName} ${className}`}
    >
      {!isCheckedChip && withIcon && (
        <img src={icon ?? iconFilter} alt="" className="size-3 shrink-0" />
      )}
      {children}
    </button>
  );
}

export default ChipButton;
