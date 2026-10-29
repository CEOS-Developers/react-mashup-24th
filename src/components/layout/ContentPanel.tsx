import type { ReactNode } from 'react';

interface ContentPanelProps {
  /** 본문 영역들. 한 개면 ScrollPane 하나, 비교 화면처럼 나눌 때는 여러 개 */
  children: ReactNode;
  /** 본문 오른쪽에 붙는 사이드 패널 */
  aside?: ReactNode;
}

function ContentPanel({ children, aside }: ContentPanelProps) {
  return (
    <div className="flex min-h-px w-full flex-[1_0_0] flex-col items-center overflow-clip bg-gray-100 pr-8 pb-8">
      <div className="flex min-h-px w-full flex-[1_0_0] overflow-hidden rounded-md border-[0.5px] border-(--color-border-default) bg-(--color-surface-default)">
        {children}
        {aside}
      </div>
    </div>
  );
}

export default ContentPanel;
