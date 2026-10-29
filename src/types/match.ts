export type MatchType = 'FIVE_VS_FIVE' | 'SIX_VS_SIX' | 'FOOTBALL';
export type GenderType = 'MIXED' | 'FEMALE' | 'MALE';
export type LevelType = 'STARTER' | 'BASIC' | 'INTERMEDIATE';
export type MatchStatus = 'OPEN' | 'CLOSED' | 'CANCELLED' | 'CLOSING_SOON' | 'CONFIRMING_SOON';
export type MatchFeature = 'AI_REPORT' | 'SCREEN';

export interface MatchFilters {
  cityId?: number;
  areaId?: number[];
  timeAfter?: number;
  matchType?: MatchType[];
  gender?: GenderType;
  level?: LevelType[];
  status?: Extract<MatchStatus, 'CONFIRMING_SOON' | 'CLOSING_SOON'>[];
  indoor?: boolean;
  awning?: boolean;
  parking?: boolean;
  shoeRental?: boolean;
  earlybird?: boolean;
  feature?: MatchFeature[];
  hideClosed?: boolean;
}

export interface MatchListQuery extends MatchFilters {
  /** KST 기준 YYYY-MM-DD */
  date: string;
  size?: number;
}

export interface MatchListParams extends MatchListQuery {
  page?: number;
}

export interface MatchListItemResponse {
  matchId: number;
  startTime: string;
  endTime: string;
  price: number;
  stadiumId: number;
  stadiumName: string;
  stadiumAddress: string;
  stadiumImageUrl: string;
  areaId: number;
  areaName: string;
  cityId: number;
  cityName: string;
  matchType: MatchType;
  genderType: GenderType;
  levelType: LevelType;
  status: MatchStatus;
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  remainingSlots: number;
  canApply: boolean;
  isClosingSoon: boolean;
  isConfirmingSoon: boolean;
  isIndoor: boolean;
  hasAwning: boolean;
  hasParking: boolean;
  hasShoeRental: boolean;
  parkingCapacity: number;
  reservedParkingCount: number;
  isEarlybird: boolean;
  hasAiReport: boolean;
  hasScreen: boolean;
  isFavorite: boolean;
  favoriteCount: number;
}

export interface MatchListResponse {
  content: MatchListItemResponse[];
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface MatchFavoriteResponse {
  matchId: number;
  isFavorite: boolean;
  favoriteCount: number;
}
