function HomePage() {
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

      <ul className="space-y-3 px-4" aria-label="매치 리스트 자리표시자">
        {Array.from({ length: 12 }, (_, index) => (
          <li
            key={index}
            className="flex h-24 flex-col justify-center gap-1 rounded-medium border border-border-default bg-bg-neutral-weak px-4"
          >
            <h3 className="typo-body-medium-sb">매치 리스트 {index + 1}</h3>
            <p className="typo-body-small-md text-fg-neutral-muted">스크롤 확인용 자리표시자</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
