import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import ContentItem from '@/shared/components/ui/ContentItem';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { MAX_DISPLAY_ASSIGNEES } from '@/features/task-detail/constants/task-detail.ui.constants';
import { Button } from '@/shared/components/shadcn/button';

interface AssigneeMoreListProps {
  assignees: { id: string; name: string; avatar?: string; backgroundColor?: string }[];
}

const AssigneeMoreList = ({ assignees }: AssigneeMoreListProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedAssignees = showAll ? assignees : assignees.slice(0, MAX_DISPLAY_ASSIGNEES);
  const hasMore = assignees.length > MAX_DISPLAY_ASSIGNEES;

  return (
    <ContentItem icon={User} title="담당자">
      <div className="flex flex-wrap gap-2.5 items-center">
        {displayedAssignees.map((assignee) => (
          <div
            key={assignee.id}
            className="flex items-center gap-2 hover:bg-gray-50 transition-colors rounded-lg pr-2 py-1.5"
          >
            <Avatar
              style={{ backgroundColor: assignee.backgroundColor }}
              className="w-8 h-8 sm:w-9 sm:h-9 border border-gray-200  flex items-center justify-center shadow-sm"
            >
              <AvatarImage
                src={getAvatarSrc(assignee)}
                alt={assignee.name}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <AvatarFallback
                style={{ backgroundColor: assignee.backgroundColor }}
                className=" body2-regular"
              >
                {assignee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="label2-regular sm:body2-regular text-gray-700">{assignee.name}</span>
          </div>
        ))}

        {hasMore && (
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="gap-1 px-2 py-1 rounded-full !label2-bold bg-boost-blue/5 hover:bg-boost-blue/10 text-boost-blue-dark/70 hover:text-boost-blue-dark/80 border-boost-blue-dark/10 shadow-sm"
          >
            {showAll ? (
              <>
                접기 <ChevronLeft className="w-2.5 h-2.5" />
              </>
            ) : (
              <>
                + {assignees.length - MAX_DISPLAY_ASSIGNEES}명{' '}
                <ChevronRight className="w-2.5 h-2.5" />
              </>
            )}
          </Button>
        )}
      </div>
    </ContentItem>
  );
};

export default AssigneeMoreList;
