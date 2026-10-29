import type { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

function IconButton({ label, className = '', children, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex shrink-0 cursor-pointer items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
