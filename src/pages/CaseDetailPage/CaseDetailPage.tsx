import { useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import ContentPanel from '../../components/layout/ContentPanel';
import ScrollPane from '../../components/layout/ScrollPane';
import { useJudgmentCitations } from '../../hooks/queries/useJudgmentCitations';
import { useJudgmentDetail } from '../../hooks/queries/useJudgmentDetail';
import { getAutoOpenPanel } from '../../hooks/useAutoOpenPanel';
import ErrorPage from '../ErrorPage/ErrorPage';
import { toCaseDetail, toCitationSections } from './caseDetail.mapper';
import CaseCompareView from './components/CaseCompareView';
import CaseDocument from './components/CaseDocument';
import CitationPanel from './components/CitationPanel';
import DocumentToolbar from './components/DocumentToolbar';
import PaneMessage from './components/PaneMessage';
import ScrollTopButton from './components/ScrollTopButton';

/** 주소의 id가 양의 정수가 아니면 null */
const parseJudgmentId = (value: string | undefined) => {
  if (!value || !/^\d+$/.test(value)) {
    return null;
  }
  const judgmentId = Number(value);
  return Number.isSafeInteger(judgmentId) && judgmentId > 0 ? judgmentId : null;
};

function CaseDetailPage() {
  const { judgmentId } = useParams();
  const id = parseJudgmentId(judgmentId);

  if (id === null) {
    return <ErrorPage />;
  }
  // 다른 판례로 이동하면 패널·비교 상태가 초기화되도록 id를 key로 쓴다
  return <JudgmentView key={id} judgmentId={id} />;
}

function JudgmentView({ judgmentId }: { judgmentId: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword')?.trim() ?? '';
  const [isPanelOpen, setIsPanelOpen] = useState(getAutoOpenPanel);
  const [comparedCaseId, setComparedCaseId] = useState<number | null>(null);

  const detail = useJudgmentDetail(judgmentId);
  const citations = useJudgmentCitations(judgmentId);
  const compared = useJudgmentDetail(comparedCaseId ?? undefined);

  const caseDetail = useMemo(() => (detail.data ? toCaseDetail(detail.data) : null), [detail.data]);
  const comparedDetail = useMemo(
    () => (compared.data ? toCaseDetail(compared.data) : null),
    [compared.data],
  );
  const citationSections = useMemo(
    () => (citations.data ? toCitationSections(citations.data) : []),
    [citations.data],
  );

  if (detail.isError) {
    return <ErrorPage />;
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 비교 화면에서 패널 버튼을 누르면 비교를 닫고 패널로 돌아감
  const togglePanel = () => {
    if (comparedCaseId !== null) {
      setComparedCaseId(null);
      setIsPanelOpen(true);
      return;
    }
    setIsPanelOpen((prev) => !prev);
  };

  let content;
  if (!caseDetail) {
    content = (
      <ContentPanel>
        <ScrollPane>
          <PaneMessage>판례를 불러오는 중입니다.</PaneMessage>
        </ScrollPane>
      </ContentPanel>
    );
  } else if (comparedCaseId !== null) {
    content = (
      <CaseCompareView
        original={caseDetail}
        compared={comparedDetail}
        comparedStatus={compared.status}
        onClose={() => setComparedCaseId(null)}
        onTogglePanel={togglePanel}
      />
    );
  } else {
    content = (
      <ContentPanel
        aside={
          isPanelOpen && (
            <CitationPanel
              title={caseDetail.title}
              caseName={caseDetail.caseName}
              sections={citationSections}
              citationsStatus={citations.status}
              onClose={() => setIsPanelOpen(false)}
              onSelectCase={setComparedCaseId}
            />
          )
        }
      >
        <ScrollPane
          scrollRef={scrollRef}
          floating={
            <>
              <DocumentToolbar isPanelOpen={isPanelOpen} onTogglePanel={togglePanel} />
              <ScrollTopButton onClick={scrollToTop} isPanelOpen={isPanelOpen} />
            </>
          }
        >
          <CaseDocument detail={caseDetail} />
        </ScrollPane>
      </ContentPanel>
    );
  }

  const title = keyword ? `“${keyword}” 검색` : '검색어를 입력해주세요';

  return <AppLayout title={title}>{content}</AppLayout>;
}

export default CaseDetailPage;
