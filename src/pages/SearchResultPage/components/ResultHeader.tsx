import sortIcon from '../../../assets/icons/search/icon-sort.svg';
import type { JudgmentSearchSort } from '../../../types/judgment';

interface ResultHeaderProps {
  resultCount?: number;
  sort: JudgmentSearchSort;
  onSortChange: (sort: JudgmentSearchSort) => void;
}

const ResultHeader = ({ resultCount = 3798, sort, onSortChange }: ResultHeaderProps) => {
  return (
    <div className="mx-auto mt-[16px] mb-[8px] flex h-[16px] w-[685px] max-w-full items-center justify-between px-[16px]">
      <p className="text-[14px] leading-[16px] text-gray-600">
        검색 결과 {resultCount.toLocaleString()}개
      </p>

      <label className="flex cursor-pointer items-center gap-[0.125rem] text-[14px] leading-[16px] text-gray-600">
        <img src={sortIcon} alt="" />
        <select
          aria-label="판례 정렬"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as JudgmentSearchSort)}
          className="cursor-pointer appearance-none bg-transparent text-right"
        >
          <option value="date,desc">선고일순</option>
          <option value="viewCount,desc">조회수순</option>
        </select>
      </label>
    </div>
  );
};

export default ResultHeader;
