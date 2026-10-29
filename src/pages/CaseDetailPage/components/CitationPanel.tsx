import type { QueryStatus } from '@tanstack/react-query';
import { useState } from 'react';
import iconChart from '../../../assets/icons/panel/icon-chart.svg';
import iconClosedBook from '../../../assets/icons/panel/icon-closed-book.svg';
import iconPen from '../../../assets/icons/panel/icon-pen.svg';
import iconTextbox from '../../../assets/icons/panel/icon-textbox.svg';
import iconXmark from '../../../assets/icons/common/icon-xmark.svg';
import IconButton from '../../../components/common/IconButton';
import { useAutoOpenPanel } from '../../../hooks/useAutoOpenPanel';
import type { CitationSection as CitationSectionData } from '../caseDetail.types';
import CitationSection from './CitationSection';

const TABS = [
  { id: 'detail', label: '판례 정보' },
  { id: 'outline', label: '목차' },
  { id: 'highlight', label: '하이라이트' },
  { id: 'memo', label: '메모' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function TabIcon({ id }: { id: TabId }) {
  if (id === 'outline') {
    return (
      <span className="relative block size-[1.25rem] shrink-0 overflow-clip">
        <img
          src={iconChart}
          alt=""
          width={16}
          height={13.945}
          className="absolute top-[0.16422rem] left-[0.125rem] block h-[0.87156rem] w-[1rem] max-w-none"
        />
      </span>
    );
  }
  if (id === 'memo') {
    return (
      <span className="relative block size-[1.25rem] shrink-0 overflow-clip">
        <img
          src={iconTextbox}
          alt=""
          width={16}
          height={16}
          className="absolute top-[0.125rem] left-[0.125rem] block size-[1rem] max-w-none"
        />
      </span>
    );
  }
  return (
    <img
      src={id === 'detail' ? iconClosedBook : iconPen}
      alt=""
      width={20}
      height={20}
      className="block size-[1.25rem] max-w-none shrink-0"
    />
  );
}

function AutoOpenToggle() {
  const [isOn, setIsOn] = useAutoOpenPanel();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label="패널 자동 열기"
      onClick={() => setIsOn(!isOn)}
      className="flex shrink-0 cursor-pointer items-center justify-center"
    >
      <span className="-scale-y-100 rotate-180">
        <span className="flex h-[0.60981rem] w-[1.1875rem] items-center justify-end overflow-clip rounded-full bg-gray-400 p-[0.125rem]">
          {isOn && (
            <span className="size-[0.9375rem] shrink-0 rounded-full bg-gray-0 shadow-[0px_0px_0px_0px_rgba(0,0,0,0.04),0px_3px_8px_0px_rgba(0,0,0,0.15)]" />
          )}
        </span>
      </span>
    </button>
  );
}

interface CitationPanelProps {
  title: string;
  caseName: string;
  sections: CitationSectionData[];
  citationsStatus: QueryStatus;
  onClose: () => void;
  onSelectCase?: (caseId: number) => void;
}

function CitationPanel({
  title,
  caseName,
  sections,
  citationsStatus,
  onClose,
  onSelectCase,
}: CitationPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('detail');

  return (
    <aside
      aria-label="판례 패널"
      className="flex h-full w-[17.375rem] shrink-0 flex-col items-start border-l border-(--color-border-default)"
    >
      <div className="flex min-h-0 w-full flex-col items-start gap-px">
        <div className="flex w-full shrink-0 flex-col items-start gap-16 rounded-tr-md border-b border-(--color-border-default) bg-(--color-surface-default) p-12">
          <div className="flex w-[15.875rem] items-start gap-24">
            <div className="flex min-w-px flex-[1_0_0] flex-col items-start gap-4 self-stretch">
              <p className="heading-sm w-full truncate text-(--color-text-primary)">{title}</p>
              <p className="body-md w-full break-words text-gray-600">{caseName}</p>
            </div>
            <IconButton label="패널 닫기" onClick={onClose} className="size-[1.25rem]">
              <img
                src={iconXmark}
                alt=""
                width={20}
                height={20}
                className="block size-[1.25rem] max-w-none"
              />
            </IconButton>
          </div>

          <div
            role="tablist"
            className="flex h-[2.25rem] w-[15.875rem] shrink-0 items-center justify-center overflow-clip rounded-md border-[0.8px] border-(--color-border-default) bg-gray-200 p-4"
          >
            <div className="flex shrink-0 items-start gap-[0.125rem]">
              {TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={tab.label}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex h-[1.75rem] w-[3.75rem] shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-[0.375rem] ${isActive ? 'bg-(--color-surface-default) shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]' : ''}`}
                  >
                    <TabIcon id={tab.id} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 w-full flex-col items-start overflow-y-auto [scrollbar-width:none]">
          {citationsStatus === 'success' ? (
            sections.map(({ id, ...section }) => (
              <CitationSection key={id} {...section} onSelectCase={onSelectCase} />
            ))
          ) : (
            <p className="caption-md w-full px-12 py-12 text-gray-600">
              {citationsStatus === 'error'
                ? '인용 판례를 불러오지 못했습니다.'
                : '인용 판례를 불러오는 중입니다.'}
            </p>
          )}
        </div>
      </div>

      <div className="min-h-px w-full flex-[1_0_0] bg-(--color-surface-default)" />

      <div className="flex w-full shrink-0 items-center rounded-br-md border-t-[0.5px] border-(--color-border-default) bg-(--color-surface-default) p-12">
        <div className="flex h-[1.5rem] shrink-0 items-center gap-[7.9375rem]">
          <p className="heading-sm w-[5.6875rem] shrink-0 text-(--color-text-primary)">
            패널 자동 열기
          </p>
          <AutoOpenToggle />
        </div>
      </div>
    </aside>
  );
}

export default CitationPanel;
