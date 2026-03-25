import type { Memo } from '@/features/memo/types/memoTypes';
import { api } from '@/shared/api/axiosInstance';

export const memoApi = {
  // 전체 메모 목록 조회
  fetchMemos: async (projectId: string): Promise<Memo[]> => {
    const { data } = await api.get(`/projects/${projectId}/memos`);
    return data;
  },

  // 단일 메모 조회
  fetchMemo: async (projectId: string, memoId: string): Promise<Memo> => {
    const { data } = await api.get(`/projects/${projectId}/memos/${memoId}`);
    return data;
  },

  // 메모 생성
  createMemo: async (
    projectId: string,
    memo: { title: string; content: string },
  ): Promise<Memo> => {
    const { data } = await api.post(`/projects/${projectId}/memos`, memo);
    return data;
  },

  // 메모 수정
  updateMemo: async (
    projectId: string,
    memoId: string,
    updatedData: Partial<Memo>,
  ): Promise<Memo> => {
    const { data } = await api.put(`/projects/${projectId}/memos/${memoId}`, updatedData);
    return data;
  },

  // 메모 삭제
  deleteMemo: async (projectId: string, memoId: string): Promise<{ success: boolean }> => {
    await api.delete(`/projects/${projectId}/memos/${memoId}`);
    return { success: true };
  },
};
