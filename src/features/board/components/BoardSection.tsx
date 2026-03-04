import { useOutletContext } from 'react-router-dom';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import ProjectFilterTab from '@/features/project/components/ProjectPageComponents/ProjectFilterTab';
import MyTaskFilterTab from '@/features/my-task/components/MyTaskPageComponents/MyTaskFilterTab';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Separator } from '@/shared/components/shadcn/separator';
import { useSortStore } from '@/features/board/store/useSortStore';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import type { Board, Page } from '@/features/board/types/board.domain.types';
import { BOARD, PAGE } from '@/features/board/constants/board.domain.constants';

const StatusBoard = lazy(() => import('@/features/board/components/StatusBoard/StatusBoard'));
const MemberBoard = lazy(() => import('@/features/board/components/MemberBoard/MemberBoard'));

interface BoardSectionProps {
  type: Page;
  boardTab?: Board;
}

interface ProjectOutletContext {
  projectId: string;
}

const BoardSection = ({ type, boardTab: initialTab }: BoardSectionProps) => {
  const context = useOutletContext<ProjectOutletContext | undefined>();
  const projectId = context?.projectId;
  const resetSort = useSortStore((state) => state.resetSort);
  const clearTags = useTagFilterStore((state) => state.clearTags);
  const resetSearch = useBoardSearchStore((state) => state.resetSearch);

  useEffect(() => {
    resetSort();
  }, [resetSort, projectId]);

  const [boardTab, setBoardTab] = useState<Board>(
    initialTab === BOARD.MEMBER ? BOARD.MEMBER : BOARD.STATUS,
  );

  useEffect(() => {
    clearTags();
  }, [projectId, clearTags, boardTab]);

  useEffect(() => {
    resetSearch();
  }, [projectId, resetSearch, boardTab]);

  const renderFilterTab = () => {
    if (type === PAGE.PROJECT) return <ProjectFilterTab value={boardTab} onChange={setBoardTab} />;
    return <MyTaskFilterTab />;
  };

  const renderBoard = () => {
    if (boardTab === BOARD.MEMBER) return <MemberBoard projectId={projectId} />;
    if (type === PAGE.PROJECT && projectId) return <StatusBoard projectId={projectId} />;
    return <StatusBoard />;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <section aria-label="filter" className="shrink-0">
        {renderFilterTab()}
      </section>

      <Separator className="bg-gray-300" />

      <div className="flex-1 min-h-0 overflow-x-auto">
        <Suspense fallback={<FullPageLoader text="보드 불러오는 중.." />}>{renderBoard()}</Suspense>
      </div>
    </div>
  );
};

export default BoardSection;
