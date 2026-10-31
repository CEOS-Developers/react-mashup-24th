import iconHomeFilled from '../assets/icons/icon-home-filled.svg';
import iconFavStroke from '../assets/icons/icon-fav-stroke.svg';
import iconCalendarStroke from '../assets/icons/icon-calendar-stroke.svg';
import iconMyStroke from '../assets/icons/icon-my-stroke.svg';

const navItems = [
  { id: 'home', label: '홈', icon: iconHomeFilled },
  { id: 'favorites', label: '즐겨찾기', icon: iconFavStroke },
  { id: 'schedule', label: '일정', icon: iconCalendarStroke },
  { id: 'my', label: '마이', icon: iconMyStroke },
] as const;

type BottomNavProps = {
  onSelect?: (id: (typeof navItems)[number]['id']) => void;
};

function BottomNav({ onSelect }: BottomNavProps) {
  return (
    <nav
      aria-label="하단 메뉴"
      className="fixed bottom-0 left-1/2 z-30 flex h-[96px] w-[375px] -translate-x-1/2 items-start justify-between border-t border-border-default bg-bg-layer-default px-4"
    >
      {navItems.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          aria-current={id === 'home' ? 'page' : undefined}
          onClick={() => onSelect?.(id)}
          className="flex w-[62px] shrink-0 flex-col items-center gap-1 py-3 text-fg-neutral-default cursor-pointer rounded-small focus-visible:outline-2 focus-visible:outline-border-focus"
        >
          <img src={icon} alt="" className="size-6" />
          <span className="typo-label-small-sb">{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
