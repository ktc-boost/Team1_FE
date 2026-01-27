import { useParams } from 'react-router-dom';
import { useMemoQuery } from '@/features/memo/hooks/query/useMemoQuery';
import MemoDetailHeader from '@/features/memo/components/MemoDetail/MemoDetailHeader';
import MemoDetailContent from '@/features/memo/components/MemoDetail/MemoDetailContent';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';

const MemoDetail = () => {
  const { projectId, memoId } = useParams<{ projectId: string; memoId: string }>();
  const { data: memo, isLoading, isError } = useMemoQuery(projectId ?? '', memoId ?? '');

  if (!projectId) return <div className="p-4">프로젝트 ID를 찾을 수 없습니다.</div>;
  if (!memoId) return <div className="p-4">메모 ID를 찾을 수 없습니다.</div>;

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError || !memo) {
    return <div className="p-4">메모를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="flex flex-col bg-gray-200 border-t border-t-gray-300 h-full overflow-hidden">
      <div className="flex flex-col h-full bg-gray-100 p-4 space-y-4 overflow-hidden rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.08)] m-3">
        <MemoDetailHeader memo={memo} projectId={projectId} />
        <MemoDetailContent content={memo.content} />
      </div>
    </div>
  );
};

export default MemoDetail;
