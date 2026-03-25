import type { Project, ProjectBoostingScores } from '@/features/project/types/projectTypes';
import type { Member } from '@/features/user/types/userTypes';
import { api } from '@/shared/api/axiosInstance';

export const projectApi = {
  // 참여 프로젝트 목록 조회
  fetchProjects: async (): Promise<Project[]> => {
    const { data } = await api.get('/projects/me');
    return data;
  },

  // 프로젝트 정보 조회
  fetchProject: async (projectId: string): Promise<Project> => {
    const project = await api.get(`/projects/${projectId}`);
    return project.data;
  },

  // 프로젝트 멤버 조회
  fetchProjectMembers: async (projectId: string): Promise<Member[]> => {
    const { data } = await api.get(`/projects/${projectId}/members`);
    return data;
  },

  // 프로젝트 멤버 공헌도 점수 조회
  fetchProjectBoostingScores: async (projectId: string): Promise<ProjectBoostingScores> => {
    const { data } = await api.get(`/projects/${projectId}/boosting-scores`);
    return data;
  },

  // 프로젝트 생성
  createProject: async (projectName: string): Promise<Project> => {
    const { data } = await api.post<Project>('/projects', { name: projectName });
    return data;
  },

  // 프로젝트 수정
  updateProject: async (projectId: string, updatedData: Partial<Project>): Promise<Project> => {
    const { data } = await api.put(`/projects/${projectId}`, updatedData);
    return data;
  },

  // 프로젝트 삭제
  deleteProject: async (projectId: string): Promise<{ success: boolean }> => {
    await api.delete(`/projects/${projectId}`);
    return { success: true };
  },
};
