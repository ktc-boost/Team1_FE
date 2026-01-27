import { useOutletContext } from 'react-router-dom';
import ProjectFilterTab from '@/features/project/components/ProjectPageComponents/ProjectFilterTab';
import MyTaskFilterTab from '@/features/my-task/components/MyTaskPageComponents/MyTaskFilterTab';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Separator } from '@/shared/components/shadcn/separator';
import { useSortStore } from '@/features/board/store/useSortStore';

const StatusBoard = lazy(() => import('@/features/board/components/StatusBoard/StatusBoard'));
const MemberBoard = lazy(() => import('@/features/board/components/MemberBoard/MemberBoard'));

interface BoardSectionProps {
  type: 'project' | 'myTask';
  boardTab?: 'status' | 'member';
}

interface ProjectOutletContext {
  projectId: string;
}

const BoardSection = ({ type, boardTab: initialTab }: BoardSectionProps) => {
  const context = useOutletContext<ProjectOutletContext | undefined>();
  const projectId = context?.projectId;
  const resetSort = useSortStore((state) => state.resetSort);

  useEffect(() => {
    resetSort();
  }, [resetSort]);

  const [boardTab, setBoardTab] = useState<'status' | 'member'>(
    initialTab === 'status' || initialTab === 'member' ? initialTab : 'status',
  );

  const renderFilterTab = () => {
    if (type === 'project') return <ProjectFilterTab value={boardTab} onChange={setBoardTab} />;
    return <MyTaskFilterTab />;
  };

  const renderBoard = () => {
    if (boardTab === 'member') return <MemberBoard projectId={projectId} />;
    if (type === 'project' && projectId) return <StatusBoard projectId={projectId} />;
    return <StatusBoard />;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <section aria-label="filter" className="shrink-0">
        {renderFilterTab()}
      </section>

      <Separator className="bg-gray-300" />

      <div className="flex-1 min-h-0 overflow-x-auto">
        {/* 📍 suspense에 스켈레톤 ui 필요*/}
        <Suspense fallback={<div className="p-3">보드 불러오는 중…</div>}>{renderBoard()}</Suspense>
      </div>
    </div>
  );
};

export default BoardSection;
