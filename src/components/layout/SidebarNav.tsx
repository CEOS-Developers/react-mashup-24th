import avatarDefault from '../../assets/icons/sidebar/avatar-default.svg';
import iconArchive from '../../assets/icons/sidebar/icon-archive.svg';
import iconBell from '../../assets/icons/sidebar/icon-bell.svg';
import iconColumn from '../../assets/icons/sidebar/icon-column.svg';
import iconHome from '../../assets/icons/sidebar/icon-home.svg';
import iconLayer from '../../assets/icons/sidebar/icon-layer.svg';
import iconOpenBook from '../../assets/icons/sidebar/icon-open-book.svg';
import iconPlay from '../../assets/icons/sidebar/icon-play.svg';
import iconQuestion from '../../assets/icons/sidebar/icon-question.svg';
import iconSidebarToggle from '../../assets/icons/sidebar/icon-sidebar-toggle.svg';
import iconTime from '../../assets/icons/sidebar/icon-time.svg';
import IconButton from '../common/IconButton';

interface NavItem {
  label: string;
  icon: string;
}

const HOME_ITEMS: NavItem[] = [
  { label: '홈', icon: iconHome },
  { label: '알림', icon: iconBell },
];

const MAIN_ITEMS: NavItem[] = [
  { label: '둘러보기', icon: iconOpenBook },
  { label: '컬럼', icon: iconColumn },
];

const LIBRARY_ITEMS: NavItem[] = [
  { label: '최근 기록', icon: iconTime },
  { label: '재생', icon: iconPlay },
  { label: '보관함', icon: iconArchive },
  { label: '레이어', icon: iconLayer },
];

const FOOTER_ITEMS: NavItem[] = [{ label: '도움말', icon: iconQuestion }];

const GROUP_CLASS = 'flex w-[3.5rem] flex-col items-center p-4';
const DIVIDER_CLASS = 'border-b-[0.5px] border-gray-300';

function NavButton({ label, icon }: NavItem) {
  return (
    <IconButton label={label} className="size-[2.25rem]">
      <img src={icon} alt="" width={36} height={36} className="block size-[2.25rem] max-w-none" />
    </IconButton>
  );
}

function SidebarNav() {
  return (
    <nav
      aria-label="사이드바"
      className="flex h-full w-[3.5rem] shrink-0 flex-col items-start bg-(--color-surface-tertiary)"
    >
      <div className="flex w-[3.5rem] shrink-0 flex-col items-start">
        <div className={`${GROUP_CLASS} ${DIVIDER_CLASS} shrink-0 gap-16 pb-16`}>
          <NavButton label="사이드바 열기" icon={iconSidebarToggle} />
          <IconButton label="프로필" className="size-[1.75rem] rounded-full">
            <img
              src={avatarDefault}
              alt=""
              width={28}
              height={28}
              className="block size-[1.75rem] max-w-none"
            />
          </IconButton>
          {HOME_ITEMS.map((item) => (
            <NavButton key={item.label} {...item} />
          ))}
        </div>
        <div className={`${GROUP_CLASS} ${DIVIDER_CLASS} shrink-0 gap-16`}>
          {MAIN_ITEMS.map((item) => (
            <NavButton key={item.label} {...item} />
          ))}
        </div>
      </div>

      <div className={`${GROUP_CLASS} ${DIVIDER_CLASS} min-h-px flex-[1_0_0] gap-16`}>
        {LIBRARY_ITEMS.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>

      <div className={`${GROUP_CLASS} shrink-0 gap-8`}>
        {FOOTER_ITEMS.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>
    </nav>
  );
}

export default SidebarNav;
