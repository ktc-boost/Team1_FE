import { useProjectsQuery } from '@/features/project/hooks/query/useProjectsQuery';
import { useModal } from '@/shared/hooks/useModal';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useProjectsStore } from '@/features/project/store/useProjectsStore';
import { useProjectModals } from '@/features/project/hooks/modal/useProjectModals';
import { useEffect, useRef } from 'react';
import { Separator } from '@/shared/components/shadcn/separator';
import MyTaskHeader from '@/features/my-task/components/MyTaskPageComponents/MyTaskHeader';
import MyTaskTopTab from '@/features/my-task/components/MyTaskPageComponents/MyTaskTopTab';
import BoardSection from '@/features/board/components/BoardSection';
import MovingBoo from '@/shared/components/ui/MovingBoo';

const MyTaskPage = () => {
  const { data: projects, isLoading } = useProjectsQuery();
  const { showCustom } = useModal();
  const { showCreateProjectModal, showJoinProjectModal } = useProjectModals();
  const { user } = useAuthStore();
  const setProjects = useProjectsStore((state) => state.setProjects);

  const hasShownModal = useRef(false);

  useEffect(() => {
    if (!isLoading && projects) {
      setProjects(
        projects.map((p) => ({
          id: p.id,
          name: p.name,
          role: p.role,
          defaultReviewerCount: p.defaultReviewerCount,
        })),
      );
    }
  }, [projects, isLoading, setProjects]);

  useEffect(() => {
    if (!isLoading && projects?.length === 0 && !hasShownModal.current) {
      hasShownModal.current = true;

      showCustom({
        title: '프로젝트가 존재하지 않아요!',
        titleAlign: 'center',
        description: '프로젝트에 참여하거나, 생성해보세요.',
        size: 'md',
        content: <MovingBoo />,
        buttons: [
          {
            text: '프로젝트 생성',
            variant: 'secondaryBoost',
            onClick: showCreateProjectModal,
          },
          {
            text: '프로젝트 참여',
            variant: 'defaultBoost',
            onClick: showJoinProjectModal,
          },
        ],
      });
    }
  }, [isLoading, projects, showCustom, showCreateProjectModal, showJoinProjectModal]);

  if (!user) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  return (
    <div className="flex flex-row flex-1 overflow-x-auto h-screen">
      <div className="flex-1 flex flex-col min-w-0">
        <nav aria-label="top-tab">
          <MyTaskTopTab />
        </nav>

        <header aria-label="header">
          <MyTaskHeader userName={user.name} />
        </header>

        <Separator className="bg-gray-300" />

        <section aria-label="board" className="overflow-x-auto flex-1">
          <BoardSection type="myTask" />
        </section>
      </div>
    </div>
  );
};

export default MyTaskPage;
