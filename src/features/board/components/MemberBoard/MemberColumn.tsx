import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { useInfiniteProjectTasksByMemberQuery } from '@/features/task/hooks/query/useInfiniteProjectTasksByMemberQuery';
import { useVerticalScroll } from '@/features/board/hooks/useVerticalScroll';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Separator } from '@/shared/components/shadcn/separator';
import rocket from '@/shared/assets/images/boost/rocket-2d.png';
import { columnOrder, columnStatus } from '@/features/board/types/boardTypes';
import { COLLAPSIBLE_SCROLL_THRESHOLD } from '@/features/board/constants/scroll';
import { useProjectTaskCountByMemberQuery } from '@/features/task/hooks/query/useProjectTaskCountByMemberQuery';
import { getTaskCountByMember } from '@/features/task/utils/taskUtils';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';
import Crown from '@/shared/assets/images/boost/crown.png';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import BoostingScoreInfoCard from '@/features/board/components/MemberBoard/BoostingScoreInfoCard';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import InlineLoader from '@/shared/components/ui/loading/InlineLoader';

interface MemberColumnProps {
  projectId: string;
  member: MemberWithBoosting;
  isAllScoreZero: boolean;
}

const MemberColumn = ({ projectId, member, isAllScoreZero }: MemberColumnProps) => {
  const [isProfileCollapsible, setIsProfileCollapsible] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const { selectedTags } = useTagFilterStore();

  const { data: memberTaskCountMap } = useProjectTaskCountByMemberQuery(projectId);
  const memberTaskCountList = memberTaskCountMap?.[member.id] ?? {
    todo: 0,
    progress: 0,
    review: 0,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProjectTasksByMemberQuery(projectId, member.id);

  const tasks = data?.pages.flatMap((page) => page.tasks) ?? [];
  const activeTasks = tasks.filter((t) => t.status !== 'DONE');

  const filteredActiveTasks =
    selectedTags.length > 0
      ? activeTasks.filter((task) =>
          selectedTags.every((tag) => task.tags?.some((t) => t.tagId === tag.tagId)),
        )
      : activeTasks;

  const sortedColumnStatus = columnStatus
    .filter((c) => c.status !== 'DONE')
    .sort((a, b) => columnOrder.indexOf(a.status) - columnOrder.indexOf(b.status));

  const columnData = sortedColumnStatus.map(({ status, title }) => ({
    status,
    title,
    tasks: filteredActiveTasks.filter((t) => t.status === status),
  }));

  const scrollRef = useVerticalScroll<HTMLDivElement>(() => {
    if (!scrollRef.current || !isMouseInside) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setIsProfileCollapsible(scrollHeight > COLLAPSIBLE_SCROLL_THRESHOLD);

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const handleMouseEnter = () => setIsMouseInside(true);
  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setIsProfileCollapsible(false);
  };

  return (
    <div
      className="flex bg-gray-100 m-1 h-full shadow-md rounded-xl border-2 border-gray-300 flex-col w-[330px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 프로필 영역 */}
      <motion.div
        className="flex items-center gap-3 justify-between p-3 rounded-t-xl sticky top-0 bg-gray-100 z-10"
        animate={{ flexDirection: isProfileCollapsible ? 'row' : 'column' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className={cn('relative flex items-center mt-6', { 'ml-[12px]': isProfileCollapsible })}
          animate={{
            marginTop: isProfileCollapsible ? '0px' : '20px',
            scale: isProfileCollapsible ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {member.rank === 1 && !isAllScoreZero && (
            <motion.img
              src={Crown}
              alt="1st"
              className={cn(
                'absolute w-9 h-9 z-10',
                isProfileCollapsible ? 'top-[-20px] left-7' : 'top-[-18px] left-9',
              )}
              animate={{ y: [0, -1.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <Avatar
            className={cn(
              'flex items-center justify-center shadow-sm',
              isProfileCollapsible ? 'w-23 h-23' : 'w-27 h-27',
            )}
            style={{ backgroundColor: member.backgroundColor }}
          >
            <AvatarFallback>{member.name[0]}</AvatarFallback>
            <AvatarImage
              src={getAvatarSrc(member)}
              className={cn(isProfileCollapsible ? 'w-20 h-20' : 'w-22 h-22')}
            />
          </Avatar>
        </motion.div>

        <motion.div
          className={cn(
            'flex flex-col',
            isProfileCollapsible ? 'gap-1 items-start mr-5 mb-2' : 'gap-4 items-center',
          )}
        >
          <div className={cn(isProfileCollapsible ? 'title2-bold ml-1.5' : 'title1-bold')}>
            {member.name}
          </div>
          <div
            className={cn(
              'flex flex-row items-center gap-1 bg-red-400 rounded-full text-gray-100',
              isProfileCollapsible ? 'px-1 pr-3 py-0.5 text-xs' : 'px-2 pr-4 py-1 text-sm',
            )}
          >
            <img
              src={rocket}
              className={cn(isProfileCollapsible ? 'w-5 h-5' : 'w-7 h-7')}
              alt="rocket"
            />
            <strong className="mr-1">BOOSTING SCORE</strong>
            {member.totalScore}

            {member.id === currentUser?.id && !isProfileCollapsible && (
              <BoostingScoreInfoCard calculatedAt={member.calculatedAt} />
            )}
          </div>
        </motion.div>
      </motion.div>

      <Separator
        className={cn('bg-gray-300', isProfileCollapsible ? 'my-2' : '!w-3/5 mx-auto my-7')}
      />

      {/* Task 목록 영역 */}
      <div ref={scrollRef} className="flex flex-col p-2 gap-4 overflow-y-auto flex-grow">
        {columnData.map(({ status, title, tasks: filteredTasks }) => (
          <div key={status} className="bg-gray-100 p-2 border-b-1 border-gray-300">
            <div className="flex flex-row items-center">
              <div className="label1-regular text-gray-500 m-2">{title}</div>
              <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-md w-6 h-6">
                {selectedTags.length > 0
                  ? filteredTasks.length
                  : getTaskCountByMember(status, memberTaskCountList)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {filteredTasks.map((task) => (
                <TaskCard key={task.taskId} task={task} draggable={false} />
              ))}
            </div>
          </div>
        ))}
        {isFetchingNextPage && <InlineLoader size={5} />}
      </div>
    </div>
  );
};

export default MemberColumn;
