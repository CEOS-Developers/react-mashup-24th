import type { ComponentPropsWithoutRef } from "react";

function Wallet(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M2 6.98806C2 6.10484 2.57934 5.3262 3.4253 5.07241L14.4253 1.77241C15.7085 1.38744 17 2.34834 17 3.68806V14.9634C17 15.8695 16.3908 16.6624 15.5153 16.8959L4.51533 19.8292C3.24563 20.1678 2 19.2108 2 17.8968V6.98806Z"
        fill="#004FC9"
      />
      <rect x="2" y="6" width="19" height="15" rx="2" fill="#3E87FF" />
      <circle cx="17.5" cy="13.5" r="1.5" fill="#FEFFFF" />
    </svg>
  );
}

export default Wallet;
