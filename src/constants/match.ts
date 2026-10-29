import type { GenderType, LevelType, MatchStatus, MatchType } from '../types/match';

export const MATCH_TYPE_LABELS: Record<MatchType, string> = {
  FIVE_VS_FIVE: '5vs5',
  SIX_VS_SIX: '6vs6',
  FOOTBALL: '축구',
};

export const GENDER_LABELS: Record<Exclude<GenderType, 'MIXED'>, string> = {
  MALE: '남자',
  FEMALE: '여자',
};

export const LEVEL_LABELS: Record<LevelType, string> = {
  STARTER: '입문',
  BASIC: '초급',
  INTERMEDIATE: '중급',
};

export const MATCH_STATUS_LABELS: Record<MatchStatus, string> = {
  OPEN: '모집 중',
  CLOSED: '마감',
  CANCELLED: '취소',
  CLOSING_SOON: '마감임박',
  CONFIRMING_SOON: '확정임박',
};
