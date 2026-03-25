import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import type { TaskStatusMeta } from '@/features/task/types/task.domain.types';
import type { TaskListItem } from '@/features/task/types/task.domain.types';

interface StatusColumnTestProps {
  column: TaskStatusMeta;
  tasks: TaskListItem[];
}

const StatusColumnTest = ({ column, tasks }: StatusColumnTestProps) => {
  const taskIds = tasks.map((task) => task.taskId);

  const { setNodeRef } = useDroppable({
    id: column.status,
    data: { type: 'Column', column },
  });

  return (
    <div
      ref={setNodeRef}
      data-status={column.status}
      className="bg-gray-200 m-0.5 md:m-1 shadow-md rounded-xl flex flex-col flex-1 min-w-[250px]"
    >
      <div className="bg-gray-200 shadow-xs h-[45px] rounded-md p-3 label1-regular flex items-center">
        <div className="flex gap-2 text-gray-600 items-center">
          {column.title}
          <div className="flex justify-center items-center bg-gray-300 px-2 py-1 label2-regular rounded-full">
            {tasks.length}
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard key={task.taskId} task={task} draggable />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default StatusColumnTest;
