import { Link } from 'react-router-dom';
import checkIcon from '../../../assets/icons/search/icon-check.svg';

interface SearchCardProps {
  judgmentId: number;
  keyword?: string;
  court?: string;
  decisionDate?: string;
  caseNumber?: string;
  title?: string;
  preview?: string;
  resultLabel?: string;
  categoryLabel?: string;
  views?: number;
}

const SearchCard = ({
  judgmentId,
  keyword = '',
  court = '서울중앙지방법원',
  decisionDate = '2023. 4. 13.',
  caseNumber = '2022가단5065289',
  title = '',
  preview = '',
  resultLabel = '원고일부승',
  categoryLabel = '청구취지',
  views = 859,
}: SearchCardProps) => {
  return (
    <article className="min-h-[184px] w-full border-b-[0.5px] border-gray-300 px-[16px] py-[20px]">
      <div className="flex flex-col gap-[1rem]">
        <div className="flex w-[394px] max-w-full flex-col gap-[0.5rem]">
          <Link
            to={{
              pathname: `/judgments/${judgmentId}`,
              search: keyword ? `?${new URLSearchParams({ keyword })}` : '',
            }}
            className="cursor-pointer text-[1rem] font-medium leading-[1rem] text-purple-400"
          >
            {court} {decisionDate} 선고 {caseNumber} 판결
          </Link>

          <p className="text-[0.875rem] leading-[1rem] text-gray-900">[{title}]</p>
        </div>

        <p className="line-clamp-3 min-h-[60px] text-[14px] leading-[20px] tracking-[-0.6px] text-gray-600">
          {preview}
        </p>
      </div>

      <div className="mt-[0.5rem] flex items-center justify-between">
        <div className="flex items-center gap-[0.5rem]">
          <span className="flex items-center gap-[0.125rem] rounded-[0.25rem] bg-gray-200 px-[0.25rem] py-[0.125rem] text-[0.6875rem] font-medium leading-[16px] text-gray-900">
            <img src={checkIcon} alt="" />
            {resultLabel}
          </span>

          <span className="rounded-[0.25rem] bg-gray-200 px-[0.25rem] py-[0.125rem] text-[0.6875rem] font-medium leading-[16px] text-gray-900">
            {categoryLabel}
          </span>
        </div>

        <span className="text-[12px] leading-[16px] text-gray-600">
          조회 {views.toLocaleString()}
        </span>
      </div>
    </article>
  );
};

export default SearchCard;
