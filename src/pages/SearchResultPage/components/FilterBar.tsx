import { useState } from 'react';
import type { FormEvent } from 'react';
import bellIcon from '../../../assets/icons/search/icon-bell.svg';
import dropdownIcon from '../../../assets/icons/common/icon-dropdown.svg';
import searchIcon from '../../../assets/icons/search/icon-search.svg';

import Chip from '../../../components/common/Chip';
import type { JudgmentSearchParams } from '../../../types/judgment';

interface FilterBarProps {
  caseType: JudgmentSearchParams['caseType'];
  onCaseTypeChange: (caseType: JudgmentSearchParams['caseType']) => void;
  court?: string;
  onCourtChange: (court: string | undefined) => void;
  dateFrom?: string;
  dateTo?: string;
  onDateChange: (range: Pick<JudgmentSearchParams, 'dateFrom' | 'dateTo'>) => void;
}

const FILTERS = [
  {
    id: 'condition',
    label: '조건검색',
    icon: searchIcon,
    iconPosition: 'left' as const,
  },
  {
    id: 'caseType',
    label: '사건유형',
    icon: dropdownIcon,
    iconPosition: 'right' as const,
  },
  {
    id: 'court',
    label: '법원',
    icon: dropdownIcon,
    iconPosition: 'right' as const,
  },
  {
    id: 'orderType',
    label: '주문유형',
    icon: dropdownIcon,
    iconPosition: 'right' as const,
  },
  {
    id: 'orderType2',
    label: '주문유형',
    icon: dropdownIcon,
    iconPosition: 'right' as const,
  },
  {
    id: 'decisionDate',
    label: '선고일',
    icon: dropdownIcon,
    iconPosition: 'right' as const,
  },
  {
    id: 'keywordAlert',
    label: '키워드 알림',
    icon: bellIcon,
    iconPosition: 'left' as const,
  },
];

