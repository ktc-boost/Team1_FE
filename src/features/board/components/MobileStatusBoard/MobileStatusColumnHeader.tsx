import { CalendarX, ChevronDown, Clock } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import StatusPill from '@/shared/components/ui/StatusPill';
import { isToday } from '@/shared/utils/dateUtils';
import { AvatarGroup } from '@/shared/components/shadcn/avatar';
import Siren from '@/shared/assets/images/boost/siren.png';
import AssigneesList from '@/features/task/components/TaskCard/AssigneesList';
import type { TaskListItem, TaskStatusMeta } from '@/features/task/types/task.domain.types';
import type { StatusThemeItem } from '@/features/board/types/board.ui.types';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';

interface MobileStatusColumnHeaderProps {
  column: TaskStatusMeta;
  theme: StatusThemeItem;
  tasks: TaskListItem[];
  statusTaskCount: number;
  statusSharePct: number;
  isEmpty: boolean;
  isOpen: boolean;
}

/*
 * [📦 보관] 모바일 버전 칸반보드 구현 코드
 *
 * PR 리뷰 과정에서 다른 방식이 채택되어
 * 현재는 미적용 상태
 *
 * 참고용 보관 (불필요 시 삭제 예정)
 */
const MobileStatusColumnHeader = ({
  column,
  theme,
  tasks,
  statusTaskCount,
  statusSharePct,
  isEmpty,
  isOpen,
}: MobileStatusColumnHeaderProps) => {
  const Icon = theme.icon;
  const selectedTags = useTagFilterStore((state) => state.selectedTags);

  const filteredTasks =
    selectedTags.length > 0
      ? tasks.filter((task) =>
          selectedTags.every((tag) => task.tags?.some((t) => t.tagId === tag.tagId)),
        )
      : tasks;

  const urgentCount = filteredTasks.filter((t) => t.urgent).length;
  const overdueCount = filteredTasks.filter((t) => new Date(t.dueDate) < new Date()).length;
  const todayCount = filteredTasks.filter((t) => isToday(t.dueDate)).length;
  const uniqueAssignees = Array.from(
    new Map(filteredTasks.flatMap((t) => t.assignees ?? []).map((a) => [a.id, a])).values(),
  )
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 4);

  return (
    <div className="w-full flex flex-col gap-4 px-4 pt-3.5 pb-3 h-full">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2 min-w-0">
            <span className={cn(theme.iconColor)}>
              <Icon className="w-4 h-4" />
            </span>
            <span className="label1-bold tracking-tight truncate">{column.title}</span>
            <span
              className={cn(
                'shrink-0 label2-bold w-4.5 h-4.5 rounded-full flex items-center justify-center',
                theme.pill,
              )}
            >
              {selectedTags.length > 0 ? filteredTasks.length : statusTaskCount}
            </span>

            {urgentCount > 0 && (
              <StatusPill
                className="bg-red-50 text-red-500 ring-red-100"
                icon={<img src={Siren} alt="urgent" className="w-4 h-4" />}
              >
                {urgentCount}
              </StatusPill>
            )}

            {overdueCount > 0 && (
              <StatusPill
                className="bg-boost-orange/5 text-boost-orange ring-boost-orange/30"
                icon={<CalendarX className="w-3 h-3" />}
              >
                지남 {overdueCount}
              </StatusPill>
            )}

            {todayCount > 0 && (
              <StatusPill
                className="bg-boost-yellow/5 text-boost-yellow ring-boost-yellow/30"
                icon={<Clock className="w-3 h-3" />}
              >
                오늘 {todayCount}
              </StatusPill>
            )}
          </div>

          {!isEmpty && (
            <ChevronDown
              className={cn(
                'w-4 h-4 shrink-0 text-gray-400 transition-transform duration-300',
                isOpen && 'rotate-180',
              )}
            />
          )}
        </div>

        <p className="caption1-regular text-gray-400 w-full text-left leading-tight">
          {theme.description}
        </p>

        <div className="flex items-center gap-2 w-full">
          <div className={cn('flex-1 h-1.5 rounded-full overflow-hidden', theme.track)}>
            <div
              className={cn('h-full rounded-full transition-all duration-500', theme.accent)}
              style={{ width: `${statusSharePct}%` }}
            />
          </div>
          <span className={cn('caption1-bold tabular-nums shrink-0', theme.labelColor)}>
            {statusSharePct.toFixed(2)}%
          </span>
        </div>
      </div>

      {isEmpty ? (
        <div className="flex flex-col [@media(max-height:800px)]:hidden label2-regular pl-1 text-left">
          <span className="text-gray-500">{theme.emptyTitle}</span>
          <span className="text-gray-400">{theme.emptyDesc}</span>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full gap-2 [@media(max-height:800px)]:hidden">
          <AvatarGroup>
            {uniqueAssignees.map((assignee) => (
              <AssigneesList key={assignee.id} assignee={assignee} />
            ))}
          </AvatarGroup>
        </div>
      )}
    </div>
  );
};

export default MobileStatusColumnHeader;
