import { useState } from 'react';
import type { FormEvent } from 'react';
import ActionButton from './ActionButton';
import Modal from './Modal';
import { getDefaultPresetName } from '../utils/filter';

type PresetNameModalProps = {
  open: boolean;
  onClose: () => void;
  existingNames: string[];
  onSubmit: (name: string) => void;
};

function PresetNameModal({ open, onClose, existingNames, onSubmit }: PresetNameModalProps) {
  const [name, setName] = useState('');
  const trimmedName = name.trim();
  const error = existingNames.includes(trimmedName) ? '이미 같은 이름의 프리셋이 있어요.' : '';

  const handleClose = () => {
    setName('');
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) return;
    onSubmit(trimmedName || getDefaultPresetName(existingNames));
    setName('');
  };

  return (
    <Modal open={open} onClose={handleClose} title="프리셋 추가">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={10}
          placeholder="새 프리셋의 이름을 입력해주세요."
          aria-invalid={Boolean(error)}
          className={`h-11 w-full rounded-small border px-3 typo-body-medium-md outline-none ${error ? 'border-border-error' : 'border-border-default focus:border-border-focus'}`}
        />
        {error && <p className="mt-1 typo-body-small-md text-fg-neutral-error">{error}</p>}
        <div className="mt-4 flex gap-2">
          <ActionButton variant="secondary" onClick={handleClose}>
            취소
          </ActionButton>
          <ActionButton type="submit" disabled={Boolean(error)}>
            확인
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
}

export default PresetNameModal;
