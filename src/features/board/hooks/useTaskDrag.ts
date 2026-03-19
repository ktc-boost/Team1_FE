import {
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { useRef, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useMoveTaskMutation,
  optimisticallyMoveTask,
  type MoveTaskParams,
} from '@/features/task/hooks/mutation/useMoveTaskMutation';
import { useSortStore } from '@/features/board/store/useSortStore';
import type { TaskListItem, TaskStatus } from '@/features/task/types/task.domain.types';

interface TaskDragProps {
  projectId?: string;
  isMobileView: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const useTaskDrag = ({ projectId, isMobileView, scrollContainerRef }: TaskDragProps) => {
  const queryClient = useQueryClient();
  const [activeTask, setActiveTask] = useState<TaskListItem | null>(null);

  const sensors = useSensors(
    useSensor(isMobileView ? TouchSensor : PointerSensor, {
      activationConstraint: isMobileView ? { delay: 250, tolerance: 5 } : { distance: 10 },
    }),
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

        moveTaskMutation.mutate(params);
      }
    }

    setActiveTask(null);
    dropTargetRef.current = null;
  };

  const getClientX = (event: Event | null): number | null => {
    if (!event) return null;

    if (event instanceof TouchEvent) {
      if (event.touches.length > 0) return event.touches[0].clientX;
      if (event.changedTouches.length > 0) return event.changedTouches[0].clientX;
      return null;
    }

    if (event instanceof PointerEvent || event instanceof MouseEvent) {
      return event.clientX;
    }

    return null;
  };

  const EDGE_THRESHOLD = 80;
  const SCROLL_SPEED = 12;

  const onDragOver = (event: DragOverEvent) => {
    if (!event.over) return;

    const { sortBy: currentSortBy, direction: currentDirection } = sortStateRef.current;

    const activeTask = event.active.data.current?.task as TaskListItem | undefined;
    const overData = event.over.data.current;
    const activeId = event.active.id as string;

    if (!activeTask || activeId === event.over.id) return;

    const toStatus =
      overData?.type === 'Task'
        ? overData.task.status
        : overData?.type === 'Column'
          ? overData.column.status
          : undefined;
    if (!toStatus) return;

    const overId = overData?.type === 'Task' ? (event.over.id as string) : undefined;

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

    if (isMobileView && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const rect = container.getBoundingClientRect();
      const clientX = getClientX(event.activatorEvent);

      if (clientX == null) return;

      if (clientX < rect.left + EDGE_THRESHOLD) {
        container.scrollLeft -= SCROLL_SPEED;
      }

      if (clientX > rect.right - EDGE_THRESHOLD) {
        container.scrollLeft += SCROLL_SPEED;
      }
    }
  };

  return {
    sensors,
    activeTask,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
};
