export const TASK_DETAIL_FILES_QUERY_KEY = {
  list: (taskId: string) => ['taskDetail', 'files', taskId] as const,
};
