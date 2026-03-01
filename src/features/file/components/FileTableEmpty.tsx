import { TableRow, TableCell } from '@/shared/components/shadcn/table';

const FileTableEmpty = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="py-16 text-center text-gray-400">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl mb-2">📄</div>
          <div className="body1-regular">파일이 존재하지 않아요!</div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FileTableEmpty;
