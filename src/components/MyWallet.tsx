import type { ComponentPropsWithoutRef } from "react";

interface MyWalletProps extends ComponentPropsWithoutRef<"div"> {
  balance: number;
  onCharge?: () => void;
  onWithdraw?: () => void;
}

function MyWallet({
  balance,
  onCharge,
  onWithdraw,
  className = "",
  ...props
}: MyWalletProps) {
  return (
    <div
      className={`flex w-[362px] shrink-0 flex-col items-start justify-center self-stretch rounded-medium bg-surface-default p-padding-wide ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between self-stretch px-padding-small">
        <div className="flex flex-col gap-gap-small">
          <span className="text-body-2-semibold text-text-secondary">월렛</span>
          <span className="text-title-1-bold text-text-default">
            {balance.toLocaleString("ko-KR")}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-gap-medium self-stretch">
        <button
          type="button"
          onClick={onCharge}
          className="cursor-pointer text-body-5-semibold text-text-secondary"
        >
          충전
        </button>
        <div className="h-[18px] w-px bg-surface-disabled" />
        <button
          type="button"
          onClick={onWithdraw}
          className="cursor-pointer text-body-5-semibold text-text-secondary"
        >
          출금
        </button>
      </div>
    </div>
  );
}

export default MyWallet;
