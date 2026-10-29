import type { Match } from '../../types/match';
import FavoriteButton from '../common/FavoriteButton';

export type MatchCardProps = {
  match: Match;
  selected: boolean;
  favoriteCount: number;
  onFavoriteClick: () => void;
};

function MatchCard({ match, selected, favoriteCount, onFavoriteClick }: MatchCardProps) {
  return (
    <article className="flex items-center gap-4 bg-bg-neutral-transparent px-4 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <img
          src={match.imageSrc}
          alt="축구장 전경"
          width={74}
          height={74}
          loading="lazy"
          decoding="async"
          className="size-[74px] shrink-0 rounded-small object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <time dateTime={match.startsAt} className="text-fg-accent-info-blue typo-body-large-sb">
              {match.startsAt}
            </time>
            <span className="inline-flex h-[17px] shrink-0 items-center justify-center rounded-full bg-bg-accent-blue-weak px-2 text-fg-accent-info-blue typo-label-small-sb">
              {match.badge}
            </span>
          </div>
          <h3
            className="truncate text-fg-neutral-default typo-body-large-sb"
            title={match.stadiumName}
          >
            {match.stadiumName}
          </h3>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-1 whitespace-nowrap">
            <span className="text-fg-neutral-muted typo-body-medium-sb">{match.format}</span>
            <span className="text-fg-neutral-subtle typo-body-medium-md">{match.level}</span>
            <span className="text-fg-neutral-subtle typo-body-medium-md">{match.parking}</span>
          </div>
        </div>
      </div>
      <div className="flex w-9 shrink-0 flex-col items-center justify-center">
        <FavoriteButton
          selected={selected}
          onClick={onFavoriteClick}
          aria-label={`${match.stadiumName} 즐겨찾기`}
          className="h-9"
        />
        <span className="w-full text-center text-fg-neutral-subtle typo-body-small-md">
          <span className="sr-only">즐겨찾기 </span>
          {favoriteCount}
        </span>
      </div>
    </article>
  );
}

export default MatchCard;
