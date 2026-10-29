import type { CaseDetail } from '../caseDetail.types';
import CaseBody from './CaseBody';
import CaseHeader from './CaseHeader';

interface CaseDocumentProps {
  detail: CaseDetail;
}

/** 판결문 한 건(제목 + 본문). 상세 화면과 비교 화면이 함께 사용 */
function CaseDocument({ detail }: CaseDocumentProps) {
  return (
    <article className="mx-auto flex min-h-full w-full max-w-[46.75rem] flex-col items-center gap-px px-32">
      <CaseHeader title={detail.title} caseName={detail.caseName} />
      <CaseBody
        courtLines={detail.courtLines}
        infoRows={detail.infoRows}
        sections={detail.sections}
      />
    </article>
  );
}

export default CaseDocument;
