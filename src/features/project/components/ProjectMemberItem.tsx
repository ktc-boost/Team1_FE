import { UserRoundX } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useProjectModals } from '@/features/project/hooks/modal/useProjectModals';
import { ROLES } from '@/features/project/constants/projectConstants';

interface ProjectMemberItemProps {
  member: MemberWithBoosting;
}

const ProjectMemberItem = ({ member }: ProjectMemberItemProps) => {
  const projectData = useProjectStore((state) => state.projectData);
  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = currentUser?.id;

  const projectId = projectData?.id;
  const isOwner = projectData?.role === ROLES.OWNER;

  const { showKickProjectMemberModal } = useProjectModals();

  const handleKickClick = () => {
    if (!projectId) return;
    showKickProjectMemberModal(projectId, member);
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-1.5 md:py-3">
      <div className="flex items-center gap-3 flex-1">
        <Avatar
          className="w-8 h-8 md:w-11 md:h-11 flex items-center justify-center shadow-sm"
          style={{ backgroundColor: member.backgroundColor, borderColor: member.backgroundColor }}
        >
          <AvatarImage
            src={getAvatarSrc(member)}
            alt={member.name}
            className="w-7 h-7 md:w-9 md:h-9"
          />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="text-gray-800 subtitle2-bold">{member.name}</div>
          <div className="label2-regular text-gray-500 mt-0.5">
            Boosting Score:{' '}
            <span className="label2-regular text-boost-blue">{member.totalScore}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isOwner && member.id === currentUserId && (
          <span className="label2-regular text-gray-400 mr-2">팀장</span>
        )}

        {isOwner && member.id !== currentUserId && (
          <Button
            variant="outlineSecondaryBoost"
            size="icon"
            onClick={handleKickClick}
            className="rounded-full !border-none"
          >
            <UserRoundX className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectMemberItem;
