export interface CityResponse {
  cityId: number;
  name: string;
}

export interface AreaResponse {
  areaId: number;
  name: string;
  cityId: number;
  cityName: string;
  isFavorite: boolean;
}

export interface FavoriteAreaResponse {
  areaId: number;
  isFavorite: boolean;
}

export interface RegionSelection {
  cityId: number | null;
  areaIds: number[];
}
