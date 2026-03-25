import type { FileSummaryResponse } from '@/features/file/types/fileApiTypes';
import { api } from '@/shared/api/axiosInstance';

export const fileApi = {
  // 프로젝트 파일 목록 조회
  fetchFiles: async (projectId: string) => {
    const { data } = await api.get(`/projects/${projectId}/files`);
    return data;
  },
  deleteFile: async (fileId: string) => {
    const { data } = await api.delete(`/files/${fileId}`);
    return data;
  },
  fetchFileSummary: async (projectId: string): Promise<FileSummaryResponse> => {
    const { data } = await api.get(`/projects/${projectId}/files/summary`);
    return data;
  },
};
