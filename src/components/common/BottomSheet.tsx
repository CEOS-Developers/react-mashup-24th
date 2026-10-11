import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import iconClose from '../../assets/icons/icon-close.svg';

export type BottomSheetSize = 'small' | 'large';

export type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: BottomSheetSize;
  children: ReactNode;
};

function BottomSheet({ open, onClose, title, size = 'small', children }: BottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || (!open && !dialog.open)) return;

    if (open && !dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const hiddenFrame = { transform: 'translateY(10%)', opacity: 0 };
    const visibleFrame = { transform: 'translateY(0)', opacity: 1 };
    const animation = dialog.animate(
      open ? [hiddenFrame, visibleFrame] : [visibleFrame, hiddenFrame],
      {
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200,
        easing: open ? 'ease-out' : 'ease-in',
        fill: 'forwards',
      },
    );

    if (!open) {
      animation.finished
        .then(() => {
          dialog.close();
          document.body.style.overflow = previousOverflow;
        })
        .catch(() => {
          // 다시 열리거나 언마운트되어 애니메이션이 취소된 경우입니다.
        });
    }

    return () => {
      animation.cancel();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className={`fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-dvh w-full max-w-[375px] flex-col overflow-hidden rounded-t-large border-0 bg-bg-layer-floating p-0 pt-2.5 pb-13 text-fg-neutral-default backdrop:bg-bg-layer-overlaid open:flex ${size === 'large' ? 'h-160' : 'h-[465px]'}`}
    >
      <div aria-hidden="true" className="flex shrink-0 justify-center px-4 pb-2.5">
        <div className="h-1 w-10 rounded-full bg-fg-neutral-weak" />
      </div>
      <header className="flex w-full shrink-0 items-center justify-between pb-1 pl-4 pr-3">
        <h2 id={titleId} className="min-w-0 typo-head-large-sb">
          {title}
        </h2>
        <button
          type="button"
          aria-label="바텀시트 닫기"
          onClick={onClose}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-small focus-visible:outline-2 focus-visible:outline-border-focus"
        >
          <img src={iconClose} alt="" className="size-6" />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4">{children}</div>
    </dialog>,
    document.body,
  );
}

export default BottomSheet;