const FilterBar = ({
  caseType,
  onCaseTypeChange,
  court,
  onCourtChange,
  dateFrom,
  dateTo,
  onDateChange,
}: FilterBarProps) => {
  const [isCourtOpen, setIsCourtOpen] = useState(false);
  const [draftCourt, setDraftCourt] = useState(court ?? '');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [draftDateFrom, setDraftDateFrom] = useState(dateFrom ?? '');
  const [draftDateTo, setDraftDateTo] = useState(dateTo ?? '');
  const isInvalidRange = Boolean(draftDateFrom && draftDateTo && draftDateFrom > draftDateTo);

  const handleDateToggle = () => {
    setDraftDateFrom(dateFrom ?? '');
    setDraftDateTo(dateTo ?? '');
    setIsDateOpen(!isDateOpen);
    setIsCourtOpen(false);
  };

  const handleDateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isInvalidRange) return;
    onDateChange({ dateFrom: draftDateFrom || undefined, dateTo: draftDateTo || undefined });
    setIsDateOpen(false);
  };

  const handleCourtToggle = () => {
    setDraftCourt(court ?? '');
    setIsCourtOpen(!isCourtOpen);
    setIsDateOpen(false);
  };

  const handleCourtSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCourtChange(draftCourt.trim() || undefined);
    setIsCourtOpen(false);
  };

  return (
    <>
      <div className="mx-auto flex w-[685px] max-w-full items-center gap-[6px] overflow-x-auto px-[16px] pt-[16px] [&>button]:shrink-0 [&>button]:gap-[2px] [&>button]:border-gray-300 [&>button]:px-[6px] [&>button]:py-[2px] [&>button]:text-[11px] [&>button]:leading-[16px] [&>button]:font-normal [&>button]:text-gray-900 [&>button>img]:h-auto [&>button>img]:w-auto [&>button:last-child]:border-transparent [&>button:last-child]:bg-gray-200 [&>button:last-child]:font-medium">
        {FILTERS.map((filter) =>
          filter.id === 'caseType' ? (
            <label
              key={filter.id}
              className="flex shrink-0 cursor-pointer items-center gap-[2px] rounded-[4px] border border-gray-300 bg-white px-[6px] py-[2px] text-[11px] leading-[16px] text-gray-900"
            >
              <select
                aria-label="사건 유형"
                value={caseType ?? ''}
                onChange={(event) =>
                  onCaseTypeChange(
                    event.target.value
                      ? (event.target.value as JudgmentSearchParams['caseType'])
                      : undefined,
                  )
                }
                className="cursor-pointer appearance-none bg-transparent"
              >
                <option value="">사건유형 · 전체</option>
                <option value="CIVIL">민사</option>
                <option value="CRIMINAL">형사</option>
                <option value="ADMINISTRATIVE">행정</option>
              </select>
              <img src={dropdownIcon} alt="" />
            </label>
          ) : (
            <Chip
              key={filter.id}
              label={
                filter.id === 'court' && court
                  ? `법원 · ${court}`
                  : filter.id === 'decisionDate' && (dateFrom || dateTo)
                    ? `선고일 · ${dateFrom || '전체'} ~ ${dateTo || '전체'}`
                    : filter.label
              }
              icon={filter.icon}
              iconPosition={filter.iconPosition}
              onClick={
                filter.id === 'court'
                  ? handleCourtToggle
                  : filter.id === 'decisionDate'
                    ? handleDateToggle
                    : undefined
              }
            />
          ),
        )}
      </div>
      {isCourtOpen && (
        <form
          onSubmit={handleCourtSubmit}
          className="mx-auto mt-[8px] flex w-[685px] max-w-full flex-wrap items-center gap-[6px] px-[16px] text-[11px] text-gray-900"
        >
          <label htmlFor="search-court">법원명</label>
          <input
            id="search-court"
            type="text"
            value={draftCourt}
            onChange={(event) => setDraftCourt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setIsCourtOpen(false);
              if (
                event.key === 'Enter' &&
                (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
              )
                event.preventDefault();
            }}
            placeholder="예: 서울중앙지방법원"
            autoFocus
            className="min-w-0 flex-1 rounded-[4px] border border-gray-300 bg-white px-[6px] py-[4px]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-[4px] bg-gray-900 px-[8px] py-[4px] text-white"
          >
            적용
          </button>
          <button
            type="button"
            onClick={() => {
              setDraftCourt('');
              onCourtChange(undefined);
              setIsCourtOpen(false);
            }}
            className="cursor-pointer rounded-[4px] border border-gray-300 px-[8px] py-[4px]"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={() => setIsCourtOpen(false)}
            className="cursor-pointer px-[6px] py-[4px]"
          >
            취소
          </button>
        </form>
      )}
      {isDateOpen && (
        <form
          onSubmit={handleDateSubmit}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsDateOpen(false);
          }}
          className="mx-auto mt-[8px] flex w-[685px] max-w-full flex-wrap items-center gap-[6px] px-[16px] text-[11px] text-gray-900"
        >
          <label htmlFor="search-date-from">시작일</label>
          <input
            id="search-date-from"
            type="date"
            value={draftDateFrom}
            max={draftDateTo || undefined}
            onChange={(event) => setDraftDateFrom(event.target.value)}
            aria-invalid={isInvalidRange}
            aria-describedby={isInvalidRange ? 'search-date-error' : undefined}
            className="min-w-0 rounded-[4px] border border-gray-300 bg-white px-[6px] py-[4px]"
          />
          <label htmlFor="search-date-to">종료일</label>
          <input
            id="search-date-to"
            type="date"
            value={draftDateTo}
            min={draftDateFrom || undefined}
            onChange={(event) => setDraftDateTo(event.target.value)}
            aria-invalid={isInvalidRange}
            aria-describedby={isInvalidRange ? 'search-date-error' : undefined}
            className="min-w-0 rounded-[4px] border border-gray-300 bg-white px-[6px] py-[4px]"
          />
          <button
            type="submit"
            disabled={isInvalidRange}
            className="cursor-pointer rounded-[4px] bg-gray-900 px-[8px] py-[4px] text-white disabled:cursor-default disabled:opacity-40"
          >
            적용
          </button>
          <button
            type="button"
            onClick={() => {
              setDraftDateFrom('');
              setDraftDateTo('');
              onDateChange({});
              setIsDateOpen(false);
            }}
            className="cursor-pointer rounded-[4px] border border-gray-300 px-[8px] py-[4px]"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={() => setIsDateOpen(false)}
            className="cursor-pointer px-[6px] py-[4px]"
          >
            취소
          </button>
          {isInvalidRange && (
            <p id="search-date-error" role="alert" className="w-full text-error-600">
              시작일은 종료일보다 늦을 수 없습니다.
            </p>
          )}
        </form>
      )}
    </>
  );
};

export default FilterBar;
