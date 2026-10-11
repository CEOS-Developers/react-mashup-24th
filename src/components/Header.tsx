import logo from '../assets/logo.svg';
import iconSearch from '../assets/icons/icon-search.svg';
import iconNotification from '../assets/icons/icon-notification.svg';

type HeaderProps = {
  onLogoClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
};

function Header({ onLogoClick, onSearchClick, onNotificationClick }: HeaderProps) {
  return (
    <header className="flex h-[52px] w-[375px] items-center justify-between bg-bg-neutral-default px-4">
      <button
        type="button"
        aria-label="플랩풋볼 홈"
        onClick={onLogoClick}
        className="flex h-10 shrink-0 cursor-pointer items-center justify-start rounded-small focus-visible:outline-2 focus-visible:outline-border-focus"
      >
        <img src={logo} alt="" className="h-8 w-auto" />
      </button>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="검색"
          onClick={onSearchClick}
          className="flex size-10 cursor-pointer items-center justify-center rounded-small focus-visible:outline-2 focus-visible:outline-border-focus"
        >
          <img src={iconSearch} alt="" className="size-6" />
        </button>
        <button
          type="button"
          aria-label="알림"
          onClick={onNotificationClick}
          className="flex size-10 cursor-pointer items-center justify-center rounded-small focus-visible:outline-2 focus-visible:outline-border-focus"
        >
          <img src={iconNotification} alt="" className="size-6" />
        </button>
      </div>
    </header>
  );
}

export default Header;
