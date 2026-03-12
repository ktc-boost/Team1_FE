import { generatePath } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';

export const ROUTES = {
  PROJECT_MEMO_LIST: (projectId: string) => generatePath(ROUTE_PATH.PROJECT_MEMO, { projectId }),

  PROJECT_MEMO_DETAIL: (projectId: string, memoId: string) =>
    generatePath(ROUTE_PATH.MEMO_DETAIL, { projectId, memoId }),

  PROJECT_BOARD: (projectId: string) => generatePath(ROUTE_PATH.PROJECT_BOARD, { projectId }),

  PROJECT_FILE: (projectId: string) => generatePath(ROUTE_PATH.PROJECT_FILE, { projectId }),

  TASK_DETAIL: (projectId: string, taskId: string) =>
    generatePath(ROUTE_PATH.TASK_DETAIL, { projectId, taskId }),
};
