import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';

interface ColumnFallbackProps {
  status: TaskStatus;
  state?: 'loading' | 'error';
}

export const ColumnFallback = ({ status, state = 'loading' }: ColumnFallbackProps) => {
  const columnTitle = TASK_STATUS_META.find((c) => c.status === status)?.title || status;
  const message = state === 'loading' ? '' : state === 'error' ? '불러오기 실패' : '';

  return (
    <div className="bg-gray-200 m-1 shadow-md rounded-xl flex flex-col flex-shrink-0 min-w-[250px] max-w-[350px] flex-1">
      <div className="bg-gray-200 shadow-xs text-md h-[45px] rounded-md p-3 label1-regular flex items-center">
        <div className="flex gap-2 text-gray-600 items-center">
          {columnTitle}
          <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-full">
            0
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow gap-4 p-2 items-center justify-center">
        <span className="text-gray-500 text-sm">{message}</span>
      </div>
    </div>
  );
};
