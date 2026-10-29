/** GET /api/v1/judgments/{id} — 판례 상세 */
export interface JudgmentDetail {
  id: number;
  /** 사건번호 */
  caseNumber: string;
  /** 사건명 */
  caseName: string;
  court: string;
  /** 선고일, YYYY-MM-DD */
  judgmentDate: string;
  caseType: string;
  /** 심급 */
  instance: string;
  resultType: string;
  /** 판시사항 */
  headnote: string;
  /** 판결요지 */
  summary: string;
  /** 참조조문 */
  referencedStatutes: string;
  /** 판결문 전문 */
  fullText: string;
  viewCount: number;
}

/** 인용 판례 목록의 한 건 */
export interface CitationSummary {
  id: number;
  caseNumber: string;
  caseName: string;
  court: string;
  /** 선고일, YYYY-MM-DD */
  judgmentDate: string;
  headnote: string;
}

/** GET /api/v1/judgments/{id}/citations — 이 판례가 본문에서 인용한 판례 */
export interface JudgmentCitations {
  citing: CitationSummary[];
}

export type JudgmentSearchSort = 'date,desc' | 'viewCount,desc';

export interface JudgmentSearchParams {
  keyword: string;
  caseType?: 'CIVIL' | 'CRIMINAL' | 'ADMINISTRATIVE';
  court?: string;
  /** YYYY-MM-DD */
  dateFrom?: string;
  /** YYYY-MM-DD */
  dateTo?: string;
  /** 서버 기본값: date,desc */
  sort?: JudgmentSearchSort;
  /** 0부터 시작하는 페이지 번호 */
  page?: number;
  size?: number;
}

export interface JudgmentSearchItem {
  id: number;
  caseNumber: string;
  caseName: string;
  court: string;
  judgmentDate: string;
  resultType: string;
  claimPurpose: string;
  excerpt: string;
  viewCount: number;
}

export interface JudgmentSearchResponse {
  content: JudgmentSearchItem[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface JudgmentSearchApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: JudgmentSearchResponse | null;
  error: unknown;
}
