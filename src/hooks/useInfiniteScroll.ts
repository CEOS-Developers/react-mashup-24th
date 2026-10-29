import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  enabled: boolean;
  onLoadMore: () => unknown;
}

export function useInfiniteScroll({ enabled, onLoadMore }: UseInfiniteScrollOptions) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!enabled || !target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onLoadMore();
      },
      { rootMargin: '0px 0px 240px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, onLoadMore]);

  return targetRef;
}
