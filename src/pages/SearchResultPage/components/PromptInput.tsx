import { useState } from 'react';
import type { FormEvent } from 'react';

import archiveIcon from '../../../assets/icons/search/icon-archive-black.svg';
import arrowIcon from '../../../assets/icons/common/icon-arrow.svg';
import editIcon from '../../../assets/icons/search/icon-edit.svg';
import plusIcon from '../../../assets/icons/search/icon-plus.svg';
import searchIcon from '../../../assets/icons/search/icon-search.svg';
import starIcon from '../../../assets/icons/search/icon-star.svg';
import Icon from '../../../components/common/Icon';

interface PromptInputProps {
  initialValue: string;
  onSearch: (keyword: string) => void;
}

const PromptInput = ({ initialValue, onSearch }: PromptInputProps) => {
  const [prompt, setPrompt] = useState(initialValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = prompt.trim();
    if (!keyword) return;

    setPrompt(keyword);
    onSearch(keyword);
  };

  return (
    <div className="absolute bottom-0 left-1/2 z-[1] w-[684px] max-w-[calc(100%-32px)] -translate-x-1/2 bg-white pb-[8px]">
      <form
        onSubmit={handleSubmit}
        className="min-h-[100px] rounded-[16px] border-[0.5px] border-gray-400 bg-gray-100 p-[16px] shadow-[0_-12px_10px_rgba(255,255,255,0.9),0_2px_2px_rgba(0,0,0,0.02)]"
      >
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' &&
              (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
            ) {
              event.preventDefault();
            }
          }}
          placeholder="검색어를 입력해주세요"
          aria-label="검색어 입력"
          className="w-full bg-transparent text-[16px] leading-[16px] text-gray-900 outline-none placeholder:text-gray-900"
        />

        <div className="mt-[1rem] flex items-center justify-between">
          <div className="flex items-center gap-[4px]">
            <button
              type="button"
              aria-label="추가"
              className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center"
            >
              <img src={plusIcon} alt="" />
            </button>

            <button
              type="button"
              aria-label="아카이브"
              className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[8px] border border-gray-300 bg-white"
            >
              <img src={archiveIcon} alt="" />
            </button>
          </div>

          <div className="relative mr-[42px] flex h-[34px] items-center gap-0 rounded-[8px] border border-gray-300 p-[4px]">
            <button
              type="button"
              className="flex h-[24px] w-[40px] cursor-pointer items-center justify-center rounded-[4px] text-[14px] text-gray-900"
            >
              자동
            </button>

            <button
              type="button"
              aria-label="검색"
              className="flex h-[24px] w-[32px] cursor-pointer items-center justify-center rounded-[4px] bg-white shadow-[0_2px_4px_#00000029]"
            >
              <img src={searchIcon} alt="" />
            </button>

            <button
              type="button"
              aria-label="AI"
              className="flex h-[24px] w-[32px] cursor-pointer items-center justify-center rounded-[4px]"
            >
              <img src={starIcon} alt="" />
            </button>

            <button
              type="button"
              aria-label="편집"
              className="flex h-[24px] w-[32px] cursor-pointer items-center justify-center rounded-[4px]"
            >
              <img src={editIcon} alt="" />
            </button>

            <button
              type="submit"
              aria-label="전송"
              className="absolute right-[-43px] flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[8px] bg-gray-900"
            >
              <Icon src={arrowIcon} className="size-[1.25rem] rotate-90 text-white" />
            </button>
          </div>
        </div>
      </form>

      <p className="mt-[8px] text-center text-[12px] leading-[16px] tracking-[-0.4px] text-gray-500">
        AI 응답은 정확하지 않을 수 있습니다. 내용을 반드시 확인해 주세요.
      </p>
    </div>
  );
};

export default PromptInput;
