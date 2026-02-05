export const MEMO_QUERY_KEYS = {
  root: ['memos'] as const,

  project: (projectId: string) => [...MEMO_QUERY_KEYS.root, 'project', projectId] as const,

  detail: (projectId: string, memoId: string) =>
    [...MEMO_QUERY_KEYS.root, 'detail', projectId, memoId] as const,
};
