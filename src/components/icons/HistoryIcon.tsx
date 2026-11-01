import type { ComponentPropsWithoutRef } from "react";

interface HistoryIconProps extends ComponentPropsWithoutRef<"svg"> {
  active?: boolean;
}

// active 가 참이면 채워진 파란 문서, 거짓이면 회색 외곽선 문서로 출력됩니다.
function HistoryIcon({ active = false, ...props }: HistoryIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      {active ? (
        <>
          <path
            d="M6 2H15.4466C16.1718 2 16.8725 2.26273 17.419 2.73956L20.9724 5.84019C21.6253 6.40991 22 7.23411 22 8.10063V19C22 20.6569 20.6569 22 19 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34314 2 6 2Z"
            fill="var(--icon-brand)"
          />
          <path
            d="M8 11H14.8215"
            stroke="var(--icon-bright)"
            strokeWidth="1.81905"
            strokeLinecap="round"
          />
          <path
            d="M8 14.6382H11.6381"
            stroke="var(--icon-bright)"
            strokeWidth="1.81905"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M6 2.91016H15.4463C15.9514 2.91016 16.4397 3.09285 16.8203 3.4248L20.374 6.52539C20.8289 6.92228 21.0898 7.49692 21.0898 8.10059V19C21.0898 20.1543 20.1543 21.0898 19 21.0898H6C4.84572 21.0898 3.91016 20.1543 3.91016 19V5C3.91016 3.84572 4.84573 2.91016 6 2.91016Z"
            stroke="var(--icon-default)"
            strokeWidth="1.82"
            strokeLinecap="round"
          />
          <path
            d="M8 11H14.8215"
            stroke="var(--icon-default)"
            strokeWidth="1.81905"
            strokeLinecap="round"
          />
          <path
            d="M8 14.6382H11.6381"
            stroke="var(--icon-default)"
            strokeWidth="1.81905"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default HistoryIcon;
