import type { ButtonHTMLAttributes } from 'react';

/** 파란 배경에 흰 글자의 기본 버튼. 크기는 className(w-*, h-*)으로 지정 */
function Button({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`label-lg flex shrink-0 cursor-pointer items-center justify-center rounded-md bg-blue-400 p-[0.625rem] whitespace-nowrap text-(--color-text-inverse) ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
