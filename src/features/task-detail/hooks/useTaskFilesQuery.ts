import { useQuery } from '@tanstack/react-query';
import { mapToTaskDetailFileType } from '@/features/task-detail/utils/fileAdapter';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';
import { TASK_DETAIL_FILES_QUERY_KEY } from '@/features/task-detail/constants/taskDetailQueryKey';

export const useTaskFilesQuery = (serverFiles: ServerFileType[], taskId: string) => {
  return useQuery({
    queryKey: TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
    queryFn: async () => Promise.all(serverFiles.map(mapToTaskDetailFileType)),
    placeholderData: [],
    enabled: !!serverFiles?.length,
  });
};
