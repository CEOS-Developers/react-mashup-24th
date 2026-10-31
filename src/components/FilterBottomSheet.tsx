import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import ActionButton from './ActionButton';
import BottomSheet from './common/BottomSheet';
import ChipButton from './common/ChipButton';
import Modal from './Modal';
import TrashIcon from '../assets/icons/icon-trash.svg?react';
import { EMPTY_FILTER, FILTER_SECTIONS } from '../constants/filter';
import type { FilterPreset, FilterState } from '../types/filter';
import { countFilter, isChipOn, isSameFilter, summarizeFilter, toggleChip } from '../utils/filter';
import PresetNameModal from './PresetNameModal';

type FilterBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  appliedFilter: FilterState;
  presets: FilterPreset[];
  onAddPreset: (name: string, filter: FilterState) => void;
  onRemovePreset: (id: string) => void;
  onApply: (filter: FilterState) => void;
  isPresetPending: boolean;
  presetError: Error | null;
};

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-3">
      <h3 className="typo-body-medium-sb text-fg-neutral-default">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

function FilterBottomSheet({
  open,
  onClose,
  appliedFilter,
  presets,
  onAddPreset,
  onRemovePreset,
  onApply,
  isPresetPending,
  presetError,
}: FilterBottomSheetProps) {
  const [draft, setDraft] = useState<FilterState>(appliedFilter);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FilterPreset | null>(null);

  useEffect(() => {
    if (open) setDraft(appliedFilter);
  }, [open, appliedFilter]);

  const hasSamePreset = presets.some((preset) => isSameFilter(preset.filter, draft));

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <>
      <BottomSheet open={open} onClose={onClose} title="필터" size="large">
        {presets.length > 0 && (
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pt-2 pb-3 [scrollbar-width:none]">
            {presets.map((preset) => {
              const isSelected = isSameFilter(preset.filter, draft);
              return (
                <div key={preset.id} className="relative w-[140px] shrink-0">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setDraft(isSelected ? EMPTY_FILTER : preset.filter)}
                    className={`flex w-full cursor-pointer flex-col gap-1 rounded-medium p-3 text-left ${isSelected ? 'bg-bg-brand-subtle' : 'bg-bg-neutral-subtle'}`}
                  >
                    <span className="truncate pr-7 typo-body-medium-sb">{preset.name}</span>
                    <span className="truncate typo-body-small-md text-fg-neutral-muted">
                      {summarizeFilter(preset.filter)}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label={`${preset.name} 삭제`}
                    onClick={() => setDeleteTarget(preset)}
                    className="absolute top-2.5 right-3 flex size-6 cursor-pointer items-center justify-center text-fg-neutral-subtle"
                  >
                    <TrashIcon />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end border-t border-border-weak pt-3">
          <button
            type="button"
            onClick={() => setDraft(EMPTY_FILTER)}
            className="cursor-pointer typo-button-small-md text-fg-neutral-muted underline"
          >
            초기화
          </button>
        </div>

        {FILTER_SECTIONS.map((section) => (
          <FilterSection key={section.title} title={section.title}>
            {section.options.map((option) => (
              <ChipButton
                key={option.value}
                checked={isChipOn(draft, section, option.value)}
                onClick={() => setDraft(toggleChip(draft, section, option.value))}
              >
                {option.label}
              </ChipButton>
            ))}
          </FilterSection>
        ))}

        {presetError && (
          <p role="alert" className="pt-2 typo-body-small-md text-fg-neutral-error">
            프리셋을 저장하거나 삭제하지 못했어요. 다시 시도해 주세요.
          </p>
        )}

        <div className="sticky bottom-0 flex gap-2 bg-bg-layer-floating pt-4">
          <ActionButton
            variant="secondary"
            disabled={countFilter(draft) === 0 || hasSamePreset || isPresetPending}
            onClick={() => setIsSaveOpen(true)}
          >
            프리셋에 저장
          </ActionButton>
          <ActionButton onClick={handleApply}>적용</ActionButton>
        </div>
      </BottomSheet>

      <PresetNameModal
        open={isSaveOpen}
        onClose={() => setIsSaveOpen(false)}
        existingNames={presets.map((preset) => preset.name)}
        onSubmit={(name) => {
          onAddPreset(name, draft);
          setIsSaveOpen(false);
        }}
      />

      <Modal open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} title="필터 삭제">
        <p className="typo-body-medium-md text-fg-neutral-muted">정말 삭제하시겠습니까?</p>
        <div className="mt-4 flex gap-2">
          <ActionButton variant="secondary" onClick={() => setDeleteTarget(null)}>
            취소
          </ActionButton>
          <ActionButton
            disabled={isPresetPending}
            onClick={() => {
              if (deleteTarget) onRemovePreset(deleteTarget.id);
              setDeleteTarget(null);
            }}
          >
            삭제
          </ActionButton>
        </div>
      </Modal>
    </>
  );
}

export default FilterBottomSheet;
