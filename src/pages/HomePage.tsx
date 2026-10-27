import { useState } from 'react';
import MatchCard from '../components/match/MatchCard';
import { mockMatches } from '../mocks/matches';

function HomePage() {
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(mockMatches.filter((match) => match.isFavorite).map((match) => match.id)),
  );

  const toggleFavorite = (id: string) => {
    setFavoriteIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="text-fg-neutral-default">
      <section className="flex h-13 items-center bg-bg-neutral-weak px-4">
        <h1 className="typo-body-medium-sb">1번 영역 · 52px</h1>
      </section>

      <section className="py-2.5" aria-label="2번 영역">
        <div className="flex h-8 items-center bg-bg-accent-blue-weak px-4">
          <h2 className="typo-body-medium-sb">2번 영역 · 32px · 위아래 10px</h2>
        </div>
      </section>

      <section className="pt-3 pb-4" aria-label="3번 영역">
        <div className="flex h-29 flex-col justify-center gap-1 bg-bg-accent-red-weak px-4">
          <h2 className="typo-body-medium-sb">3번 영역 · 116px</h2>
          <p className="typo-body-small-md text-fg-neutral-muted">위 12px · 아래 16px</p>
        </div>
      </section>

      <section className="sticky top-0 z-20 mb-3 flex h-31 flex-col justify-center gap-1 border-b border-border-default bg-bg-brand-subtle px-4">
        <h2 className="typo-body-medium-sb">4번 영역 · 124px · 상단 고정</h2>
        <p className="typo-body-small-md text-fg-neutral-muted">
          화면 상단에 닿으면 고정됩니다. 아래 매치 리스트와의 간격은 12px입니다.
        </p>
      </section>

      <ul aria-label="소셜 매치 목록">
        {mockMatches.map((match) => (
          <li key={match.id}>
            <MatchCard
              match={match}
              selected={favoriteIds.has(match.id)}
              favoriteCount={
                match.favoriteCount + Number(favoriteIds.has(match.id)) - Number(match.isFavorite)
              }
              onFavoriteClick={() => toggleFavorite(match.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
