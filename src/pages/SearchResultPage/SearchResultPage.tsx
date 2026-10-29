import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchJudgments } from '../../api/judgments';
import type {
  JudgmentSearchParams,
  JudgmentSearchResponse,
  JudgmentSearchSort,
} from '../../types/judgment';
import navigationTop from '../../assets/icons/sidebar/icon-navigation-top.svg';
import bookIcon from '../../assets/icons/sidebar/icon-open-book.svg';
import columnIcon from '../../assets/icons/sidebar/icon-column.svg';
import timeIcon from '../../assets/icons/sidebar/icon-time.svg';
import playIcon from '../../assets/icons/sidebar/icon-play.svg';
import archiveIcon from '../../assets/icons/sidebar/icon-archive.svg';
import layersIcon from '../../assets/icons/sidebar/icon-layer.svg';
import helpIcon from '../../assets/icons/sidebar/icon-question.svg';
import backIcon from '../../assets/icons/common/icon-arrow.svg';
import dropdownIcon from '../../assets/icons/topbar/icon-dropdown-filled.svg';
import layerIcon from '../../assets/icons/sidebar/icon-layer.svg';
import infoIcon from '../../assets/icons/topbar/icon-info.svg';

import CategoryTabs from './components/CategoryTabs';
import FilterBar from './components/FilterBar';
import PromptInput from './components/PromptInput';
import ResultHeader from './components/ResultHeader';
import SearchCard from './components/SearchCard';

const SORTS: JudgmentSearchSort[] = ['date,desc', 'viewCount,desc'];
const CASE_TYPES = ['CIVIL', 'CRIMINAL', 'ADMINISTRATIVE'] as const;
const URL_KEYS = ['keyword', 'caseType', 'court', 'dateFrom', 'dateTo', 'sort', 'page'] as const;

const toSearchRequest = (params: URLSearchParams): JudgmentSearchParams => {
  const request: JudgmentSearchParams = {
    keyword: params.get('keyword')?.trim() ?? '',
    sort: SORTS.find((sort) => sort === params.get('sort')) ?? 'date,desc',
    page: Math.max(0, Number.parseInt(params.get('page') ?? '', 10) || 0),
    size: 20,
  };

  const caseType = CASE_TYPES.find((type) => type === params.get('caseType'));
  const court = params.get('court')?.trim();
  const dateFrom = params.get('dateFrom');
  const dateTo = params.get('dateTo');

  if (caseType) request.caseType = caseType;
  if (court) request.court = court;
  if (dateFrom) request.dateFrom = dateFrom;
  if (dateTo) request.dateTo = dateTo;

  return request;
};

const toUrlParams = (request: JudgmentSearchParams) => {
  const params = new URLSearchParams();
  for (const key of URL_KEYS) {
    const value = request[key];
    if (value !== undefined && value !== '') params.set(key, String(value));
  }
  return params;
};

type PageState = 'success' | 'loading' | 'empty' | 'error';

const SearchResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRequest = useMemo(() => toSearchRequest(searchParams), [searchParams]);
  const setSearchRequest = (update: (previous: JudgmentSearchParams) => JudgmentSearchParams) => {
    setSearchParams(toUrlParams(update(searchRequest)), { replace: true });
  };
  const [pageState, setPageState] = useState<PageState>('loading');
  const [searchResult, setSearchResult] = useState<JudgmentSearchResponse | null>(null);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const currentPage = searchRequest.page ?? 0;
  const totalPages = searchResult?.page.totalPages ?? 0;

  const hasKeyword = searchRequest.keyword !== '';

  useEffect(() => {
    if (!searchRequest.keyword) return;

    const controller = new AbortController();

    searchJudgments(searchRequest, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setSearchResult(result);
        setPageState(result.content.length > 0 ? 'success' : 'empty');
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setPageState('error');
      });

    return () => controller.abort();
  }, [searchRequest]);

  const handleSearch = (value: string) => {
    const keyword = value.trim();
    if (!keyword) return;

    setPageState('loading');
    setSearchResult(null);
    setSearchRequest((previous) => ({ ...previous, keyword, page: 0 }));
  };

  const handleSortChange = (sort: JudgmentSearchSort) => {
    if (sort === searchRequest.sort) return;

    setPageState('loading');
    setSearchResult(null);
    setSearchRequest((previous) => ({ ...previous, sort, page: 0 }));
  };

  const handleCaseTypeChange = (caseType: JudgmentSearchParams['caseType']) => {
    if (caseType === searchRequest.caseType) return;

    setPageState('loading');
    setSearchResult(null);
    setSearchRequest((previous) => {
      const next = { ...previous, page: 0 };
      if (caseType) {
        next.caseType = caseType;
      } else {
        delete next.caseType;
      }
      return next;
    });
  };

  const handleCourtChange = (value: string | undefined) => {
    const court = value?.trim() || undefined;
    if (court === searchRequest.court) return;

    setPageState('loading');
    setSearchResult(null);
    setSearchRequest((previous) => {
      const next = { ...previous, page: 0 };
      if (court) {
        next.court = court;
      } else {
        delete next.court;
      }
      return next;
    });
  };

  const handleDateChange = ({
    dateFrom,
    dateTo,
  }: Pick<JudgmentSearchParams, 'dateFrom' | 'dateTo'>) => {
    if (dateFrom && dateTo && dateFrom > dateTo) return;
    if (dateFrom === searchRequest.dateFrom && dateTo === searchRequest.dateTo) return;

    setPageState('loading');
    setSearchResult(null);
    setSearchRequest((previous) => {
      const next = { ...previous, page: 0 };
      if (dateFrom) next.dateFrom = dateFrom;
      else delete next.dateFrom;
      if (dateTo) next.dateTo = dateTo;
      else delete next.dateTo;
      return next;
    });
  };

  const handlePageChange = (page: number) => {
    if (
      pageState === 'loading' ||
      !Number.isInteger(page) ||
      page < 0 ||
      page >= totalPages ||
      page === currentPage
    )
      return;

    setPageState('loading');
    setSearchRequest((previous) => ({ ...previous, page }));
    resultsScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-100 font-sans tracking-[-0.2px] text-gray-900">
      <aside className="flex w-[56px] shrink-0 flex-col" aria-label="글로벌 내비게이션">
        <img src={navigationTop} alt="내비게이션" className="h-[204.5px] w-[56px]" />
        <div className="flex flex-col items-center gap-[16px] border-b-[0.5px] border-gray-300 p-[4px]">
          {[
            [bookIcon, '법률 자료'],
            [columnIcon, '문서'],
          ].map(([icon, label]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex shrink-0 cursor-pointer items-center justify-center"
            >
              <img src={icon} alt="" />
            </button>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col items-center gap-[16px] border-b-[0.5px] border-gray-300 p-[4px]">
          {[
            [timeIcon, '최근 작업'],
            [playIcon, '동영상'],
            [archiveIcon, '아카이브'],
            [layersIcon, '작업 목록'],
          ].map(([icon, label]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex shrink-0 cursor-pointer items-center justify-center"
            >
              <img src={icon} alt="" />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="도움말"
          className="mx-auto flex shrink-0 cursor-pointer items-center justify-center p-[4px]"
        >
          <img src={helpIcon} alt="" />
        </button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col pr-[8px] pb-[8px]">
        <header className="flex h-[40px] shrink-0 items-center justify-between py-[8px] pr-[12px] pl-[20px] max-[720px]:pl-[12px]">
          <div className="flex items-center gap-[2px] text-[14px] font-medium">
            <button
              type="button"
              aria-label="뒤로 가기"
              onClick={() => window.history.back()}
              className="mr-[14px] cursor-pointer"
            >
              <img src={backIcon} alt="" />
            </button>
            <span>{hasKeyword ? `“${searchRequest.keyword}” 검색` : '검색어를 입력해주세요'}</span>
            <button type="button" aria-label="검색 작업 메뉴" className="cursor-pointer">
              <img src={dropdownIcon} alt="" />
            </button>
          </div>
          <div className="flex items-center gap-[4px]">
            {[0, 1].map((id) => (
              <button
                key={id}
                type="button"
                className="flex h-[20px] cursor-pointer items-center gap-[4px] rounded-[4px] border border-gray-300 bg-white px-[8px] py-[2px] text-[12px] font-medium max-[720px]:hidden"
              >
                참조 파일 0<img src={infoIcon} alt="파일 정보" />
              </button>
            ))}
            <button
              type="button"
              className="ml-[12px] flex cursor-pointer items-center gap-[2px] text-[12px] text-gray-600"
            >
              <span className="flex h-[20px] w-[20px] items-center justify-center overflow-hidden">
                <img src={layerIcon} alt="" className="max-w-none shrink-0" />
              </span>
              새 작업
            </button>
          </div>
        </header>
        <main className="flex min-h-0 flex-1 justify-center overflow-hidden rounded-[8px] border-[0.5px] border-gray-300 bg-white">
          <div className="relative flex min-h-0 w-full flex-col items-center">
            <CategoryTabs />

            <div
              ref={resultsScrollRef}
              className="min-h-0 w-full flex-1 overflow-y-auto pb-[132px] [scrollbar-gutter:stable_both-edges]"
            >
              <FilterBar
                caseType={searchRequest.caseType}
                onCaseTypeChange={handleCaseTypeChange}
                court={searchRequest.court}
                onCourtChange={handleCourtChange}
                dateFrom={searchRequest.dateFrom}
                dateTo={searchRequest.dateTo}
                onDateChange={handleDateChange}
              />
              <ResultHeader
                resultCount={searchResult?.page.totalElements ?? 0}
                sort={searchRequest.sort ?? 'date,desc'}
                onSortChange={handleSortChange}
              />

              {!hasKeyword && (
                <div className="py-[3rem] text-center text-[0.875rem] text-gray-500">
                  검색어를 입력해주세요.
                </div>
              )}

              {hasKeyword && pageState === 'loading' && (
                <div className="py-[3rem] text-center text-[0.875rem] text-gray-500">
                  검색 결과를 불러오는 중입니다.
                </div>
              )}

              {hasKeyword && pageState === 'empty' && (
                <div className="py-[3rem] text-center text-[0.875rem] text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}

              {hasKeyword && pageState === 'error' && (
                <div className="py-[3rem] text-center text-[0.875rem] text-gray-500">
                  검색 결과를 불러오지 못했습니다.
                </div>
              )}

              {hasKeyword && pageState === 'success' && (
                <section className="mx-auto flex w-[694px] max-w-full flex-col gap-[4px]">
                  {searchResult?.content.map((result) => (
                    <SearchCard
                      key={result.id}
                      judgmentId={result.id}
                      keyword={searchRequest.keyword}
                      court={result.court}
                      decisionDate={
                        result.judgmentDate ? `${result.judgmentDate.replaceAll('-', '. ')}.` : ''
                      }
                      caseNumber={result.caseNumber}
                      title={result.caseName ?? ''}
                      preview={result.excerpt ?? ''}
                      resultLabel={result.resultType ?? ''}
                      categoryLabel={result.claimPurpose ?? ''}
                      views={result.viewCount ?? 0}
                    />
                  ))}
                </section>
              )}
              {totalPages > 0 && pageState !== 'empty' && (
                <nav
                  aria-label="검색 결과 페이지"
                  className="mx-auto flex w-[694px] max-w-full items-center justify-center gap-[16px] px-[16px] py-[20px] text-[12px] text-gray-600"
                >
                  <button
                    type="button"
                    disabled={pageState === 'loading' || currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="cursor-pointer rounded-[4px] border border-gray-300 px-[8px] py-[4px] disabled:cursor-default disabled:opacity-40"
                  >
                    이전
                  </button>
                  <span aria-live="polite">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={pageState === 'loading' || currentPage >= totalPages - 1}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="cursor-pointer rounded-[4px] border border-gray-300 px-[8px] py-[4px] disabled:cursor-default disabled:opacity-40"
                  >
                    다음
                  </button>
                </nav>
              )}
            </div>

            <PromptInput initialValue={searchRequest.keyword} onSearch={handleSearch} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResultPage;
