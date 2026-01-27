import { useQuery } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';
import { MEMO_QUERY_KEYS } from '@/features/memo/constants/memoQueryKeys';

// 메모 상세 조회
export const useMemoQuery = (projectId: string, memoId: string) => {
  return useQuery<Memo>({
    queryKey: MEMO_QUERY_KEYS.detail(projectId, memoId),
    queryFn: () => memoApi.fetchMemo(projectId, memoId),
    enabled: !!memoId,
  });
};
