export type MatchStatus = 'CLOSING_SOON' | 'CONFIRMING_SOON';
export type MatchType = 'FIVE_VS_FIVE' | 'SIX_VS_SIX' | 'FOOTBALL';
export type Gender = 'MALE' | 'FEMALE' | 'MIXED';
export type Level = 'STARTER' | 'BASIC' | 'INTERMEDIATE';
export type Feature = 'AI_REPORT' | 'SCREEN';

export type FilterState = {
  status: MatchStatus[];
  timeAfter: number | null;
  matchType: MatchType[];
  gender: Gender | null;
  level: Level[];
  feature: Feature[];
  indoor: boolean;
  awning: boolean;
  parking: boolean;
  earlybird: boolean;
  shoeRental: boolean;
};

export type MultiKey = 'status' | 'matchType' | 'level' | 'feature';
export type SingleKey = 'timeAfter' | 'gender';
export type BooleanKey = 'indoor' | 'awning' | 'parking' | 'earlybird' | 'shoeRental';

export type FilterOption = { value: string | number; label: string };

export type FilterSectionConfig =
  | { type: 'multi'; key: MultiKey; title: string; options: FilterOption[] }
  | { type: 'single'; key: SingleKey; title: string; options: FilterOption[] }
  | { type: 'boolean'; title: string; options: FilterOption[] };

export type FilterPreset = {
  id: string;
  name: string;
  filter: FilterState;
};
