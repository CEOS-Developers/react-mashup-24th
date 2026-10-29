import { useState, type UIEvent } from 'react';
import iconDropdown from '../../../assets/icons/common/icon-dropdown.svg';
import iconPaper from '../../../assets/icons/panel/icon-paper.svg';
import type { CitationSection as CitationSectionData } from '../caseDetail.types';
import CitationCard from './CitationCard';

/** 펼쳤을 때 스크롤 없이 보이는 행 수 (행 높이 24px × 10 = 240px) */
const VISIBLE_CARD_COUNT = 10;

interface CitationCaseListProps {
  cases: CitationSectionData['cases'];
  onSelectCase?: (caseId: number) => void;
}

function CitationCaseList({ cases, onSelectCase }: CitationCaseListProps) {
  const [hasMore, setHasMore] = useState(cases.length > VISIBLE_CARD_COUNT);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    setHasMore(scrollTop + clientHeight < scrollHeight - 1);
  };

  if (cases.length === 0) {
    return <p className="caption-md px-[1.25rem] py-8 text-gray-600">인용된 판례가 없습니다.</p>;
  }

  return (
    <div className="relative">
      <div onScroll={handleScroll} className="max-h-[15rem] overflow-y-auto [scrollbar-width:none]">
        {cases.map((citedCase) => (
          <CitationCard
            key={citedCase.id}
            label={citedCase.label}
            onClick={() => onSelectCase?.(citedCase.id)}
          />
        ))}
      </div>
      {hasMore && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[3.25rem] bg-linear-to-t from-(--color-surface-default) from-[10.87%] to-transparent to-[121.74%]"
        />
      )}
    </div>
  );
}

interface CitationSectionProps extends Omit<CitationSectionData, 'id'> {
  onSelectCase?: (caseId: number) => void;
}

function CitationSection({ label, count, cases, onSelectCase }: CitationSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full shrink-0 ${isOpen ? 'border-b-[0.5px] border-(--color-border-default)' : ''}`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between border-b-[0.5px] border-(--color-border-default) bg-(--color-surface-default) p-12"
      >
        <span className="flex shrink-0 items-center gap-8">
          <img
            src={iconPaper}
            alt=""
            width={18}
            height={18}
            className="block size-[1.125rem] max-w-none shrink-0"
          />
          <span className="heading-sm whitespace-nowrap text-(--color-text-primary)">{label}</span>
          <span className="body-lg whitespace-nowrap text-gray-600">{count}</span>
        </span>
        {/* Figma는 12px 칸(꺾쇠 9×5, 위치 1.5·4)을 18px로 키워 씀 → 같은 비율로 13.5×7.5를 2.25·6에 배치 */}
        <span className="relative block size-[1.125rem] shrink-0">
          <img
            src={iconDropdown}
            alt=""
            width={13.5}
            height={7.5}
            className="absolute top-[0.375rem] left-[0.140625rem] block h-[0.46875rem] w-[0.84375rem] max-w-none"
          />
        </span>
      </button>
      {isOpen && <CitationCaseList cases={cases} onSelectCase={onSelectCase} />}
    </div>
  );
}

export default CitationSection;
