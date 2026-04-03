import { useQuery } from '@tanstack/react-query';
import { TASK_DETAIL_FILES_QUERY_KEY } from '@/features/task-detail/constants/taskDetailQueryKey';
import { mapToFileItemWithDownloadUrl } from '@/features/task-detail/utils/mapToFileItemWithDownloadUrl';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';

export const useTaskFilesQuery = (taskId: string) => {
  const files = useTaskDetailStore((s) => s.files);

  return useQuery({
    queryKey: TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
    queryFn: () => Promise.all(files.map(mapToFileItemWithDownloadUrl)),
    placeholderData: [],
    enabled: files.length > 0,
  });
};
