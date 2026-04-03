import {
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  type DragStartEvent,
  type DragOverEvent,
  type DragMoveEvent,
} from '@dnd-kit/core';
import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import {
  useMoveTaskMutation,
  optimisticallyMoveTask,
  type MoveTaskParams,
} from '@/features/task/hooks/mutation/useMoveTaskMutation';
import { useSortStore } from '@/features/board/store/useSortStore';
import type { TaskListItem, TaskStatus } from '@/features/task/types/task.domain.types';
import type { ColumnData } from '@/features/board/types/board.domain.types';
import {
  BOARD_AUTO_SCROLL_MAX_SPEED,
  BOARD_AUTO_SCROLL_MIN_SPEED,
  BOARD_AUTO_SCROLL_THRESHOLD,
} from '@/features/board/constants/board.ui.constants';

interface TaskDragProps {
  projectId?: string;
  isMobileView: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  chunkedColumns: ColumnData[][];
}

class MouseOnlyPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: ({ nativeEvent }: { nativeEvent: PointerEvent }) =>
        nativeEvent.pointerType === 'mouse',
    },
  ];
}

export const useTaskDrag = ({
  projectId,
  isMobileView,
  scrollRef,
  chunkedColumns,
}: TaskDragProps) => {
  const queryClient = useQueryClient();
  const [activeTask, setActiveTask] = useState<TaskListItem | null>(null);

  const sensors = useSensors(
    useSensor(MouseOnlyPointerSensor, { activationConstraint: { distance: 20 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 10 } }),
  );

  const moveTaskMutation = useMoveTaskMutation();

  const { sortBy, direction } = useSortStore();
  const sortStateRef = useRef({ sortBy, direction });

  useEffect(() => {
    sortStateRef.current = { sortBy, direction };
  }, [sortBy, direction]);

  const dropTargetRef = useRef<{ activeId: string; toStatus: TaskStatus; overId?: string } | null>(
    null,
  );
  const pendingScrollRef = useRef<TaskStatus | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data.current;
    if (activeData?.type === 'Task') {
      const task = activeData.task as TaskListItem;
      setActiveTask(task);
      dropTargetRef.current = {
        activeId: task.taskId,
        toStatus: task.status,
      };
    }
  };

  const onDragMove = (event: DragMoveEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const activeRect = event.active.rect.current.translated;
    if (!activeRect) return;

    const centerX = activeRect.left + activeRect.width / 2;

    const leftDist = centerX - rect.left;
    const rightDist = rect.right - centerX;

    const threshold = BOARD_AUTO_SCROLL_THRESHOLD;
    const minSpeed = BOARD_AUTO_SCROLL_MIN_SPEED;
    const maxSpeed = BOARD_AUTO_SCROLL_MAX_SPEED;

    const getScrollSpeed = (distance: number) => {
      const proximity = (threshold - distance) / threshold;
      return minSpeed + proximity * (maxSpeed - minSpeed);
    };

    let scrollAmount = 0;

    if (leftDist < threshold) scrollAmount = -getScrollSpeed(leftDist);
    else if (rightDist < threshold) scrollAmount = getScrollSpeed(rightDist);

    if (scrollAmount !== 0) container.scrollLeft += scrollAmount;
  };

  const onDragEnd = () => {
    if (activeTask && dropTargetRef.current) {
      const { toStatus, overId } = dropTargetRef.current;

      const isStatusChanged = activeTask.status !== toStatus;
      const isOrderChanged = !!overId;

      if (isStatusChanged || isOrderChanged) {
        const { sortBy: currentSortBy, direction: currentDirection } = sortStateRef.current;

        const params: MoveTaskParams = {
          projectId: activeTask.projectId,
          activeTaskId: activeTask.taskId,
          fromStatus: activeTask.status,
          toStatus,
          overId,
          queryIdentifier: projectId || 'me',
          sortBy: currentSortBy,
          direction: currentDirection,
          activeTask: activeTask,
        };

        pendingScrollRef.current = toStatus;
        moveTaskMutation.mutate(params, {
          onError: (error) => {
            if (error instanceof ApiError) toast.error(getErrorMessage(error));
            else toast.error('할 일 이동 중 오류가 발생했습니다.');
          },
        });
      }
    }

    setActiveTask(null);
    dropTargetRef.current = null;
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const { sortBy: currentSortBy, direction: currentDirection } = sortStateRef.current;

    const activeTask = active.data.current?.task as TaskListItem | undefined;
    const overData = over.data.current;
    const activeId = active.id as string;

    if (!activeTask || activeId === over.id) return;

    const toStatus =
      overData?.type === 'Task'
        ? overData.task.status
        : overData?.type === 'Column'
          ? overData.column.status
          : undefined;
    if (!toStatus) return;

    const overId = overData?.type === 'Task' ? (over.id as string) : undefined;

    if (
      dropTargetRef.current?.activeId === activeId &&
      dropTargetRef.current?.toStatus === toStatus &&
      dropTargetRef.current?.overId === overId
    ) {
      return;
    }

    dropTargetRef.current = { activeId, toStatus, overId };

    const params: MoveTaskParams = {
      projectId: activeTask.projectId,
      activeTaskId: activeId,
      fromStatus: activeTask.status,
      toStatus,
      overId,
      queryIdentifier: projectId || 'me',
      sortBy: currentSortBy,
      direction: currentDirection,
      activeTask: activeTask,
    };

    optimisticallyMoveTask(queryClient, params);
  };

  useEffect(() => {
    if (!isMobileView || !pendingScrollRef.current || !scrollRef.current) return;

    const toStatus = pendingScrollRef.current;

    const pageIndex = chunkedColumns.findIndex((group) =>
      group.some((col) => col.status === toStatus),
    );

    if (pageIndex >= 0) {
      requestAnimationFrame(() => {
        scrollRef.current!.scrollTo({
          left: scrollRef.current!.clientWidth * pageIndex,
          behavior: 'smooth',
        });
      });
    }

    pendingScrollRef.current = null;
  }, [chunkedColumns, isMobileView, scrollRef]);

  return { sensors, activeTask, onDragStart, onDragOver, onDragMove, onDragEnd };
};
