import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import type { Memo } from '@/features/memo/types/memoTypes';

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

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 >= pageCount;

  const goPrevPage = () => setCurrentPage((p) => p - 1);
  const goNextPage = () => setCurrentPage((p) => p + 1);

  const paginationBtnClass =
    'rounded-full border disabled:border-gray-500 disabled:bg-white disabled:text-gray-600';

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

      <nav className="flex items-center gap-2 pr-2">
        <Button
          variant="defaultBoost"
          size="icon"
          disabled={isFirstPage}
          onClick={goPrevPage}
          className={paginationBtnClass}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="defaultBoost"
          size="icon"
          disabled={isLastPage}
          onClick={goNextPage}
          className={paginationBtnClass}
        >
          <ChevronRight />
        </Button>
      </nav>
    </header>
  );
};

export default MemoListHeader;
