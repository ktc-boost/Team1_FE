import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcn/table';
import { cn } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/components/shadcn/checkbox';
import MemoTableRow from '@/features/memo/components/MemoList/MemoTableRow';
import type { Memo } from '@/features/memo/types/memoTypes';

interface MemoTableProps {
  currentData?: Memo[];
  selectedRows: Set<string>;
  onSelectAll: () => void;
  onSelectRow: (id: string) => void;
  onSelectMemo: (id: string) => void;
  onDeleteOne: (id: string) => void;
  currentPage: number;
  pageSize: number;
}

const MemoTable = ({
  currentData,
  selectedRows,
  onSelectAll,
  onSelectRow,
  onSelectMemo,
  onDeleteOne,
  currentPage,
  pageSize,
}: MemoTableProps) => {
  const mobileHiddenClass = 'hidden md:table-cell';

  const currentIds = currentData?.map((memo) => memo.id) ?? [];
  const isAllSelected = currentIds.length > 0 && currentIds.every((id) => selectedRows.has(id));

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.08)] bg-white">
      <Table className="min-w-full table-fixed border-collapse">
        <TableHeader className="sticky top-0 z-10 bg-white text-gray-800 subtitle2-bold">
          <TableRow className="border-b border-gray-300 h-12 hover:bg-white">
            <TableHead className="w-[50px] md:w-[60px] px-5">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
                className="data-[state=checked]:bg-boost-blue data-[state=checked]:border-boost-blue"
              />
            </TableHead>
            <TableHead className="w-[50px] md:w-[80px]">번호</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className={cn('w-[200px]', mobileHiddenClass)}>생성일</TableHead>
            <TableHead className={cn('w-[200px]', mobileHiddenClass)}>수정일</TableHead>
            <TableHead className={cn('w-[80px] text-center', mobileHiddenClass)}>삭제</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="flex-1">
          {currentData && currentData.length > 0 ? (
            currentData.map((memo, index) => (
              <MemoTableRow
                key={memo.id}
                memo={memo}
                index={index}
                currentPage={currentPage}
                pageSize={pageSize}
                selected={selectedRows.has(memo.id)}
                onSelectRow={onSelectRow}
                onSelectMemo={onSelectMemo}
                onDeleteOne={onDeleteOne}
              />
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6}>
                <div className="flex flex-col items-center justify-center text-gray-400 h-64">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="body1-regular">메모가 존재하지 않아요!</div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemoTable;
