import { useState } from 'react';

const CATEGORIES = [
  '판례',
  '결정례',
  '유권해석',
  '주석·실무서',
  '법령',
  '행정규칙',
  '자치법규',
  '내규·지침',
  '논문',
  '법률칼럼',
] as const;

type Category = (typeof CATEGORIES)[number];

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('판례');

  return (
    <nav
      aria-label="검색 자료 유형"
      className="flex h-[32px] w-full shrink-0 justify-center border-b-[0.5px] border-gray-300 pt-[4px]"
    >
      <ul className="flex h-full w-[685px] max-w-full items-end gap-[2px] overflow-x-auto px-[16px] max-[720px]:w-full">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <li key={category} className="h-full">
              <button
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isSelected}
                className={`flex h-full cursor-pointer items-center border-b-2 px-[8px] pt-[4px] pb-[6px] text-[11px] leading-[16px] whitespace-nowrap font-medium ${
                  isSelected ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-600'
                }`}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryTabs;
