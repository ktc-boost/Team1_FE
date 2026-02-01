import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import MemoListHeader from '@/features/memo/components/MemoList/MemoListHeader';
import MemoTable from '@/features/memo/components/MemoList/MemoTable';
import { useMemoModals } from '@/features/memo/hooks/modal/useMemoModals';
import { useRowSelection } from '@/features/memo/hooks/ui/useRowSelection';
import { usePagination } from '@/features/memo/hooks/ui/usePagination';
import { useMemosQuery } from '@/features/memo/hooks/query/useMemosQuery';
import { HEADER_HEIGHT, ROW_HEIGHT } from '@/features/memo/constants/memo.ui.constants';

interface MemoListProps {
  projectId: string;
  onSelectMemo: (memoId: string) => void;
}

const MemoList = ({ projectId, onSelectMemo }: MemoListProps) => {
  const { data: memos, isLoading } = useMemosQuery(projectId);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { showDeleteMemoModal } = useMemoModals();

  const { selectedRows, toggleSelectAll, toggleSelectRow, removeSelected } = useRowSelection();
  const { currentPage, setCurrentPage, pageSize, pageCount, currentData } = usePagination({
    data: memos,
    containerRef: tableContainerRef,
    headerHeight: HEADER_HEIGHT,
    rowHeight: ROW_HEIGHT,
  });

  const handleDelete = (ids: string[]) => {
    showDeleteMemoModal(ids, navigate, (deletedIds) => {
      removeSelected(deletedIds);
    });
  };

  if (isLoading) return <FullPageLoader text="메모 목록 불러오는 중.." />;

  return (
    <section className="flex flex-col h-full space-y-4 p-4 bg-gray-50 overflow-hidden">
      <MemoListHeader
        memos={memos}
        selectedRows={selectedRows}
        onDeleteSelected={() => handleDelete(Array.from(selectedRows))}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />

      <section
        ref={tableContainerRef}
        className="flex-1 min-h-0 bg-white rounded-md border border-gray-200"
      >
        <MemoTable
          currentData={currentData}
          selectedRows={selectedRows}
          onSelectAll={() => toggleSelectAll(currentData?.map((m) => m.id))}
          onSelectRow={toggleSelectRow}
          onSelectMemo={onSelectMemo}
          onDeleteOne={(id) => handleDelete([id])}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </section>
    </section>
  );
};

export default MemoList;
