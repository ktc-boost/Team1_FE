import { DndContext, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/utils';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import StatusColumn from '@/features/board/components/StatusBoard/StatusColumn';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';
import { ColumnFallback } from '@/features/board/components/StatusBoard/ColumnFallback';
import { useStatusBoardQueries } from '@/features/board/hooks/useStatusBoardQueries';
import type { TaskStatus } from '@/features/task/types/task.domain.types';
import type { TaskQuery } from '@/features/task/types/task.query.types';
import { useTaskDrag } from '@/features/board/hooks/useTaskDrag';
import { useBoardSlider } from '@/features/board/hooks/useBoardSlider';

interface StatusBoardProps {
  projectId?: string;
}

const StatusBoard = ({ projectId }: StatusBoardProps) => {
  const columnsData = useStatusBoardQueries(projectId);

  const { isMobileView, chunkedColumns, currentIndex, scrollContainerRef, onScroll } =
    useBoardSlider(columnsData);

  const { sensors, collisionDetection, activeTask, onDragStart, onDragOver, onDragEnd } =
    useTaskDrag({
      projectId,
    });

  const handleIndicatorClick = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.scrollTo({
      left: el.clientWidth * index,
      behavior: 'smooth',
    });
  };

  const renderFallback = (status: TaskStatus, state: 'loading' | 'error') => (
    <ColumnFallback key={status} status={status} state={state} />
  );

  const renderColumn = (status: TaskStatus, query: TaskQuery) => {
    if (query.isLoading) return renderFallback(status, 'loading');
    if (query.isError || !query.data) return renderFallback(status, 'error');

    const column = TASK_STATUS_META.find((c) => c.status === status)!;

    return <StatusColumn key={status} column={column} query={query} projectId={projectId} />;
  };

  return (
    <div className="flex-1 flex flex-col p-3 h-full">
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
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
            'flex flex-grow gap-3 items-stretch scroll-smooth',
            isMobileView ? 'overflow-x-auto snap-x snap-mandatory' : 'overflow-hidden',
          )}
        >
          {isMobileView
            ? chunkedColumns.map((group, pageIdx) => (
                <div key={pageIdx} className="flex w-full flex-shrink-0 gap-3 snap-center">
                  {group.map(({ status, query }) => renderColumn(status, query))}
                </div>
              ))
            : columnsData.map(({ status, query }) => renderColumn(status, query))}
        </div>

        {createPortal(
          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: { active: { opacity: '0.5' } },
              }),
            }}
          >
            {activeTask && <TaskCard task={activeTask} showProjectNameTag={!projectId} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default StatusBoard;
