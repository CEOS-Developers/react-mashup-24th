import { useEffect, useId, useRef } from "react";
import Button from "../Button";

interface RecipientValidationModalProps {
  open: boolean;
  message: string;
  variant?: "error" | "success";
  onClose: () => void;
}

function RecipientValidationModal({
  open,
  message,
  variant = "error",
  onClose,
}: RecipientValidationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const messageId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      role={variant === "error" ? "alertdialog" : "dialog"}
      aria-labelledby={messageId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-64px)] max-w-[308px] rounded-large border-0 bg-surface-default p-[22px] text-text-default shadow-none backdrop:bg-black/50"
    >
      <div className="flex flex-col items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={variant === "error" ? "text-[#FF6723]" : "text-[#00A991]"}
        >
          {variant === "error" ? (
            <>
              <path
                d="M10.268 3.75a2 2 0 0 1 3.464 0l8.196 14.2A2 2 0 0 1 20.196 21H3.804a2 2 0 0 1-1.732-3.05l8.196-14.2Z"
                fill="currentColor"
              />
              <path
                d="M12 8v5m0 3.25h.01"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path
                d="m7.5 12.25 3 3 6-6.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>

        <p
          id={messageId}
          className="mt-[16px] text-center text-body-2-bold text-text-default"
        >
          {message}
        </p>

        <Button
          size="lg"
          className="mt-[32px] w-full"
          onClick={onClose}
          autoFocus
        >
          확인
        </Button>
      </div>
    </dialog>
  );
}

export default RecipientValidationModal;
