import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '@/features/file/api/fileApi';
import toast from 'react-hot-toast';
import type { FileItemType } from '@/features/file/types/fileTypes';
import { TASK_DETAIL_FILES_QUERY_KEY } from '@/features/task-detail/constants/taskDetailQueryKey';

export const useDeleteFileMutation = (taskId: string) => {
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

    onSuccess: () => {
      toast.success('파일이 삭제되었습니다.');
    },

    onError: (_error, _fileId, context) => {
      if (context?.prevFiles) {
        queryClient.setQueryData(TASK_DETAIL_FILES_QUERY_KEY.list(taskId), context.prevFiles);
      }
      toast.error('파일 삭제에 실패했습니다.');
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: TASK_DETAIL_FILES_QUERY_KEY.list(taskId) });
    },
  });
};
