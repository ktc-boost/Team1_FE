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
}

export const useTaskDrag = ({ projectId }: TaskDragProps) => {
  const queryClient = useQueryClient();
  const [activeTask, setActiveTask] = useState<TaskListItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
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

  return {
    sensors,
    activeTask,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
};
