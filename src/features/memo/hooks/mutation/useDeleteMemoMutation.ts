import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';
import { MEMO_QUERY_KEYS } from '@/features/memo/constants/memoQueryKeys';

// 메모 삭제
export const useDeleteMemoMutation = (projectId: string) => {
  const queryClient = useQueryClient();
  const memoListKey = MEMO_QUERY_KEYS.project(projectId);

  return useMutation({
    mutationFn: (memoId: string) => memoApi.deleteMemo(projectId, memoId),

    onMutate: async (memoId: string) => {
      await queryClient.cancelQueries({ queryKey: memoListKey });
      const previousMemos = queryClient.getQueryData<Memo[]>(memoListKey);

      queryClient.setQueryData(memoListKey, (old: Memo[] | undefined) =>
        old ? old.filter((m) => m.id !== memoId) : [],
      );

      return { previousMemos };
    },

    onError: (error, __, context) => {
      console.error('메모 삭제 실패:', error);
      if (context?.previousMemos) {
        queryClient.setQueryData(memoListKey, context.previousMemos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: memoListKey });
    },
  });
};
