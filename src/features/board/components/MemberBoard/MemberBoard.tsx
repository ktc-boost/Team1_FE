import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MemberColumn from '@/features/board/components/MemberBoard/MemberColumn';
import DoneColumn from '@/features/board/components/MemberBoard/DoneColumn';
import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/query/useInfiniteProjectTasksByStatusQuery';
import { useHorizontalScroll } from '@/features/board/hooks/useHorizontalScroll';
import type { TaskListItem } from '@/features/task/types/task.domain.types';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import { useProjectBoostingScoresQuery } from '@/features/project/hooks/query/useProjectBoostingScoresQuery';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';
import { combineMembersWithBoostingScores } from '@/features/project/utils/memberUtils';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';

interface MemberBoardProps {
  projectId?: string;
}

const MemberBoard = ({ projectId }: MemberBoardProps) => {
  const [isBoardHover, setIsBoardHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    ref: scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
  } = useHorizontalScroll<HTMLDivElement>();

  const { data: projectMembers, isLoading } = useProjectMembersQuery(projectId);
  const { data: projectBoostingScores } = useProjectBoostingScoresQuery(projectId);

  const projectMembersWithBoosting = combineMembersWithBoostingScores(
    projectMembers,
    projectBoostingScores,
  );

  const myInfo = useAuthStore((state) => state.user);

  const sortedMembersWithBoosting = projectMembersWithBoosting
    ? [
        ...(myInfo ? projectMembersWithBoosting.filter((m) => m.id === myInfo.id) : []),
        ...projectMembersWithBoosting.filter((m) => m.id !== myInfo?.id),
      ]
    : [];

  const isAllScoreZero = projectMembersWithBoosting?.every((m) => m.totalScore === 0) ?? true;

  const { data: doneData } = useInfiniteProjectTasksByStatusQuery(
    projectId ?? '',
    TASK_STATUS.DONE,
  );
  const doneTasks: TaskListItem[] = doneData?.pages.flatMap((page) => page.tasks) ?? [];

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCurrentIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const totalColumnsCount = sortedMembersWithBoosting.length + 1;

  const handleMouseEnter = () => setIsBoardHover(true);
  const handleMouseLeave = () => setIsBoardHover(false);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div
      className="relative w-full h-full flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 인디케이터 (모바일용)*/}
      <div className="flex justify-center gap-2 pt-3.5 py-2 shrink-0 md:hidden">
        {Array.from({ length: totalColumnsCount }).map((_, idx) => (
          <div
            key={idx}
            className="h-2 rounded-full bg-gray-400 transition-[width, background-color] duration-300 ease-out"
            style={{
              width: idx === currentIndex ? 24 : 8,
              opacity: idx === currentIndex ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* 가로 스크롤 버튼 (데스크탑용) */}
      {isBoardHover && canScrollLeft && (
        <>
          <div className="hidden md:block pointer-events-none fixed ml-[75px] left-0 h-[calc(100%-152px)] w-16 z-40 bg-gradient-to-r from-gray-300/90 to-transparent" />
          <button
            onClick={() => scroll('left')}
            className="fixed ml-18 mt-18 left-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-300/70 hover:bg-gray-300 rounded-full shadow-md"
          >
            <ChevronLeft />
          </button>
        </>
      )}
      {isBoardHover && canScrollRight && (
        <>
          <div className="hidden md:block pointer-events-none fixed right-0 h-[calc(100%-152px)] w-16 z-40 bg-gradient-to-l from-gray-400/60 to-transparent" />
          <button
            onClick={() => scroll('right')}
            className="fixed mr-2 mt-18 right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-300/70 hover:bg-gray-300 rounded-full shadow-md"
          >
            <ChevronRight />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex flex-nowrap flex-grow overflow-x-auto overflow-y-hidden items-stretch scroll-smooth snap-x snap-mandatory md:snap-none h-full md:pt-2 pb-4 px-2"
      >
        <div className="flex gap-3 min-w-max h-full items-stretch">
          {(sortedMembersWithBoosting ?? []).map((member: MemberWithBoosting) => (
            <MemberColumn
              key={member.id}
              projectId={projectId ?? ''}
              member={member}
              isAllScoreZero={isAllScoreZero}
            />
          ))}

          <DoneColumn tasks={doneTasks} />
        </div>
      </div>
    </div>
  );
};

export default MemberBoard;
