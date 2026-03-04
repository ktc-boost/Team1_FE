// 할 일 상태 값
export const TASK_STATUS = {
  TODO: 'TODO',
  PROGRESS: 'PROGRESS',
  REVIEW: 'REVIEW',
  DONE: 'DONE',
} as const;

// 할 일 상태 → 소문자 key 매핑
export const TASK_STATUS_KEY = {
  [TASK_STATUS.TODO]: 'todo',
  [TASK_STATUS.PROGRESS]: 'progress',
  [TASK_STATUS.REVIEW]: 'review',
  [TASK_STATUS.DONE]: 'done',
} as const;

// 할 일 상태에 대한 UI 표시 정보(라벨 등)를 담은 메타 데이터
export const TASK_STATUS_META = [
  { status: TASK_STATUS.TODO, title: '진행 전' },
  { status: TASK_STATUS.PROGRESS, title: '진행 중' },
  { status: TASK_STATUS.REVIEW, title: '검토 중' },
  { status: TASK_STATUS.DONE, title: '완료' },
] as const;

// 할 일 상태 집합
export const TASK_STATUS_LIST = [
  TASK_STATUS.TODO,
  TASK_STATUS.PROGRESS,
  TASK_STATUS.REVIEW,
  TASK_STATUS.DONE,
] as const;
