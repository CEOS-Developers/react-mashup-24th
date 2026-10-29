import type { ReactNode, Ref } from 'react';

interface ScrollPaneProps {
  children: ReactNode;
  /** 스크롤과 무관하게 이 영역 위에 떠 있는 요소 (툴바, 맨 위로 버튼 등) */
  floating?: ReactNode;
  scrollRef?: Ref<HTMLDivElement>;
}

function ScrollPane({ children, floating, scrollRef }: ScrollPaneProps) {
  return (
    <div className="relative flex min-h-px min-w-px flex-[1_0_0] flex-col">
      <div ref={scrollRef} className="min-h-px flex-[1_0_0] [scrollbar-width:none] overflow-y-auto">
        {children}
      </div>
      {floating}
    </div>
  );
}

export default ScrollPane;
