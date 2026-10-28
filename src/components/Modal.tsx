import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../../../assets/icons/icon-close.svg?react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-auto w-[311px] rounded-large border-0 bg-bg-layer-floating p-5 text-fg-neutral-default backdrop:bg-bg-layer-overlaid"
    >
      <header className="flex items-center justify-between">
        <h2 id={titleId} className="typo-body-large-sb">
          {title}
        </h2>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex size-8 cursor-pointer items-center justify-center rounded-small"
        >
          <CloseIcon className="size-5" />
        </button>
      </header>
      <div className="mt-3">{children}</div>
    </dialog>,
    document.body,
  );
}

export default Modal;