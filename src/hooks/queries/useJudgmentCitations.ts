import { skipToken, useQuery } from '@tanstack/react-query';
import { getJudgmentCitations } from '../../apis/judgments';
import { judgmentKeys } from './judgmentKeys';

/** 판례가 인용한 판례 목록을 불러온다. id가 없으면 호출하지 않는다. */
export const useJudgmentCitations = (judgmentId: number | undefined) =>
  useQuery({
    queryKey: judgmentKeys.citations(judgmentId ?? -1),
    queryFn: judgmentId === undefined ? skipToken : () => getJudgmentCitations(judgmentId),
    staleTime: Infinity,
  });
