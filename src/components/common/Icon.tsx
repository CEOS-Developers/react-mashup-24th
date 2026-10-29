import type { CSSProperties } from 'react';

interface IconProps {
  src: string;
  /** 크기(size-*), 색(text-*), 방향(rotate-*)은 className으로 지정 */
  className?: string;
}

/** SVG를 마스크로 그려서 글자색(currentColor)을 입히는 아이콘. 같은 SVG를 색·방향만 바꿔 쓸 때 사용 */
function Icon({ src, className = '' }: IconProps) {
  const mask = `url("${src}") center / contain no-repeat`;
  const style: CSSProperties = { mask, WebkitMask: mask };

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={style}
    />
  );
}

export default Icon;
