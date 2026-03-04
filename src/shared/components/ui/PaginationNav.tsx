import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';

interface PaginationNavProps {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  className?: string;
}

const PaginationNav = ({ currentPage, pageCount, setCurrentPage }: PaginationNavProps) => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 >= pageCount;

  const goPrevPage = () => setCurrentPage((p) => p - 1);
  const goNextPage = () => setCurrentPage((p) => p + 1);
  const paginationBtnClass =
    'rounded-full border disabled:border-gray-500 disabled:bg-white disabled:text-gray-600';
  return (
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
  );
};

export default PaginationNav;
