import type { ReactNode } from 'react';

/** 본문 영역에 보여주는 불러오는 중 / 실패 안내 */
function PaneMessage({ children }: { children: ReactNode }) {
  return <p className="body-md py-[3rem] text-center text-gray-600">{children}</p>;
}

export default PaneMessage;
