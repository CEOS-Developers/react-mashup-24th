/** 화면이 쓰는 판례 데이터 모양. API 응답은 caseDetail.mapper.ts에서 이 모양으로 바꾼다 */

export interface CaseInfoRow {
  label: string;
  lines: string[];
}

/** 사건 정보 아래에 이어지는 본문 묶음 (판시사항, 판결요지, 참조조문, 전문) */
export interface CaseTextSection {
  heading: string;
  paragraphs: string[];
}

export interface CaseDetail {
  title: string;
  caseName: string;
  courtLines: string[];
  infoRows: CaseInfoRow[];
  sections: CaseTextSection[];
}

export interface CitedCase {
  /** 판례 id. 비교 화면에서 이 id로 상세를 다시 불러온다 */
  id: number;
  label: string;
}

export interface CitationSection {
  id: string;
  label: string;
  count: number;
  cases: CitedCase[];
}
