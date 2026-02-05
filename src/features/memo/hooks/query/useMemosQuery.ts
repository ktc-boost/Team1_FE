import { useQuery } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';
import { MEMO_QUERY_KEYS } from '@/features/memo/constants/memoQueryKeys';

// 전체 메모 목록 조회
export const useMemosQuery = (projectId: string) => {
  return useQuery<Memo[]>({
    queryKey: MEMO_QUERY_KEYS.project(projectId),
    queryFn: () => memoApi.fetchMemos(projectId),
  });
};
