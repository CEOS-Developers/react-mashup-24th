import type { ComponentPropsWithoutRef } from "react";

interface HomeIconProps extends ComponentPropsWithoutRef<"svg"> {
  active?: boolean;
}

// active 가 참이면 채워진 파란 비행기, 거짓이면 회색 외곽선 비행기로 출력됩니다.
function HomeIcon({ active = false, ...props }: HomeIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      {active ? (
        <>
          <path
            d="M19.1748 2.06067C20.568 1.70669 21.8395 2.95768 21.5088 4.35657L17.7891 20.0909C17.4208 21.649 15.4171 22.0935 14.4248 20.837L10.8623 16.3263C10.2707 15.5772 10.3216 14.5063 10.9815 13.8165L13.9805 10.6808C14.2224 10.4279 14.2397 10.0348 14.0205 9.76184C13.7694 9.4491 13.3065 9.41191 13.0088 9.68079L9.6973 12.672C9.02045 13.2831 8.00684 13.3316 7.27445 12.7882L2.77445 9.45032C1.47933 8.48926 1.8804 6.45513 3.44339 6.05774L19.1748 2.06067Z"
            fill="var(--icon-brand)"
          />
          <circle
            cx="5.57796"
            cy="18.5286"
            r="3.25178"
            fill="var(--color-blue-100)"
          />
        </>
      ) : (
        <path
          d="M9.5 14L13.5857 19.6299C14.8731 21.4038 17.6384 20.9156 18.2405 18.8081L22.0182 5.58614C22.587 3.59553 20.7382 1.75926 18.7515 2.34156L4.27143 6.58571C2.58383 7.10498 2.2748 9.36066 3.76056 10.3147L9.5 14ZM9.5 14L13.5 10"
          stroke="var(--icon-default)"
          strokeWidth="1.97143"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default HomeIcon;
