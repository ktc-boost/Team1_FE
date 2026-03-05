import { useState } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/shadcn/accordion';
import { cn } from '@/shared/lib/utils';
import { STATUS_THEME } from '@/features/board/constants/board.ui.constants';
import { useStatusTaskCountQueries } from '@/features/board/hooks/useStatusTaskCountQueries';
import StatusChangeDrawer from '@/features/board/components/MobileStatusBoard/StatusChangeDrawer';
import { getTaskCountByStatus } from '@/features/task/utils/taskUtils';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';
import MobileStatusHeader from '@/features/board/components/MobileStatusBoard/MobileStatusColumnHeader';
import MobileStatusContent from '@/features/board/components/MobileStatusBoard/MoblieStatusColumnContent';
import MobileColumnFallback from '@/features/board/components/MobileStatusBoard/MobileColumnFallback';
import type {
  TaskListItem,
  TaskStatus,
  TaskStatusMeta,
} from '@/features/task/types/task.domain.types';
import type { TaskQuery, TaskListResponse } from '@/features/task/types/task.query.types';

interface MobileStatusColumnProps {
  column: TaskStatusMeta;
  projectId?: string;
  query: TaskQuery;
  isOpen: boolean;
  isAllClosed: boolean;
  isEmpty: boolean;
}

/*
 * [📦 보관] 모바일 버전 칸반보드 구현 코드
 *
 * PR 리뷰 과정에서 다른 방식이 채택되어
 * 현재는 미적용 상태
 *
 * 참고용 보관 (불필요 시 삭제 예정)
 */
const MobileStatusColumn = ({
  column,
  projectId,
  query,
  isOpen,
  isAllClosed,
  isEmpty,
}: MobileStatusColumnProps) => {
  const { data: statusTaskCountList } = useStatusTaskCountQueries(projectId);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskListItem | null>(null);

  if (query.isLoading) return <MobileColumnFallback status={column.status} state="loading" />;
  if (query.isError || !query.data)
    return <MobileColumnFallback status={column.status} state="error" />;

  const tasks: TaskListItem[] = query.data.pages.flatMap((p: TaskListResponse) => p.tasks);
  const theme = STATUS_THEME[column.status as TaskStatus] ?? STATUS_THEME.TODO;

  const statusTaskCount = getTaskCountByStatus(column.status, statusTaskCountList);
  const totalTaskCount = Object.values(TASK_STATUS).reduce(
    (sum, status) => sum + getTaskCountByStatus(status, statusTaskCountList),
    0,
  );
  const statusSharePct = totalTaskCount === 0 ? 0 : (statusTaskCount / totalTaskCount) * 100;

  return (
    <>
      <AccordionItem
        value={column.status}
        className={cn(
          'rounded-md bg-white shadow-sm overflow-hidden border-0',
          theme.border,
          isAllClosed || isEmpty ? 'flex-1' : 'shrink-0',
        )}
      >
        <AccordionTrigger
          disabled={isEmpty}
          className={cn(
            'p-0 [&>svg]:hidden opacity-100 disabled:opacity-100 h-full hover:no-underline',
            isEmpty ? 'cursor-default pointer-events-none' : 'hover:cursor-pointer',
          )}
        >
          <MobileStatusHeader
            column={column}
            theme={theme}
            tasks={tasks}
            statusTaskCount={statusTaskCount}
            statusSharePct={statusSharePct}
            isEmpty={isEmpty}
            isOpen={isOpen}
          />
        </AccordionTrigger>

        <AccordionContent className="p-0 max-h-[60vh] overflow-y-auto">
          <MobileStatusContent
            tasks={tasks}
            query={query}
            projectId={projectId}
            onSelectTask={(task) => {
              setSelectedTask(task);
              setSheetOpen(true);
            }}
          />
        </AccordionContent>
      </AccordionItem>

      <StatusChangeDrawer
        task={selectedTask}
        projectId={projectId}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSelectedTask(null);
        }}
      />
    </>
  );
};

export default MobileStatusColumn;
