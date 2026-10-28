const TABS = ['데뷔 혜택', '소셜 매치', '게스트', '팀', '구장 예약'];

type MainTabsProps = {
  selected: string;
};

function MainTabs({ selected }: MainTabsProps) {
  return (
    <nav
      aria-label="메인 메뉴"
      className="flex h-13 items-center gap-3 overflow-x-auto px-4 [scrollbar-width:none]"
    >
      {TABS.map((tab) => {
        const isSelected = tab === selected;
        return (
          <button
            key={tab}
            type="button"
            aria-current={isSelected ? 'page' : undefined}
            className={`shrink-0 cursor-pointer py-2 ${isSelected ? 'typo-head-large-sb text-fg-neutral-default' : 'typo-head-large-md text-fg-neutral-subtle'}`}
          >
            {tab}
          </button>
        );
      })}
    </nav>
  );
}

export default MainTabs;
