import type { JudgmentCitations, JudgmentDetail } from '../../types/judgment';
import type { CaseDetail, CaseTextSection, CitationSection } from './caseDetail.types';

const formatJudgmentDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return year && month && day ? `${year}. ${month}. ${day}.` : date;
};

const toTextSection = (heading: string, text: string): CaseTextSection[] => {
  const paragraphs = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return paragraphs.length > 0 ? [{ heading, paragraphs }] : [];
};

export const toCaseDetail = (detail: JudgmentDetail): CaseDetail => ({
  title: `${detail.court} ${formatJudgmentDate(detail.judgmentDate)} 선고 ${detail.caseNumber} 판결`,
  caseName: `[${detail.caseName}]`,
  courtLines: [detail.court, '판결'],
  infoRows: [{ label: '사건', lines: [`${detail.caseNumber} ${detail.caseName}`] }],
  sections: [
    ...toTextSection('판시사항', detail.headnote),
    ...toTextSection('판결요지', detail.summary),
    ...toTextSection('참조조문', detail.referencedStatutes),
    ...toTextSection('전문', detail.fullText),
  ],
});

export const toCitationSections = ({ citing }: JudgmentCitations): CitationSection[] => [
  {
    id: 'citing',
    label: '인용된 판례',
    count: citing.length,
    cases: citing.map((citedCase) => ({
      id: citedCase.id,
      label: `${citedCase.court} ${citedCase.caseNumber}`,
    })),
  },
];
