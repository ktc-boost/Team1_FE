import { useEffect, useRef } from 'react';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import type { TaskListItem } from '@/features/task/types/task.domain.types';
import type { TaskQuery } from '@/features/task/types/task.query.types';

interface MobileStatusColumnContentProps {
  tasks: TaskListItem[];
  query: TaskQuery;
  projectId?: string;
  onSelectTask: (task: TaskListItem) => void;
}

/*
 * [📦 보관] 모바일 버전 칸반보드 구현 코드
 *
 * PR 리뷰 과정에서 다른 방식이 채택되어
 * 현재는 미적용 상태
 *
 * 참고용 보관 (불필요 시 삭제 예정)
 */
const MobileStatusColumnContent = ({
  tasks,
  query,
  projectId,
  onSelectTask,
}: MobileStatusColumnContentProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const selectedTags = useTagFilterStore((state) => state.selectedTags);

  const filteredTasks =
    selectedTags.length > 0
      ? tasks.filter((task) =>
          selectedTags.every((tag) => task.tags?.some((t) => t.tagId === tag.tagId)),
        )
      : tasks;

  useEffect(() => {
    if (!loadMoreRef.current || !query.hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          query.fetchNextPage();
        }
      },
      { threshold: 0.5, rootMargin: '100px' },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [query]);

  return (
    <div className="flex flex-col gap-3 p-3 bg-gray-50/80 border-t border-gray-100">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.taskId}
          task={task}
          draggable={false}
          showProjectNameTag={!projectId}
          onOpenStatusDrawer={() => onSelectTask(task)}
        />
      ))}
      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
};

export default MobileStatusColumnContent;
