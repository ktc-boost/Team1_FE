import { motion } from 'framer-motion';
import { useState } from 'react';
import type { TaskListItem } from '@/features/task/types/task.domain.types';
import { useVerticalScroll } from '@/features/board/hooks/useVerticalScroll';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import doneIcon from '@/shared/assets/images/etc/done.png';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Separator } from '@/shared/components/shadcn/separator';
import { COLLAPSIBLE_SCROLL_THRESHOLD } from '@/features/board/constants/board.ui.constants';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';

interface DoneColumnProps {
  tasks: TaskListItem[];
}

const DoneColumn = ({ tasks }: DoneColumnProps) => {
  const [isProfileCollapsible, setIsProfileCollapsible] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);

  const { selectedTags } = useTagFilterStore();

  const filteredTasks =
    selectedTags.length > 0
      ? tasks.filter((task) =>
          selectedTags.every((tag) => task.tags?.some((t) => t.tagId === tag.tagId)),
        )
      : tasks;

  const scrollRef = useVerticalScroll<HTMLDivElement>(() => {
    if (!scrollRef.current || !isMouseInside) return;
    const { scrollHeight } = scrollRef.current;
    setIsProfileCollapsible(scrollHeight > COLLAPSIBLE_SCROLL_THRESHOLD);
  });

  const handleMouseEnter = () => setIsMouseInside(true);
  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setIsProfileCollapsible(false);
  };

  return (
    <div
      className="flex flex-col bg-gray-200 m-1 shadow-md rounded-xl border-2 border-gray-300 w-[330px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex items-center gap-3 justify-between p-3 rounded-t-xl sticky top-0 bg-gray-200 z-10"
        animate={{ flexDirection: isProfileCollapsible ? 'row' : 'column' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className={cn('flex items-center mt-5', { 'ml-3': isProfileCollapsible })}
          animate={{
            marginTop: isProfileCollapsible ? '0px' : '20px',
            scale: isProfileCollapsible ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Avatar
            className={cn(
              'flex items-center justify-center',
              isProfileCollapsible ? 'w-23 h-23' : 'w-27 h-27',
            )}
          >
            <AvatarImage
              src={doneIcon}
              className={cn(isProfileCollapsible ? 'w-20 h-20' : 'w-22 h-22')}
            />
          </Avatar>
        </motion.div>

        <motion.div
          className={cn(
            'flex flex-col',
            isProfileCollapsible ? 'gap-1 items-start' : 'gap-4 items-center',
          )}
          animate={{
            x: isProfileCollapsible ? -20 : 0,
            y: isProfileCollapsible ? -4 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className={cn('items-center title1-bold mt-2 text-gray-600', {
              'mr-18': isProfileCollapsible,
            })}
          >
            진행 완료
          </div>

          <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-md w-fit">
            {filteredTasks.length}
          </div>
        </motion.div>
      </motion.div>

      <Separator
        className={cn(
          isProfileCollapsible ? 'my-2 bg-gray-300' : 'bg-gray-400 !w-3/5 mx-auto my-7',
        )}
      />

      <div ref={scrollRef} className="relative flex flex-col p-2 gap-4 overflow-y-auto flex-grow">
        {filteredTasks.map((task) => (
          <TaskCard key={task.taskId} task={task} draggable={false} />
        ))}
      </div>
    </div>
  );
};

export default DoneColumn;
