import { LEVEL_LABELS, MATCH_STATUS_LABELS, MATCH_TYPE_LABELS } from '../../constants/match';
import { useMatchFavorite } from '../../hooks/useMatchFavorite';
import type { MatchListItemResponse } from '../../types/match';
import { formatMatchTime } from '../../utils/date';
import FavoriteButton from '../common/FavoriteButton';

export type MatchCardProps = {
  match: MatchListItemResponse;
};

function MatchCard({ match }: MatchCardProps) {
  const { setFavorite, isPending } = useMatchFavorite(match.matchId);

  return (
    <article className="flex items-center gap-4 bg-bg-neutral-transparent px-4 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <img
          src={match.stadiumImageUrl}
          alt={`${match.stadiumName} 전경`}
          width={74}
          height={74}
          loading="lazy"
          decoding="async"
          className="size-[74px] shrink-0 rounded-small object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <time
              dateTime={match.startTime}
              className="text-fg-accent-info-blue typo-body-large-sb"
            >
              {formatMatchTime(match.startTime)}
            </time>
            <span
              className={`inline-flex h-[17px] shrink-0 items-center justify-center rounded-full px-2 typo-label-small-sb ${match.canApply ? 'bg-bg-accent-blue-weak text-fg-accent-info-blue' : 'bg-bg-neutral-weak text-fg-neutral-muted'}`}
            >
              {MATCH_STATUS_LABELS[match.status]}
            </span>
          </div>
          <h3
            className="truncate text-fg-neutral-default typo-body-large-sb"
            title={match.stadiumName}
          >
            {match.stadiumName}
          </h3>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-1 whitespace-nowrap">
            <span className="text-fg-neutral-muted typo-body-medium-sb">
              {MATCH_TYPE_LABELS[match.matchType]}
            </span>
            <span className="text-fg-neutral-subtle typo-body-medium-md">
              {LEVEL_LABELS[match.levelType]}
            </span>
            <span className="text-fg-neutral-subtle typo-body-medium-md">
              {match.hasParking ? '주차' : '주차 불가'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-9 shrink-0 flex-col items-center justify-center">
        <FavoriteButton
          selected={match.isFavorite}
          onClick={() => setFavorite(!match.isFavorite)}
          disabled={isPending}
          aria-busy={isPending}
          aria-label={`${match.stadiumName} 즐겨찾기`}
          className="h-9"
        />
        <span className="w-full text-center text-fg-neutral-subtle typo-body-small-md">
          <span className="sr-only">즐겨찾기 </span>
          {match.favoriteCount}
        </span>
      </div>
    </article>
  );
}

export default MatchCard;
