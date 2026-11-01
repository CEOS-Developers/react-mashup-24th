import { useEffect, useId, useRef } from "react";
import Button from "../Button";
import type { ReceiveMethodDetailSection } from "../../mocks/receiveMethodDetails";

interface ReceiveMethodDetailModalProps {
  methodName: string;
  notices: readonly string[];
  sections?: readonly ReceiveMethodDetailSection[];
  onClose: () => void;
}

function ReceiveMethodDetailModal({
  methodName,
  notices,
  sections = [],
  onClose,
}: ReceiveMethodDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-48px)] w-[calc(100%-64px)] max-w-[338px] overflow-hidden rounded-large border-0 bg-surface-default p-0 text-text-default backdrop:bg-black/50"
    >
      <div className="flex max-h-[calc(100dvh-48px)] flex-col px-[20px]">
        <header className="relative flex shrink-0 items-center justify-center border-b border-border-default py-[24px] pr-[28px] pl-[28px]">
          <h2 id={titleId} className="text-center text-body-1-bold">
            받는 방법 상세 · {methodName}
          </h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="absolute right-0 flex size-[32px] cursor-pointer items-center justify-center text-text-secondary"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-padding-wide py-[28px]">
          <section>
            <h3 className="mb-gap-8 text-body-3-semibold text-text-secondary">
              유의사항 (공통)
            </h3>
            <ul className="list-outside list-disc pl-[12px] text-body-4-regular text-text-tertiary marker:text-[8px]">
              {notices.map((notice) => <li key={notice}>{notice}</li>)}
            </ul>
          </section>
          {sections.map((section) => (
            <section key={section.title} className="mt-[20px]">
              <h3 className="mb-gap-8 text-body-3-semibold text-text-secondary">
                {section.title}
              </h3>
              <ul className="list-outside list-disc pl-[12px] text-body-4-regular text-text-tertiary marker:text-[8px]">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>

        <footer className="shrink-0 pt-padding-wide pb-[24px]">
          <Button className="w-full" onClick={onClose}>확인</Button>
        </footer>
      </div>
    </dialog>
  );
}

export default ReceiveMethodDetailModal;
