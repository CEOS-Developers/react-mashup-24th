import iconStarter from '../assets/icons/icon-category-starter.svg';
import iconFemale from '../assets/icons/icon-category-female.svg';
import iconAi from '../assets/icons/icon-category-ai.svg';
import iconFootball from '../assets/icons/icon-category-football.svg';
import iconAmateur from '../assets/icons/icon-category-amateur.svg';

const CATEGORIES = [
  { label: '스타터', icon: iconStarter },
  { label: '여자', icon: iconFemale },
  { label: 'AI 리포트', icon: iconAi },
  { label: '축구', icon: iconFootball },
  { label: '아마추어2 이하', icon: iconAmateur },
];

function CategoryChips() {
  return (
    <div className="pointer-events-none -my-[22px] flex gap-2 overflow-x-auto px-4 py-8 [scrollbar-width:none]">
      {CATEGORIES.map((category) => (
        <button
          key={category.label}
          type="button"
          className="pointer-events-auto flex h-8 shrink-0 cursor-pointer items-center gap-1 rounded-full bg-bg-layer-floating px-3 typo-button-medium-md text-fg-neutral-default shadow-[0_4px_32px_0_rgba(0,0,0,0.16)]"
        >
          <img src={category.icon} alt="" className="size-5" />
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
