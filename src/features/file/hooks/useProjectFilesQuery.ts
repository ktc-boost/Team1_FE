import { useQuery } from '@tanstack/react-query';
import { fileApi } from '@/features/file/api/fileApi';
import type { ProjectFile } from '@/features/file/types/fileApiTypes';

export const useProjectFilesQuery = (projectId: string) => {
  return useQuery<ProjectFile[], Error>({
    queryKey: ['projectFiles', projectId],
    queryFn: () => fileApi.fetchFiles(projectId),
    enabled: !!projectId,
  });
};
