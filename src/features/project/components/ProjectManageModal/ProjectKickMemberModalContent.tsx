import { useKickProjectMemberMutation } from '@/features/project/hooks/mutation/useKickProjectMemberMutation';
import { useModal } from '@/shared/hooks/useModal';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';

interface ProjectKickMemberModalContentProps {
  projectId: string;
  member: MemberWithBoosting;
}

const ProjectKickMemberModalContent = ({
  projectId,
  member,
}: ProjectKickMemberModalContentProps) => {
  const { backModal } = useModal();
  const { mutateAsync: kickMember } = useKickProjectMemberMutation(projectId);

  const handleKickConfirm = async () => {
    try {
      await kickMember(member.id);
      backModal();
      toast.success(`${member.name}님이 프로젝트에서 추방되었어요.`);
    } catch (error) {
      toast.error(
        `멤버 추방 실패: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <MovingBoo size={28} />
      <p className="text-center text-gray-700 label2-regular leading-relaxed">
        <span className="label2-bold">{member.name}</span>님을 추방해도
        <br />
        프로젝트 작업 내역은 남아있습니다.
      </p>
      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant="outline"
          onClick={backModal}
          className="flex flex-1 border-gray-300 hover:bg-gray-100 cursor-pointer"
        >
          취소
        </Button>
        <Button variant="defaultBoost" onClick={handleKickConfirm} className="flex-1">
          추방
        </Button>
      </div>
    </div>
  );
};

export default ProjectKickMemberModalContent;
