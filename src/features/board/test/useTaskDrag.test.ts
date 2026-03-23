import {
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  type DragStartEvent,
  type DragOverEvent,
  type DragMoveEvent,
} from '@dnd-kit/core';
import { useState, useRef } from 'react';
import type { TaskListItem, TaskStatus } from '@/features/task/types/task.domain.types';

interface useTaskDragTestProps {
  setTaskList: React.Dispatch<React.SetStateAction<TaskListItem[]>>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isMobileView: boolean;
  chunkedColumns: { status: TaskStatus }[][];
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

export const useTaskDragTest = ({
  setTaskList,
  scrollRef,
  isMobileView,
  chunkedColumns,
}: useTaskDragTestProps) => {
  const [activeTask, setActiveTask] = useState<TaskListItem | null>(null);
  const dropTargetRef = useRef<{ activeId: string; toStatus: TaskStatus; overId?: string } | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(MouseOnlyPointerSensor, { activationConstraint: { distance: 20 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 10 } }),
  );

  const onDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data.current;
    if (activeData?.type === 'Task') {
      const task = activeData.task as TaskListItem;
      setActiveTask(task);
      dropTargetRef.current = { activeId: task.taskId, toStatus: task.status };
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeId = active.id as string;
    const activeData = active.data.current?.task as TaskListItem | undefined;
    const overData = over.data.current;

    if (!activeData || activeId === over.id) return;

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

    setTaskList((prev) => {
      const newTasks = [...prev];
      const idx = newTasks.findIndex((t) => t.taskId === activeId);
      if (idx === -1) return prev;

      const [movedTask] = newTasks.splice(idx, 1);
      const updatedTask = { ...movedTask, status: toStatus };

      if (overId) {
        const targetIdx = newTasks.findIndex((t) => t.taskId === overId);
        newTasks.splice(targetIdx, 0, updatedTask);
      } else {
        newTasks.push(updatedTask);
      }

      return newTasks;
    });
  };

  const onDragMove = (event: DragMoveEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const activeRect = event.active.rect.current.translated;
    if (!activeRect) return;

    const centerX = activeRect.left + activeRect.width / 2;

    const threshold = 100;
    const minSpeed = 8;
    const maxSpeed = 25;

    const leftDist = centerX - rect.left;
    const rightDist = rect.right - centerX;

    let scrollAmount = 0;

    if (leftDist < threshold) {
      const ratio = (threshold - leftDist) / threshold;
      scrollAmount = -(minSpeed + ratio * (maxSpeed - minSpeed));
    } else if (rightDist < threshold) {
      const ratio = (threshold - rightDist) / threshold;
      scrollAmount = minSpeed + ratio * (maxSpeed - minSpeed);
    }

    if (scrollAmount !== 0) {
      container.scrollLeft += scrollAmount;
    }
  };

  const onDragEnd = () => {
    if (isMobileView && dropTargetRef.current && scrollRef.current) {
      const { toStatus } = dropTargetRef.current;

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
    }

    setActiveTask(null);
    dropTargetRef.current = null;
  };

  return { sensors, activeTask, onDragStart, onDragOver, onDragEnd, onDragMove };
};
