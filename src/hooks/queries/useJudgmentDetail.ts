import { skipToken, useQuery } from '@tanstack/react-query';
import { getJudgmentDetail } from '../../apis/judgments';
import { judgmentKeys } from './judgmentKeys';

/**
 * 판례 상세를 불러온다. id가 없으면 호출하지 않는다.
 * 호출할 때마다 서버의 조회수가 올라가서, 한 번 받은 값은 다시 부르지 않는다.
 */
export const useJudgmentDetail = (judgmentId: number | undefined) =>
  useQuery({
    queryKey: judgmentKeys.detail(judgmentId ?? -1),
    queryFn: judgmentId === undefined ? skipToken : () => getJudgmentDetail(judgmentId),
    staleTime: Infinity,
  });
