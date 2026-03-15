import type { FileSummaryResponse } from '@/features/file/types/fileApiTypes';
import api from '@/shared/api/axiosInstance';

export const fileApi = {
  // 프로젝트 파일 목록 조회 (커서 기반 페이지네이션)
  fetchFiles: async (projectId: string, cursor?: string, limit = 8) => {
    const { data } = await api.get(`/projects/${projectId}/files`, {
      params: { cursor, limit },
    });
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
