import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Accordion } from '@/shared/components/shadcn/accordion';
import { useStatusBoardQueries } from '@/features/board/hooks/useStatusBoardQueries';
import MobileStatusColumn from '@/features/board/components/MobileStatusBoard/MobileStatusColumn';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';

interface MobileStatusBoardProps {
  projectId?: string;
}

const MobileStatusBoard = ({ projectId }: MobileStatusBoardProps) => {
  const [openValue, setOpenValue] = useState<string>('');

  const columnsData = useStatusBoardQueries(projectId);
  const queryMap = Object.fromEntries(columnsData.map((c) => [c.status, c.query]));

  const isAllClosed = openValue === '';

  return (
    <div className="p-3 h-full flex flex-col overflow-y-auto scrollbar-stable">
      <Accordion
        type="single"
        collapsible
        value={openValue}
        onValueChange={(val) => setOpenValue(val ?? '')}
        className={cn('flex flex-col gap-2.5', isAllClosed ? 'h-full' : 'h-auto')}
      >
        {TASK_STATUS_META.map((column) => {
          const query = queryMap[column.status];
          const tasks = query.data?.pages.flatMap((p) => p.tasks) ?? [];
          const isEmpty = tasks.length === 0;

          return (
            <MobileStatusColumn
              key={column.status}
              column={column}
              projectId={projectId}
              query={query}
              isOpen={openValue === column.status}
              isAllClosed={isAllClosed}
              isEmpty={isEmpty}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default MobileStatusBoard;
