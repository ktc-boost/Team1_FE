import { useState } from 'react';
import { useMemosQuery } from '@/features/memo/hooks/query/useMemosQuery';
import MemoListHeader from '@/features/memo/components/MemoList/MemoListHeader';
import MemoTable from '@/features/memo/components/MemoList/MemoTable';
import { useNavigate } from 'react-router-dom';
import { useMemoModals } from '@/features/memo/hooks/modal/useMemoModals';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';

interface MemoListProps {
  projectId: string;
  onSelectMemo: (memoId: string) => void;
}

const MemoList = ({ projectId, onSelectMemo }: MemoListProps) => {
  const { data: memos, isLoading } = useMemosQuery(projectId);

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);

  const { showDeleteMemoModal } = useMemoModals();
  const navigate = useNavigate();

  const pageSize = 10;
  const pageCount = Math.ceil((memos?.length || 0) / pageSize);
  const currentData = memos?.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handleSelectAll = () => {
    if (selectedRows.size === (currentData?.length || 0)) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentData?.map((m) => m.id) || []));
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedRows(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.size === 0) {
      alert('삭제할 메모를 선택해주세요.');
      return;
    }

    showDeleteMemoModal(Array.from(selectedRows), navigate, (deletedIds) => {
      setSelectedRows((prev) => {
        const newSet = new Set(prev);
        deletedIds.forEach((id) => newSet.delete(id));
        return newSet;
      });
    });
  };

  const handleDeleteOne = (id: string) => {
    showDeleteMemoModal([id], navigate, (deletedIds) => {
      setSelectedRows((prev) => {
        const newSet = new Set(prev);
        deletedIds.forEach((id) => newSet.delete(id));
        return newSet;
      });
    });
  };

  if (isLoading) {
    return <FullPageLoader text="메모 목록 불러오는 중.." />;
  }

  return (
    <div className="flex flex-col h-full space-y-4 p-4 bg-gray-50">
      <MemoListHeader
        memos={memos}
        selectedRows={selectedRows}
        onDeleteSelected={handleDeleteSelected}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />

      <MemoTable
        currentData={currentData}
        selectedRows={selectedRows}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        onSelectMemo={onSelectMemo}
        onDeleteOne={handleDeleteOne}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
};

export default MemoList;
