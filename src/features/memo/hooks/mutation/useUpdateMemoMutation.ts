import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';
import { ROUTES } from '@/app/routes/Router';
import { useNavigate } from 'react-router-dom';
import { MEMO_QUERY_KEYS } from '@/features/memo/constants/memoQueryKeys';

// 메모 수정
export const useUpdateMemoMutation = (projectId: string, memoId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const memoListKey = MEMO_QUERY_KEYS.project(projectId);
  const memoDetailKey = MEMO_QUERY_KEYS.detail(projectId, memoId);

  return useMutation({
    mutationFn: (updatedData: Partial<Memo>) => memoApi.updateMemo(projectId, memoId, updatedData),

    onMutate: async (updatedData) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: memoListKey }),
        queryClient.cancelQueries({ queryKey: memoDetailKey }),
      ]);

      const previousMemos = queryClient.getQueryData<Memo[]>(memoListKey);
      const previousMemo = queryClient.getQueryData<Memo>(memoDetailKey);

      queryClient.setQueryData<Memo[]>(memoListKey, (old = []) =>
        old.map((m) => (m.id === memoId ? { ...m, ...updatedData } : m)),
      );

      queryClient.setQueryData<Memo>(memoDetailKey, (old) =>
        old ? { ...old, ...updatedData } : old,
      );

      return { previousMemos, previousMemo };
    },

    onError: (error, _, context) => {
      console.error('메모 수정 실패:', error);

      if (context?.previousMemos) {
        queryClient.setQueryData(memoListKey, context.previousMemos);
      }

      if (context?.previousMemo) {
        queryClient.setQueryData(memoDetailKey, context.previousMemo);
      }
    },

    onSuccess: (updatedMemo) => {
      queryClient.setQueryData<Memo[]>(memoListKey, (old = []) =>
        old.map((m) => (m.id === memoId ? updatedMemo : m)),
      );
      queryClient.setQueryData<Memo>(memoDetailKey, updatedMemo);
      navigate(ROUTES.PROJECT_MEMO_DETAIL(projectId, updatedMemo.id));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: memoListKey });
      queryClient.invalidateQueries({ queryKey: memoDetailKey });
    },
  });
};
