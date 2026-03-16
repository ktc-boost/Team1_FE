import { useNavigate, useParams } from 'react-router-dom';
import MemoList from '@/features/memo/components/MemoList/MemoList';
import { ROUTES } from '@/app/routes/routeHelpers';

export default function MemoSection() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const handleSelectMemo = (memoId: string) => {
    navigate(ROUTES.PROJECT_MEMO_DETAIL(projectId!, memoId));
  };

  return (
    <div className="flex space-y-4 flex-col h-full min-h-0">
      <MemoList projectId={projectId!} onSelectMemo={handleSelectMemo} />
    </div>
  );
}
