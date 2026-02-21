import { TableHeader, TableRow, TableHead } from '@/shared/components/shadcn/table';
import { cn } from '@/shared/lib/utils';

const FileTableHeader = () => {
  const mobileHiddenClass = 'hidden md:table-cell';
  const headClass = 'subtitle2-bold text-gray-800';

  return (
    <TableHeader className="sticky top-0 z-10 bg-white">
      <TableRow className="border-b border-gray-300 h-12 hover:bg-white">
        <TableHead className="w-[50px] pl-6 subtitle2-bold text-gray-800 text-center">
          번호
        </TableHead>
        <TableHead className={cn('min-w-[150px] pl-4 text-left', headClass)}>파일명</TableHead>
        <TableHead className={cn('w-[100px] text-left', headClass, mobileHiddenClass)}>
          용량
        </TableHead>
        <TableHead className={cn('w-[180px] text-left', headClass, mobileHiddenClass)}>
          업로드일
        </TableHead>
        <TableHead className={cn('w-[200px] text-left', headClass, mobileHiddenClass)}>
          연결된 할 일
        </TableHead>
        <TableHead className={cn('w-[100px] text-center', headClass, mobileHiddenClass)}>
          다운로드
        </TableHead>
        <TableHead className="w-[50px] sm:hidden" />
      </TableRow>
    </TableHeader>
  );
};

export default FileTableHeader;
