import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { useInfiniteProjectTasksByMemberQuery } from '@/features/task/hooks/query/useInfiniteProjectTasksByMemberQuery';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import rocket from '@/shared/assets/images/boost/rocket-2d.png';
import { COLUMN_ORDER } from '@/features/board/constants/board.domain.constants';
import { useProjectTaskCountByMemberQuery } from '@/features/task/hooks/query/useProjectTaskCountByMemberQuery';
import { getTaskCountByMember } from '@/features/task/utils/taskUtils';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';
import Crown from '@/shared/assets/images/boost/crown.png';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import BoostingScoreInfoCard from '@/features/board/components/MemberBoard/BoostingScoreInfoCard';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import InlineLoader from '@/shared/components/ui/loading/InlineLoader';
import { TASK_STATUS, TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';
import type { TaskListItem } from '@/features/task/types/task.domain.types';
import BaseColumnLayout from '@/features/board/components/MemberBoard/BaseColumnLayout';

interface MemberColumnProps {
  projectId: string;
  member: MemberWithBoosting;
  isAllScoreZero: boolean;
}

const MemberColumn = ({ projectId, member, isAllScoreZero }: MemberColumnProps) => {
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
  const activeTasks = tasks.filter((t) => t.status !== TASK_STATUS.DONE);

  const filteredActiveTasks =
    selectedTags.length > 0
      ? activeTasks.filter((task: TaskListItem) =>
          selectedTags.every((tag) => task.tags?.some((t) => t.tagId === tag.tagId)),
        )
      : activeTasks;

  const sortedColumnStatus = TASK_STATUS_META.filter((c) => c.status !== TASK_STATUS.DONE).sort(
    (a, b) => COLUMN_ORDER.member.indexOf(a.status) - COLUMN_ORDER.member.indexOf(b.status),
  );

  const columnData = sortedColumnStatus.map(({ status, title }) => ({
    status,
    title,
    tasks: filteredActiveTasks.filter((t) => t.status === status),
  }));

  return (
    <BaseColumnLayout
      columnBgColor="bg-gray-100"
      headerBgColor="bg-gray-100"
      onScrollBottom={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      headerAvatar={(isProfileCollapsible) => (
        <>
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
              'items-center justify-center shadow-sm',
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
        </>
      )}
      headerContent={(isProfileCollapsible) => (
        <>
          <div className={cn(isProfileCollapsible ? 'title2-bold ml-1.5' : 'title1-bold')}>
            {member.name}
          </div>
          <div
            className={cn(
              'flex flex-row items-center gap-1 bg-red-400 rounded-full text-gray-100',
              isProfileCollapsible
                ? 'px-1 pr-3 py-0.5 caption1-regular'
                : 'px-2 pr-4 py-1 label2-regular',
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
        </>
      )}
    >
      {columnData.map(({ status, title, tasks: filteredTasks }) => (
        <div key={status} className="bg-gray-100 p-2 border-b-1 border-gray-300">
          <div className="flex flex-row items-center">
            <div className="label1-regular text-gray-500 m-2">{title}</div>
            <div className="flex justify-center items-center bg-gray-300 px-2 py-1 label2-regular rounded-md w-6 h-6">
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
    </BaseColumnLayout>
  );
};

export default MemberColumn;
