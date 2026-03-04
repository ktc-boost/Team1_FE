import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/shared/components/shadcn/drawer';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/button';
import { useMoveTaskMutation } from '@/features/task/hooks/mutation/useMoveTaskMutation';
import type { TaskListItem, TaskStatus } from '@/features/task/types/task.domain.types';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';
import { useSortStore } from '@/features/board/store/useSortStore';

interface StatusChangeDrawerProps {
  task: TaskListItem | null;
  projectId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChanged?: (status: string) => void;
}

/*
 * [📦 보관] 모바일 버전 칸반보드 구현 코드
 *
 * PR 리뷰 과정에서 다른 방식이 채택되어
 * 현재는 미적용 상태
 *
 * 참고용 보관 (불필요 시 삭제 예정)
 */
const StatusChangeDrawer = ({
  task,
  projectId,
  open,
  onOpenChange,
  onStatusChanged,
}: StatusChangeDrawerProps) => {
  const moveTaskMutation = useMoveTaskMutation();
  const { sortBy, direction } = useSortStore();

  if (!task) return null;

  const handleChange = (toStatus: TaskStatus) => {
    if (task.status === toStatus) return;

    moveTaskMutation.mutate({
      projectId: task.projectId,
      activeTaskId: task.taskId,
      fromStatus: task.status,
      toStatus,
      queryIdentifier: projectId || 'me',
      activeTask: task,
      sortBy,
      direction,
    });

    onStatusChanged?.(toStatus);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="rounded-t-2xl px-4 pb-6 border-gray-300">
        <DrawerHeader className="px-0">
          <DrawerTitle>할 일 상태 변경</DrawerTitle>
          <DrawerDescription>원하는 상태를 선택하면 할 일의 상태가 변경됩니다.</DrawerDescription>
        </DrawerHeader>

        <ul className="flex flex-col gap-2 mt-2">
          {TASK_STATUS_META.map((col) => {
            const isActive = col.status === task.status;

            return (
              <li key={col.status}>
                <Button
                  variant="ghost"
                  onClick={() => handleChange(col.status)}
                  className={cn(
                    'w-full',
                    isActive ? 'bg-boost-blue text-white' : 'bg-gray-100 hover:bg-gray-200',
                  )}
                >
                  {col.title}
                </Button>
              </li>
            );
          })}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default StatusChangeDrawer;
