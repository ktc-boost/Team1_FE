import type {
  TaskListResponse,
  MemberTaskListResponse,
  MyTaskCountByStatusResponse,
  ProjectTaskCountByMemberResponse,
  ProjectTaskCountByStatusResponse,
  TaskApproveResponse,
} from '@/features/task/types/task.query.types';
import type { TaskDetail, TaskListItem, TaskStatus } from '@/features/task/types/task.domain.types';
import type { CreateTaskInput, UpdateTaskInput } from '@/features/task/schemas/taskSchema';
import api from '@/shared/api/axiosInstance';
import { SORT_BY, DIRECTION } from '@/features/board/constants/board.sort.constants';
import type { Direction, SortBy } from '@/features/board/types/board.sort.types';

export const taskApi = {
  // 나의 할 일 목록 조회 (상태 기준)
  fetchMyTasksByStatus: async (
    cursor?: string,
    status?: TaskStatus,
    limit = 6,
    sortBy: SortBy = SORT_BY.CREATED_AT,
    direction: Direction = DIRECTION.ASC,
    search?: string,
  ): Promise<TaskListResponse> => {
    const res = await api.get<TaskListResponse>('/me/tasks', {
      params: { cursor, limit, status, sortBy, direction, search },
    });
    return res.data;
  },

  // 프로젝트 할 일 목록 조회 (상태 기준)
  fetchProjectTasksByStatus: async (
    projectId: string,
    cursor?: string,
    status?: TaskStatus,
    limit = 6,
    sortBy: SortBy = SORT_BY.CREATED_AT,
    direction: Direction = DIRECTION.ASC,
    search?: string,
  ) => {
    const res = await api.get<TaskListResponse>(`/projects/${projectId}/tasks`, {
      params: { cursor, limit, status, sortBy, direction, search },
    });
    return res.data;
  },

  // 프로젝트 할 일 목록 조회 (멤버 기준)
  fetchProjectTasksByMember: async (
    projectId: string,
    memberId: string,
    cursor?: string,
    limit = 6,
    search?: string,
  ): Promise<MemberTaskListResponse> => {
    const res = await api.get<MemberTaskListResponse>(
      `/projects/${projectId}/members/${memberId}/tasks`,
      { params: { cursor, limit, search } },
    );
    return res.data;
  },

  // 프로젝트 할 일 개수 조회 (상태 기준)
  fetchProjectTaskCountByStatus: async (
    projectId: string,
    search?: string,
  ): Promise<ProjectTaskCountByStatusResponse> => {
    const res = await api.get<ProjectTaskCountByStatusResponse>(
      `/projects/${projectId}/tasks/status-count`,
      { params: { search } },
    );
    return res.data;
  },

  // 프로젝트 할 일 개수 조회 (팀원 기준)
  fetchProjectTaskCountByMember: async (
    projectId: string,
    search?: string,
  ): Promise<ProjectTaskCountByMemberResponse[]> => {
    const res = await api.get<ProjectTaskCountByMemberResponse[]>(
      `/projects/${projectId}/tasks/members/status-count`,
      { params: { search } },
    );
    return res.data;
  },

  // 나의 할 일 개수 조회 (상태 기준)
  fetchMyTaskCountByStatus: async (search?: string): Promise<MyTaskCountByStatusResponse> => {
    const res = await api.get<MyTaskCountByStatusResponse>(`/me/tasks/status-count`, {
      params: { search },
    });
    return res.data;
  },

  // 할 일 상세 조회
  fetchTaskDetail: async (projectId: string, taskId: string): Promise<TaskDetail> => {
    const res = await api.get<TaskDetail>(`/projects/${projectId}/tasks/${taskId}`);
    return res.data;
  },

  // 할 일 생성
  createTask: async (projectId: string, taskData: CreateTaskInput): Promise<TaskListItem> => {
    const res = await api.post<TaskListItem>(`/projects/${projectId}/tasks`, taskData);
    return res.data;
  },

  // 할 일 수정
  updateTask: async (
    projectId: string,
    taskId: string,
    taskData: UpdateTaskInput,
  ): Promise<TaskListItem> => {
    const res = await api.put<TaskListItem>(`/projects/${projectId}/tasks/${taskId}`, taskData);
    return res.data;
  },

  // 할 일 삭제
  deleteTask: async (projectId: string, taskId: string): Promise<{ success: boolean }> => {
    const res = await api.delete<{ success: boolean }>(`/projects/${projectId}/tasks/${taskId}`);
    return res.data;
  },

  // 할 일 상태 변경
  updateTaskStatus: async (
    projectId: string,
    taskId: string,
    status: TaskStatus,
  ): Promise<{ id: string; status: TaskStatus }> => {
    const res = await api.patch<{ id: string; status: TaskStatus }>(
      `/projects/${projectId}/tasks/${taskId}`,
      { status },
    );
    return res.data;
  },

  // 할 일 승인
  approveTask: async (projectId: string, taskId: string): Promise<TaskApproveResponse> => {
    const res = await api.patch<TaskApproveResponse>(
      `/projects/${projectId}/tasks/${taskId}/approve`,
    );
    return res.data;
  },

  // 할 일 재검토 요청
  requestReviewTask: async (projectId: string, taskId: string) => {
    await api.post(`/projects/${projectId}/tasks/${taskId}/re-review`);
  },
};
