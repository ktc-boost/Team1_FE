import { Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routeHelpers';
import Rocket from '@/shared/assets/images/boost/rocket-2d.png';
import { Button } from '@/shared/components/shadcn/button';
import MetaItem from '@/shared/components/ui/MetaItem';
import type { Memo } from '@/features/memo/types/memoTypes';

interface MemoDetailHeaderProps {
  memo: Memo;
  projectId: string;
}

const MemoDetailHeader = ({ memo, projectId }: MemoDetailHeaderProps) => {
  const navigate = useNavigate();

  const handleGoToEdit = () => navigate(ROUTES.PROJECT_MEMO_EDIT(projectId, memo.id));
  const handleGoToList = () => navigate(ROUTES.PROJECT_MEMO_LIST(projectId));

  const formatDate = (date: string) => new Date(date).toLocaleString();

  return (
    <header className="flex-shrink-0 p-1 md:p-3 pb-4 space-y-6 border-b border-gray-300">
      <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-5">
        <div className="flex items-center flex-1 min-w-0 gap-3">
          <div className="flex-shrink-0 p-1 bg-boost-blue/10 rounded-lg">
            <img src={Rocket} alt="rocket" className="w-6 h-6" />
          </div>
          <h1
            className="title2-bold md:title1-bold leading-tight text-gray-900 break-words line-clamp-2 md:line-clamp-1"
            title={memo.title}
          >
            {memo.title}
          </h1>
        </div>

        <div className="flex flex-row flex-shrink-0 gap-2 ml-auto md:ml-0">
          <Button
            variant="outline"
            onClick={handleGoToList}
            className="border-gray-300 hover:bg-gray-200"
          >
            목록으로
          </Button>
          <Button variant="defaultBoost" onClick={handleGoToEdit}>
            수정
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-6 border-t border-gray-100">
        <MetaItem icon={Calendar} label="생성일" value={formatDate(memo.createdAt)} />
        <MetaItem icon={Clock} label="수정일" value={formatDate(memo.updatedAt)} />
      </div>
    </header>
  );
};

export default MemoDetailHeader;
