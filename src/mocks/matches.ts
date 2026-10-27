import type { Match } from '../types/match';
import pitchDay from '../assets/images/pitch-day.jpg';
import pitchNight from '../assets/images/pitch-night.jpg';
import pitchAerial from '../assets/images/pitch-aerial.jpg';

// UI 확인용 목데이터입니다. 구장명과 아래 사진은 실제 구장 정보로 연결되지 않습니다.
// 사진 출처: https://unsplash.com/photos/Jhoxmp6Zrjg
// https://unsplash.com/photos/Q1nOuKleRoc · https://unsplash.com/photos/4SjLKtyTHzM
const stadiumNames = [
  '서울 성수 풋살장',
  '서울 잠실 풋살파크',
  '서울 용산 아이파크',
  '서울 강남 스포츠파크',
  '서울 영등포 풋살장',
  '서울 상암 풋볼파크',
  '서울 마포 루프탑',
  '서울 송파 풋살파크',
  '서울 양재 스포츠파크',
  '서울 강서 풋살장',
  '경기 분당 풋살파크',
  '경기 수원 스포츠파크',
  '경기 하남 풋살장',
  '경기 일산 풋볼파크',
  '경기 부천 풋살파크',
  '인천 송도 풋살장',
  '인천 부평 스포츠파크',
  '경기 안양 풋살파크',
  '경기 광명 풋볼파크',
  '경기 의정부 풋살장',
];

const images = [pitchDay, pitchNight, pitchAerial];
const levels = ['모든 레벨', '초급', '중급'];

export const mockMatches: Match[] = stadiumNames.map((stadiumName, index) => ({
  id: `match-${index + 1}`,
  startsAt: `${10 + Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
  stadiumName,
  imageSrc: images[index % images.length],
  format: index % 3 === 1 ? '5vs5' : '6vs6',
  level: levels[index % levels.length],
  parking: index % 5 === 3 ? '주차 불가' : '주차',
  badge: '확정임박',
  favoriteCount: index === 0 ? 1 : (index * 7) % 24,
  isFavorite: index % 5 === 0,
}));
