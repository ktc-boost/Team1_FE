import { CheckCircle2, CircleArrowRight } from 'lucide-react';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';

/* Task 상태 목록 (UI 기준) */
export const COLUMN_STATUS_LIST = TASK_STATUS_META.map((c) => c.status);

/* Member Board에서 사용하는 스크롤 threshold 상수 */
export const COLLAPSIBLE_SCROLL_THRESHOLD = 100;

/* Status Board에서 사용하는 보드 auto scroll 상수 */
export const BOARD_AUTO_SCROLL_THRESHOLD = 120;
export const BOARD_AUTO_SCROLL_MIN_SPEED = 8;
export const BOARD_AUTO_SCROLL_MAX_SPEED = 25;

/* Column 별 테마 */
const BASE_BLUE_THEME = {
  icon: CircleArrowRight,
  accent: 'bg-boost-blue/30',
  track: 'bg-boost-blue/10',
  pill: 'bg-boost-blue/5 text-boost-blue/50 ring-1 ring-boost-blue/40',
  iconColor: 'text-boost-blue/60',
  border: 'border-l-4 border-boost-blue/30',
  labelColor: 'text-boost-blue/50',
} as const;

export const STATUS_THEME = {
  TODO: {
    ...BASE_BLUE_THEME,
    description: '아직 시작하지 않은 할 일이에요.',
    emptyTitle: '할 일이 없어요',
    emptyDesc: '새로운 할 일을 추가해보세요!',
  },
  PROGRESS: {
    ...BASE_BLUE_THEME,
    description: '현재 진행 중인 작업들이에요.',
    emptyTitle: '진행 중인 작업이 없어요',
    emptyDesc: '할 일을 시작해보세요!',
  },
  REVIEW: {
    ...BASE_BLUE_THEME,
    description: '검토 및 피드백이 필요한 작업이에요.',
    emptyTitle: '검토 중인 작업이 없어요',
    emptyDesc: '완료된 작업을 검토해보세요!',
  },
  DONE: {
    icon: CheckCircle2,
    accent: 'bg-boost-blue',
    track: 'bg-boost-blue/10',
    pill: 'bg-boost-blue/5 text-boost-blue ring-1 ring-boost-blue/20',
    iconColor: 'text-boost-blue',
    border: 'border-l-4 border-boost-blue',
    labelColor: 'text-boost-blue',
    description: '완료된 할 일들을 모아뒀어요.',
    emptyTitle: '완료된 할 일이 없어요',
    emptyDesc: '열심히 하면 곧 채워질 거예요!',
  },
} as const;
