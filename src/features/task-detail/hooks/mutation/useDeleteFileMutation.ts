import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '@/features/file/api/fileApi';
import type { FileItemType } from '@/features/file/types/fileTypes';
import { TASK_DETAIL_FILES_QUERY_KEY } from '@/features/task-detail/constants/taskDetailQueryKey';
import { TASK_QUERY_KEYS } from '@/features/task/constants/task.query.constants';

export const useDeleteFileMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fileId: string) => fileApi.deleteFile(fileId),

    onMutate: async (fileId: string) => {
      await queryClient.cancelQueries({ queryKey: TASK_DETAIL_FILES_QUERY_KEY.list(taskId) });

      const prevFiles = queryClient.getQueryData<FileItemType[]>(
        TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
      );

      queryClient.setQueryData(
        TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
        (old: FileItemType[] = []) => old.filter((file) => file.fileId !== fileId),
      );

      return { prevFiles };
    },

    onError: (_error, _fileId, context) => {
      if (context?.prevFiles) {
        queryClient.setQueryData(TASK_DETAIL_FILES_QUERY_KEY.list(taskId), context.prevFiles);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: TASK_DETAIL_FILES_QUERY_KEY.list(taskId) });
      await queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.detail(projectId, taskId) });
    },
  });
};
