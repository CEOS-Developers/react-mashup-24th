const BANNERS = ['banner-1', 'banner-2', 'banner-3'];

function Banner() {
  return (
    <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pt-3 pb-4 [scrollbar-width:none]">
      {BANNERS.map((banner) => (
        <div
          key={banner}
          aria-hidden="true"
          className="h-29 w-[343px] shrink-0 snap-center rounded-large bg-bg-neutral-subtle"
        />
      ))}
    </div>
  );
}

export default Banner;
