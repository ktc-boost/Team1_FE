import { MoreVertical, PlusCircle, UserPlus } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';

interface HeaderProps {
  title: string;
  showProjectActions?: boolean;
  onProjectManageClick?: () => void;
  onProjectJoinCodeClick?: () => void;
  onCreate: () => void;
  createLabel?: string;
}

const Header = ({
  title,
  showProjectActions = false,
  onProjectManageClick,
  onProjectJoinCodeClick,
  onCreate,
  createLabel = '할 일 생성',
}: HeaderProps) => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const projectActionButtons = showProjectActions && (
    <>
      <Button
        onClick={onProjectManageClick}
        variant="outline"
        size="icon-sm"
        className="border-gray-300"
      >
        <MoreVertical />
      </Button>
      <Button
        onClick={onProjectJoinCodeClick}
        variant="outline"
        size="icon-sm"
        className="border-gray-300"
      >
        <UserPlus />
      </Button>
    </>
  );

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="hidden sm:flex items-center justify-between p-6 h-26">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 label1-regular">{today}</span>
          <span className="text-3xl title1-bold">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          {projectActionButtons}

          <Button variant="defaultBoost" onClick={onCreate} className="h-8">
            <PlusCircle />
            {createLabel}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 sm:hidden">
        <span className="text-gray-500 label2-regular">{today}</span>

        <div className="flex items-center justify-between">
          <span className="title1-bold">{title}</span>

          {showProjectActions && (
            <div className="flex items-center gap-1 ml-2">{projectActionButtons}</div>
          )}
        </div>

        <Button variant="defaultBoost" onClick={onCreate} className="w-full">
          <PlusCircle />
          {createLabel}
        </Button>
      </div>
    </div>
  );
};

export default Header;
