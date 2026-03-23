import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import StatusColumnTest from '@/features/board/test/StatusColumn.test';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';
import type { TaskListItem } from '@/features/task/types/task.domain.types';
import { useBoardSlider } from '@/features/board/hooks/useBoardSlider';
import { tasks as initialTasks } from '@/features/board/test/mockTasks';
import { useTaskDragTest } from '@/features/board/test/useTaskDrag.test';
import type { ColumnData, TestColumnData } from '@/features/board/types/board.domain.types';

const StatusBoardTest = () => {
  const [taskList, setTaskList] = useState<TaskListItem[]>(initialTasks);

  const columnsData: TestColumnData[] = TASK_STATUS_META.map((col) => ({
    status: col.status,
    tasks: taskList.filter((t) => t.status === col.status),
  }));

  const { isMobileView, chunkedColumns, currentIndex, scrollContainerRef, onScroll } =
    useBoardSlider(columnsData as ColumnData[]);

  const { sensors, activeTask, onDragStart, onDragOver, onDragMove, onDragEnd } = useTaskDragTest({
    setTaskList,
    isMobileView,
    scrollRef: scrollContainerRef,
    chunkedColumns,
  });

  const handleIndicatorClick = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.scrollTo({
      left: el.clientWidth * index,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex-1 flex flex-col p-3 pb-0.5 h-full overflow-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        collisionDetection={closestCorners}
        autoScroll={false}
      >
        {isMobileView && (
          <div className="flex justify-center gap-2 pb-2 pt-0.5 shrink-0 xl:hidden">
            {chunkedColumns.map((_, idx) => (
              <div
                key={idx}
                onClick={() => handleIndicatorClick(idx)}
                className="h-2 rounded-full bg-gray-400 transition-[width, background-color] duration-300 ease-out"
                style={{
                  width: idx === currentIndex ? 24 : 8,
                  opacity: idx === currentIndex ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={onScroll}
          className={cn(
            'flex flex-grow gap-3 items-stretch pb-1',
            isMobileView
              ? activeTask
                ? 'overflow-x-auto snap-none touch-pan-y'
                : 'overflow-x-auto snap-x snap-mandatory touch-pan-y'
              : 'overflow-hidden',
          )}
        >
          {isMobileView
            ? chunkedColumns.map((group, pageIdx) => (
                <div key={pageIdx} className="flex w-full flex-shrink-0 gap-3 snap-center">
                  {group.map(({ status }) => (
                    <StatusColumnTest
                      key={status}
                      column={TASK_STATUS_META.find((c) => c.status === status)!}
                      tasks={taskList.filter((t) => t.status === status)}
                    />
                  ))}
                </div>
              ))
            : columnsData.map(({ status, tasks }) => (
                <StatusColumnTest
                  key={status}
                  column={TASK_STATUS_META.find((c) => c.status === status)!}
                  tasks={tasks}
                />
              ))}
        </div>

        {createPortal(
          <DragOverlay
            dropAnimation={{
              duration: 120,
              easing: 'cubic-bezier(0.2, 0, 0, 1)',
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: '0.7',
                    transform: 'scale(0.98)',
                  },
                },
              }),
            }}
          >
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default StatusBoardTest;
