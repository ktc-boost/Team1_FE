import ProjectMemberItem from '@/features/project/components/ProjectMemberItem';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';

interface ProjectMembersListProps {
  members: MemberWithBoosting[];
}

const ProjectMembersList = ({ members }: ProjectMembersListProps) => {
  return (
    <div className="flex-1.5 overflow-y-auto overflow-x-hidden border-r border-gray-300">
      <div className="space-y-2 min-w-[220px] md:min-w-[260px] lg:min-w-[320px]">
        <p className="md:hidden label1-bold pl-2">프로젝트 멤버</p>
        {members.map((member) => (
          <ProjectMemberItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default ProjectMembersList;
