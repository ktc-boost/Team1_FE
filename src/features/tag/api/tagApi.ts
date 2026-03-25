import { api } from '@/shared/api/axiosInstance';
import type { TagResponse } from '@/features/tag/types/tagTypes';

export const tagApi = {
  // 태그 목록 조회
  fetchTags: async (projectId: string): Promise<TagResponse[]> => {
    const { data } = await api.get<TagResponse[]>(`/projects/${projectId}/tags`);
    return data;
  },

  // 태그 생성
  createTag: async (projectId: string, tagName: string): Promise<TagResponse> => {
    const { data } = await api.post<TagResponse>(`/projects/${projectId}/tags`, {
      name: tagName,
    });
    return data;
  },

  // 태그 삭제
  deleteTag: async (projectId: string, tagId: string): Promise<{ success: boolean }> => {
    await api.delete(`/projects/${projectId}/tags/${tagId}`);
    return { success: true };
  },

  // 태그 수정
  updateTag: async (projectId: string, tagId: string, tagName: string): Promise<TagResponse> => {
    const { data } = await api.patch<TagResponse>(`/projects/${projectId}/tags/${tagId}`, {
      name: tagName,
    });
    return data;
  },
};
