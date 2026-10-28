import type { ButtonHTMLAttributes } from 'react';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

function ActionButton({
  variant = 'primary',
  type = 'button',
  className = '',
  ...buttonProps
}: ActionButtonProps) {
  const variantClassName =
    variant === 'primary'
      ? 'bg-bg-brand-default text-fg-brand-contrast'
      : 'bg-bg-neutral-subtle text-fg-neutral-default';

  return (
    <button
      {...buttonProps}
      type={type}
      className={`flex h-12 flex-1 cursor-pointer items-center justify-center rounded-medium typo-button-large-md disabled:cursor-not-allowed disabled:opacity-50 ${variantClassName} ${className}`}
    />
  );
}

export default ActionButton;
