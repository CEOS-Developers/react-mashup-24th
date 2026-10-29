import type { FilterSectionConfig, FilterState } from '../types/filter';

export const EMPTY_FILTER: FilterState = {
  status: [],
  timeAfter: null,
  matchType: [],
  gender: null,
  level: [],
  feature: [],
  indoor: false,
  awning: false,
  parking: false,
  earlybird: false,
  shoeRental: false,
};

// TODO: 매치 타입·레벨·혜택·기타 칩 이름은 디자이너 확인 후 수정
export const FILTER_SECTIONS: FilterSectionConfig[] = [
  {
    type: 'multi',
    key: 'status',
    title: '상태',
    options: [
      { value: 'CLOSING_SOON', label: '마감임박' },
      { value: 'CONFIRMING_SOON', label: '확정임박' },
    ],
  },
  {
    type: 'single',
    key: 'timeAfter',
    title: '시간',
    options: [
      { value: 18, label: '18시 이후' },
      { value: 20, label: '20시 이후' },
      { value: 22, label: '22시 이후' },
      { value: 23, label: '23시 이후' },
    ],
  },
  {
    type: 'multi',
    key: 'matchType',
    title: '매치 타입',
    options: [
      { value: 'FIVE_VS_FIVE', label: '5vs5' },
      { value: 'SIX_VS_SIX', label: '6vs6' },
      { value: 'FOOTBALL', label: '축구' },
    ],
  },
  {
    type: 'single',
    key: 'gender',
    title: '성별',
    options: [
      { value: 'MALE', label: '남자' },
      { value: 'FEMALE', label: '여자' },
      { value: 'MIXED', label: '혼성' },
    ],
  },
  {
    type: 'multi',
    key: 'level',
    title: '레벨',
    options: [
      { value: 'STARTER', label: '스타터' },
      { value: 'BASIC', label: '비기너' },
      { value: 'INTERMEDIATE', label: '아마추어' },
    ],
  },
  {
    type: 'boolean',
    title: '시설',
    options: [
      { value: 'indoor', label: '실내' },
      { value: 'awning', label: '그늘막' },
      { value: 'parking', label: '주차' },
      { value: 'shoeRental', label: '신발 대여' },
    ],
  },
  {
    type: 'boolean',
    title: '혜택',
    options: [{ value: 'earlybird', label: '얼리버드' }],
  },
  {
    type: 'multi',
    key: 'feature',
    title: '기타',
    options: [
      { value: 'AI_REPORT', label: 'AI 리포트' },
      { value: 'SCREEN', label: '스크린' },
    ],
  },
];
