import type { QueryStatus } from '@tanstack/react-query';
import { useRef } from 'react';
import iconXmark from '../../../assets/icons/common/icon-xmark.svg';
import IconButton from '../../../components/common/IconButton';
import ContentPanel from '../../../components/layout/ContentPanel';
import ScrollPane from '../../../components/layout/ScrollPane';
import type { CaseDetail } from '../caseDetail.types';
import CaseDocument from './CaseDocument';
import DocumentToolbar from './DocumentToolbar';
import PaneMessage from './PaneMessage';
import ScrollTopButton from './ScrollTopButton';

interface CaseCompareViewProps {
  /** 왼쪽에 놓는 원래 보던 판결 */
  original: CaseDetail;
  /** 오른쪽에 놓는 비교할 인용 판결. 불러오는 중이거나 실패하면 null */
  compared: CaseDetail | null;
  comparedStatus: QueryStatus;
  onClose: () => void;
  onTogglePanel: () => void;
}

function CaseCompareView({
  original,
  compared,
  comparedStatus,
  onClose,
  onTogglePanel,
}: CaseCompareViewProps) {
  const originalRef = useRef<HTMLDivElement>(null);
  const comparedRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    originalRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    comparedRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ContentPanel>
      <ScrollPane
        scrollRef={originalRef}
        floating={<DocumentToolbar isPanelOpen={false} onTogglePanel={onTogglePanel} />}
      >
        <CaseDocument detail={original} />
      </ScrollPane>

      <div aria-hidden="true" className="w-px shrink-0 bg-(--color-border-default)" />

      <ScrollPane
        scrollRef={comparedRef}
        floating={
          <>
            <IconButton
              label="비교 화면 닫기"
              onClick={onClose}
              className="absolute top-[0.75rem] right-[0.75rem] size-[1.5rem]"
            >
              <img
                src={iconXmark}
                alt=""
                width={24}
                height={24}
                className="block size-[1.5rem] max-w-none"
              />
            </IconButton>
            <ScrollTopButton onClick={scrollToTop} />
          </>
        }
      >
        {compared ? (
          <CaseDocument detail={compared} />
        ) : (
          <PaneMessage>
            {comparedStatus === 'error'
              ? '판례를 불러오지 못했습니다.'
              : '판례를 불러오는 중입니다.'}
          </PaneMessage>
        )}
      </ScrollPane>
    </ContentPanel>
  );
}

export default CaseCompareView;
