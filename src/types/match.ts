export type Match = {
  id: string;
  startsAt: string;
  stadiumName: string;
  imageSrc: string;
  format: '5vs5' | '6vs6';
  level: string;
  parking: string;
  badge: string;
  favoriteCount: number;
  isFavorite: boolean;
};
