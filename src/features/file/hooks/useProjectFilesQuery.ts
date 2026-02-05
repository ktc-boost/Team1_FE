import { useInfiniteQuery } from '@tanstack/react-query';
import { fileApi } from '@/features/file/api/fileApi';
import type { ProjectFilesResponse } from '@/features/file/types/fileApiTypes';

export const useProjectFilesQuery = (projectId: string) => {
  return useInfiniteQuery<ProjectFilesResponse, Error>({
    queryKey: ['projectFiles', projectId],
    queryFn: ({ pageParam }) =>
      fileApi.fetchFiles(projectId, typeof pageParam === 'string' ? pageParam : undefined, 8),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: !!projectId,
    initialPageParam: undefined,
  });
};
