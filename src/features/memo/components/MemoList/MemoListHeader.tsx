import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import type { Memo } from '@/features/memo/types/memoTypes';
import PaginationNav from '@/shared/components/ui/PaginationNav';

interface MemoListHeaderProps {
  memos?: Memo[];
  selectedRows: Set<string>;
  onDeleteSelected: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
}

const MemoListHeader = ({
  memos,
  selectedRows,
  onDeleteSelected,
  currentPage,
  setCurrentPage,
  pageCount,
}: MemoListHeaderProps) => {
  const selectedCount = selectedRows.size;
  const totalCount = memos?.length ?? 0;

  return (
    <header className="flex items-center justify-between px-2">
      <div className="flex items-center gap-3 label2-regular md:label1-regular text-gray-500">
        {selectedCount > 0 ? (
          <>
            <span>{selectedCount}개 항목 선택됨</span>
            <Button
              variant="secondaryBoost"
              size="sm"
              onClick={onDeleteSelected}
              className="rounded-full px-3 !label2-regular"
            >
              <Trash2 />
              선택 삭제
            </Button>
          </>
        ) : (
          <span>총 {totalCount}개 메모</span>
        )}
      </div>
      <PaginationNav
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
      />
    </header>
  );
};

export default MemoListHeader;
