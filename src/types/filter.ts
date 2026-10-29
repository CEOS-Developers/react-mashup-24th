export type FilterState = {
  status: string[];
  time: string | null;
  gender: string[];
};

export type FilterPreset = {
  id: string;
  name: string;
  filter: FilterState;
};
