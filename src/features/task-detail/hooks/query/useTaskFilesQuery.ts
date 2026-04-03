import { useQuery } from '@tanstack/react-query';
import { TASK_DETAIL_FILES_QUERY_KEY } from '@/features/task-detail/constants/taskDetailQueryKey';
import { mapToFileItemWithDownloadUrl } from '@/features/task-detail/utils/mapToFileItemWithDownloadUrl';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';

export const useTaskFilesQuery = (taskId: string, serverFiles: ServerFileType[]) => {
  return useQuery({
    queryKey: TASK_DETAIL_FILES_QUERY_KEY.list(taskId),
    queryFn: () => Promise.all(serverFiles.map(mapToFileItemWithDownloadUrl)),
    placeholderData: [],
    enabled: serverFiles.length > 0,
  });
};
