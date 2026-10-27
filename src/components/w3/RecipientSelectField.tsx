import { useEffect, useId, useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import SelectItem from "../SelectItem";

export interface RecipientSelectOption {
  label: string;
  value: string;
}

interface RecipientSelectFieldProps {
  label: string;
  floatingLabel: string;
  title: string;
  placeholder: string;
  searchPlaceholder: string;
  value: string;
  options: readonly RecipientSelectOption[];
  onChange: (value: string) => void;
}

function RecipientSelectField({
  label,
  floatingLabel,
  title,
  placeholder,
  searchPlaceholder,
  value,
  options,
  onChange,
}: RecipientSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const titleId = useId();
  const searchId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredOptions = options.filter((option) =>
    option.label.toLocaleLowerCase().includes(normalizedQuery),
  );

  const handleSelect = (option: RecipientSelectOption) => {
    onChange(option.value);
    setQuery("");
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-gap-4">
        <span className="text-body-2-semibold text-text-default">{label}</span>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex min-h-[56px] w-full items-center gap-gap-8 rounded-medium border border-border-default bg-surface-default px-padding-wide py-padding-medium text-left"
        >
          <span className="flex flex-1 flex-col items-start">
            {value && (
              <span className="text-body-5-semibold text-text-tertiary">
                {floatingLabel}
              </span>
            )}
            <span
              className={`text-body-1-semibold ${value ? "text-text-default" : "font-normal text-text-disabled"}`}
            >
              {value || placeholder}
            </span>
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <button
            type="button"
            aria-label="선택 창 닫기"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/40"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[min(80dvh,640px)] min-h-[356px] w-full max-w-[402px] animate-[recipient-sheet-rise_240ms_ease-out] flex-col rounded-t-large bg-surface-default px-[20px] pb-[max(24px,env(safe-area-inset-bottom))] motion-reduce:animate-none"
          >
            <h2
              id={titleId}
              className="shrink-0 py-(--unit-20) text-center text-body-1-bold text-text-default"
            >
              {title}
            </h2>
            <label
              htmlFor={searchId}
              className="mb-(--unit-16) flex h-(--unit-36) shrink-0 items-center gap-gap-8 border-b border-border-default"
            >
              <SearchIcon aria-hidden="true" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-body-1-semibold text-text-default outline-none placeholder:text-text-disabled"
              />
            </label>

            <ul className="flex min-h-0 flex-1 flex-col gap-gap-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filteredOptions.map((option) => {
                const selected = option.value === value;
                return (
                  <li key={option.value}>
                    <SelectItem
                      label={option.label}
                      selected={selected}
                      onClick={() => handleSelect(option)}
                    />
                  </li>
                );
              })}
              {filteredOptions.length === 0 && (
                <li className="py-padding-wide text-center text-body-4-regular text-text-tertiary">
                  검색 결과가 없습니다.
                </li>
              )}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}

export default RecipientSelectField;
