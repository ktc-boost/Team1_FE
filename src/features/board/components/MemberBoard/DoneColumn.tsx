import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import doneIcon from '@/shared/assets/images/etc/done.png';
import { Avatar, AvatarImage } from '@/shared/components/shadcn/avatar';
import type { TaskListItem } from '@/features/task/types/task.domain.types';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import BaseColumnLayout from '@/features/board/components/MemberBoard/BaseColumnLayout';

interface DoneColumnProps {
  tasks: TaskListItem[];
}

const DoneColumn = ({ tasks }: DoneColumnProps) => {
  const { selectedTags } = useTagFilterStore();

  const filteredTasks =
    selectedTags.length > 0
      ? tasks.filter((task) =>
          selectedTags.every((tag) => task.tags?.some((t) => t.tagId === tag.tagId)),
        )
      : tasks;

  return (
    <BaseColumnLayout
      columnBgColor="bg-gray-100"
      headerBgColor="bg-gray-200"
      separatorColor="bg-gray-400"
      headerAvatar={(isProfileCollapsible) => (
        <Avatar
          className={cn(
            'items-center justify-center',
            isProfileCollapsible ? 'w-23 h-23' : 'w-27 h-27',
          )}
        >
          <AvatarImage
            src={doneIcon}
            className={cn(isProfileCollapsible ? 'w-20 h-20' : 'w-22 h-22')}
          />
        </Avatar>
      )}
      headerContent={(isProfileCollapsible) => (
        <motion.div
          className={cn(
            'flex flex-row md:flex-col',
            isProfileCollapsible ? 'gap-1 items-start' : 'gap-4 items-center',
          )}
          animate={{ x: isProfileCollapsible ? -20 : 0, y: isProfileCollapsible ? -4 : 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className={cn('items-center title1-bold mt-2 text-gray-600', {
              'mr-10 md:mr-18': isProfileCollapsible,
            })}
          >
            진행 완료
          </div>

          <div className="flex justify-center items-center mt-2 md:mt-0 bg-gray-300 px-2 py-1 label1-regular rounded-md w-fit">
            {filteredTasks.length}
          </div>
        </motion.div>
      )}
    >
      {filteredTasks.map((task) => (
        <TaskCard key={task.taskId} task={task} draggable={false} />
      ))}
    </BaseColumnLayout>
  );
};

export default DoneColumn;
