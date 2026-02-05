import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { Checkbox } from '@/shared/components/shadcn/checkbox';
import { TableCell, TableRow } from '@/shared/components/shadcn/table';
import type { Memo } from '@/features/memo/types/memoTypes';

interface MemoTableRowProps {
  memo: Memo;
  index: number;
  currentPage: number;
  pageSize: number;
  selected: boolean;
  onSelectRow: (id: string) => void;
  onSelectMemo: (id: string) => void;
  onDeleteOne: (id: string) => void;
}

const MemoTableRow = ({
  memo,
  index,
  currentPage,
  pageSize,
  selected,
  onSelectRow,
  onSelectMemo,
  onDeleteOne,
}: MemoTableRowProps) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleString('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const rowNumber = currentPage * pageSize + index + 1;

  const handleSelectMemo = () => onSelectMemo(memo.id);
  const handleSelectRow = () => onSelectRow(memo.id);
  const handleDeleteOne = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteOne(memo.id);
  };

  const mobileHiddenCellClass = 'hidden md:table-cell text-gray-600 text-xs';
  const deleteCellClass = 'hidden md:table-cell text-center';

  return (
    <TableRow
      className="bg-white border-b border-gray-100 h-[54px] transition-colors duration-150 hover:bg-boost-blue/5"
      data-state={selected ? 'selected' : undefined}
      onClick={handleSelectMemo}
    >
      <TableCell className="px-5">
        <Checkbox
          checked={selected}
          onCheckedChange={handleSelectRow}
          onClick={(e) => e.stopPropagation()}
          className="rounded-md"
        />
      </TableCell>

      <TableCell className="text-gray-600 label1-regular">{rowNumber}</TableCell>

      <TableCell className="max-w-0">
        <Button
          variant="link"
          className="w-full justify-start p-0 h-auto"
          onClick={handleSelectMemo}
          title={memo.title}
        >
          <span className="truncate text-left w-full">{memo.title}</span>
        </Button>
      </TableCell>

      <TableCell className={mobileHiddenCellClass}>{formatDate(memo.createdAt)}</TableCell>
      <TableCell className={mobileHiddenCellClass}>{formatDate(memo.updatedAt)}</TableCell>

      <TableCell className={deleteCellClass}>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
          onClick={handleDeleteOne}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MemoTableRow;
