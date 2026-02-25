import { useOutletContext } from 'react-router-dom';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import ProjectFilterTab from '@/features/project/components/ProjectPageComponents/ProjectFilterTab';
import MyTaskFilterTab from '@/features/my-task/components/MyTaskPageComponents/MyTaskFilterTab';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Separator } from '@/shared/components/shadcn/separator';
import { useSortStore } from '@/features/board/store/useSortStore';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import type { Board, Page } from '@/features/board/types/board.domain.types';
import { BOARD, PAGE } from '@/features/board/constants/board.domain.constants';
import { useIsMobile } from '@/shared/hooks/use-mobile';

const StatusBoard = lazy(() => import('@/features/board/components/StatusBoard/StatusBoard'));
const MemberBoard = lazy(() => import('@/features/board/components/MemberBoard/MemberBoard'));
const MobileStatusBoard = lazy(
  () => import('@/features/board/components/MobileStatusBoard/MobileStatusBoard'),
);

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

  const isMobile = useIsMobile();

  useEffect(() => {
    resetSort();
  }, [resetSort]);

  useEffect(() => {
    clearTags();
  }, [projectId, clearTags]);

  const [boardTab, setBoardTab] = useState<Board>(
    initialTab === BOARD.MEMBER ? BOARD.MEMBER : BOARD.STATUS,
  );

  const renderFilterTab = () => {
    if (type === PAGE.PROJECT) return <ProjectFilterTab value={boardTab} onChange={setBoardTab} />;
    return <MyTaskFilterTab />;
  };

  /* 📍TODO: 모바일 버전 칸반보드 UI 확정 후 수정 필요. */
  const renderBoard = () => {
    if (boardTab === BOARD.MEMBER) return <MemberBoard projectId={projectId} />;
    if (type === PAGE.PROJECT && projectId) {
      if (isMobile) return <MobileStatusBoard projectId={projectId} />;
      return <StatusBoard projectId={projectId} />;
    }
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
