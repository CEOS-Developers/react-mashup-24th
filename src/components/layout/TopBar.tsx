import { useLocation, useNavigate } from 'react-router-dom';
import iconDropdown from '../../assets/icons/topbar/icon-dropdown-filled.svg';
import iconInfo from '../../assets/icons/topbar/icon-info.svg';
import iconLayer from '../../assets/icons/topbar/icon-layer-20.svg';
import iconArrowLeft from '../../assets/icons/common/icon-arrow.svg';
import IconButton from '../common/IconButton';

interface ReferenceBadgeProps {
  count: number;
}

function ReferenceBadge({ count }: ReferenceBadgeProps) {
  return (
    <button
      type="button"
      className="flex h-[1.25rem] shrink-0 cursor-pointer items-center justify-center gap-4 overflow-clip rounded-sm border border-(--color-border-default) bg-(--color-surface-default) px-8 py-[0.125rem]"
    >
      <span className="shrink-0 text-[0.75rem] leading-[1.4] font-medium whitespace-nowrap text-(--color-text-primary)">
        참조 파일 {count}
      </span>
      <span className="relative block size-[0.8125rem] shrink-0 overflow-clip">
        <img
          src={iconInfo}
          alt=""
          width={9}
          height={9}
          className="absolute top-[0.125rem] left-[0.125rem] block size-[0.5625rem] max-w-none"
        />
      </span>
    </button>
  );
}

interface TopBarProps {
  title: string;
}

function TopBar({ title }: TopBarProps) {
  const navigate = useNavigate();
  const { key } = useLocation();

  const goBack = () => {
    if (key === 'default') {
      navigate('/');
      return;
    }
    navigate(-1);
  };

  return (
    <header className="flex h-[2.5rem] w-full shrink-0 items-center justify-between bg-gray-100 px-[1.25rem] py-8">
      <div className="flex shrink-0 items-start gap-[0.125rem]">
        <div className="flex shrink-0 items-center gap-16">
          <IconButton label="뒤로가기" onClick={goBack} className="size-[1.25rem]">
            <img
              src={iconArrowLeft}
              alt=""
              width={20}
              height={20}
              className="block size-[1.25rem] max-w-none"
            />
          </IconButton>
          <p className="shrink-0 text-[0.875rem] leading-[normal] font-medium whitespace-nowrap text-gray-900">
            {title}
          </p>
        </div>
        <IconButton label="검색 기록 열기" className="size-[1rem]">
          <img
            src={iconDropdown}
            alt=""
            width={16}
            height={16}
            className="block size-[1rem] max-w-none"
          />
        </IconButton>
      </div>

      <div className="flex shrink-0 items-center gap-16">
        <div className="flex shrink-0 items-center gap-4">
          <ReferenceBadge count={0} />
          <ReferenceBadge count={0} />
        </div>
        <button type="button" className="flex shrink-0 cursor-pointer items-end gap-[0.125rem]">
          <img
            src={iconLayer}
            alt=""
            width={20}
            height={20}
            className="block size-[1.25rem] max-w-none shrink-0"
          />
          <span className="shrink-0 text-[0.75rem] leading-[1.4] font-medium whitespace-nowrap text-gray-600">
            새 작업
          </span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
