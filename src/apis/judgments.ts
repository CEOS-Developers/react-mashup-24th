import type { JudgmentCitations, JudgmentDetail } from '../types/judgment';
import { request } from './client';

/** 판례 상세. 호출할 때마다 서버의 조회수가 올라간다 */
export const getJudgmentDetail = (judgmentId: number) =>
  request<JudgmentDetail>({ url: `/api/v1/judgments/${judgmentId}` });

/** 이 판례가 본문에서 인용한 판례 목록 */
export const getJudgmentCitations = (judgmentId: number) =>
  request<JudgmentCitations>({ url: `/api/v1/judgments/${judgmentId}/citations` });
