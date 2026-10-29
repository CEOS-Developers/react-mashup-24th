import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import ActionButton from './ActionButton';
import BottomSheet from './common/BottomSheet';
import ChipButton from './common/ChipButton';
import Modal from './Modal';
import TrashIcon from '../assets/icons/icon-trash.svg?react';
import { EMPTY_FILTER, GENDER_OPTIONS, STATUS_OPTIONS, TIME_OPTIONS } from '../constants/filter';
import { usePresets } from '../hooks/usePresets';
import type { FilterPreset, FilterState } from '../types/filter';
import { countFilter, isSameFilter, summarizeFilter, toggleValue } from '../utils/filter';
import PresetNameModal from './PresetNameModal';

type FilterBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  appliedFilter: FilterState;
  onApply: (filter: FilterState, presetName: string | null) => void;
};

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-3">
      <h3 className="typo-body-medium-sb text-fg-neutral-default">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

function FilterBottomSheet({ open, onClose, appliedFilter, onApply }: FilterBottomSheetProps) {
  const [draft, setDraft] = useState<FilterState>(appliedFilter);
  const { presets, addPreset, removePreset } = usePresets();
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FilterPreset | null>(null);

  useEffect(() => {
    if (open) setDraft(appliedFilter);
  }, [open, appliedFilter]);

  const handleApply = () => {
    const matchedPreset = presets.find((preset) => isSameFilter(preset.filter, draft));
    onApply(draft, matchedPreset ? matchedPreset.name : null);
    onClose();
  };

  return (
    <>
      <BottomSheet open={open} onClose={onClose} title="필터" size="large">
        {presets.length > 0 && (
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pt-2 pb-3 [scrollbar-width:none]">
            {presets.map((preset) => (
              <div
                key={preset.id}
                className={`flex w-[140px] shrink-0 flex-col gap-1 rounded-medium p-3 ${isSameFilter(preset.filter, draft) ? 'bg-bg-brand-subtle' : 'bg-bg-neutral-subtle'}`}
              >
                <div className="flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => setDraft(preset.filter)}
                    className="min-w-0 flex-1 cursor-pointer truncate text-left typo-body-medium-sb"
                  >
                    {preset.name}
                  </button>
                  <button
                    type="button"
                    aria-label={`${preset.name} 삭제`}
                    onClick={() => setDeleteTarget(preset)}
                    className="flex size-6 shrink-0 cursor-pointer items-center justify-center text-fg-neutral-subtle"
                  >
                    <TrashIcon />
                  </button>
                </div>
                <p className="truncate typo-body-small-md text-fg-neutral-muted">
                  {summarizeFilter(preset.filter)}
                </p>
              </div>
            ))}
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

        <FilterSection title="상태">
          {STATUS_OPTIONS.map((option) => (
            <ChipButton
              key={option.value}
              checked={draft.status.includes(option.value)}
              onClick={() =>
                setDraft({ ...draft, status: toggleValue(draft.status, option.value) })
              }
            >
              {option.label}
            </ChipButton>
          ))}
        </FilterSection>

        <FilterSection title="시간">
          {TIME_OPTIONS.map((option) => (
            <ChipButton
              key={option.value}
              checked={draft.time === option.value}
              onClick={() =>
                setDraft({ ...draft, time: draft.time === option.value ? null : option.value })
              }
            >
              {option.label}
            </ChipButton>
          ))}
        </FilterSection>

        <FilterSection title="성별">
          {GENDER_OPTIONS.map((option) => (
            <ChipButton
              key={option.value}
              checked={draft.gender.includes(option.value)}
              onClick={() =>
                setDraft({ ...draft, gender: toggleValue(draft.gender, option.value) })
              }
            >
              {option.label}
            </ChipButton>
          ))}
        </FilterSection>

        <div className="sticky bottom-0 flex gap-2 bg-bg-layer-floating pt-4">
          <ActionButton
            variant="secondary"
            disabled={countFilter(draft) === 0}
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
          addPreset(name, draft);
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
            onClick={() => {
              if (deleteTarget) removePreset(deleteTarget.id);
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
