import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useRef } from 'react';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import type { TaskStatusMeta } from '@/features/task/types/task.domain.types';
import type { TaskQuery } from '@/features/task/types/task.query.types';
import { getTaskCountByStatus } from '@/features/task/utils/taskUtils';
import { useStatusTaskCountQueries } from '@/features/board/hooks/useStatusTaskCountQueries';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import InlineLoader from '@/shared/components/ui/loading/InlineLoader';

interface StatusColumnProps {
  column: TaskStatusMeta;
  query: TaskQuery;
  projectId?: string;
}

const StatusColumn = ({ column, query, projectId }: StatusColumnProps) => {
  const { data: statusTaskCountList } = useStatusTaskCountQueries(projectId);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = query;
  const { selectedTags } = useTagFilterStore();
  const tasks = data?.pages.flatMap((page) => page.tasks) || [];
  const sortedTasks = Array.from(new Map(tasks.map((t) => [t.taskId, t])).values());

  const filteredTasks =
    selectedTags.length > 0
      ? sortedTasks.filter((task) =>
          selectedTags.every((tag) => task.tags?.some((t) => t.tagId === tag.tagId)),
        )
      : sortedTasks;

  const taskIds = filteredTasks.map((task) => task.taskId);

  const { setNodeRef } = useDroppable({
    id: column.status,
    data: { type: 'Column', column },
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastTaskRef = (node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 m-0.5 md:m-1 shadow-md rounded-xl flex flex-col flex-none w-[calc(100vw-32px)] snap-center md:w-full min-w-[250px] md:snap-align-none md:flex-1"
    >
      <div className="bg-gray-200 shadow-xs text-md h-[45px] rounded-md p-3 label1-regular flex items-center">
        <div className="flex gap-2 text-gray-600 items-center">
          {column.title}
          <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-full">
            {selectedTags.length > 0
              ? filteredTasks.length
              : getTaskCountByStatus(column.status, statusTaskCountList)}
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {filteredTasks.map((task, idx) => {
            const isLast = idx === filteredTasks.length - 1;
            return (
              <TaskCard
                key={task.taskId}
                task={task}
                draggable
                ref={isLast ? lastTaskRef : null}
                showProjectNameTag={!projectId}
              />
            );
          })}
          {isFetchingNextPage && <InlineLoader size={5} />}
        </SortableContext>
      </div>
    </div>
  );
};

export default StatusColumn;
