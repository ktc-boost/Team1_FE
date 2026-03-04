import { BOARD } from '@/features/board/constants/board.domain.constants';

export const PROJECT_QUERY_KEYS = {
  root: ['project'] as const,

  myProjects: () => [...PROJECT_QUERY_KEYS.root, 'me'] as const,

  detail: (projectId: string) => [...PROJECT_QUERY_KEYS.root, projectId] as const,

  members: (projectId: string) => [...PROJECT_QUERY_KEYS.root, BOARD.MEMBER, projectId] as const,

  joinCode: (projectId: string) => [...PROJECT_QUERY_KEYS.root, 'joinCode', projectId] as const,

  boostingScores: (projectId: string) => ['project', projectId, 'boosting'] as const,
};
