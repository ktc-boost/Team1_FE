import { TableRow, TableCell } from '@/shared/components/shadcn/table';
import { Button } from '@/shared/components/shadcn/button';
import { Download, ChevronRight, MoreVertical } from 'lucide-react'; // ExternalLink 추가 가능
import { formatBytes, getFileIcon } from '@/features/file/utils/fileUtils';
import { useFileDownloadMutation } from '@/features/file/hooks/useFileDownloadMutation';
import { formatDateTime } from '@/shared/utils/dateUtils';
import type { ProjectFile } from '@/features/file/types/fileApiTypes';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/Router';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/shared/components/shadcn/dropdown-menu';

interface FileTableRowProps {
  file: ProjectFile;
  index: number;
}

const FileTableRow = ({ file, index }: FileTableRowProps) => {
  const projectData = useProjectStore((state) => state.projectData);
  const { mutate: downloadFile } = useFileDownloadMutation();
  const navigate = useNavigate();
  const mobileHiddenClass = 'hidden md:table-cell';
  const commonCellClass = '!label2-regular sm:!body2-regular text-gray-600';

  return (
    <TableRow className="bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-150 h-[60px]">
      <TableCell className={cn('w-[50px] pl-6 body2-regular', commonCellClass)}>
        {index + 1}
      </TableCell>

      <TableCell className="min-w-[150px]">
        <div className="flex items-center gap-3 h-full">
          <img
            src={getFileIcon(file.contentType)}
            alt="file-icon"
            className="hidden sm:block w-5 h-5 flex-shrink-0"
          />
          <span className="truncate body2-medium text-gray-900">{file.filename}</span>
        </div>
      </TableCell>

      <TableCell className={cn('w-[100px]', commonCellClass, mobileHiddenClass)}>
        {formatBytes(file.sizeBytes)}
      </TableCell>

      <TableCell className={cn('w-[180px]', commonCellClass, mobileHiddenClass)}>
        {formatDateTime(file.completedAt)}
      </TableCell>

      <TableCell className={cn('w-[200px]', mobileHiddenClass)}>
        <Button
          onClick={() => navigate(ROUTES.TASK_DETAIL(projectData.id, file.taskId))}
          variant="link"
          className="p-0 text-gray-700 hover:text-boost-blue flex items-center gap-1 body2-regular h-auto"
        >
          <span className="truncate max-w-[160px]">{file.taskName || '할 일로 이동'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </TableCell>

      <TableCell className={cn('w-[100px]', mobileHiddenClass)}>
        <Button
          onClick={() => downloadFile({ fileId: file.fileId, fileName: file.filename })}
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
        >
          <Download className="w-4 h-4" />
        </Button>
      </TableCell>

      <TableCell className="w-[50px] sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 bg-white rounded-lg shadow-md border border-gray-300 p-1"
          >
            <DropdownMenuItem
              className="flex items-center justify-between px-3 py-2 cursor-pointer focus:bg-gray-100 rounded-md"
              onClick={() => navigate(ROUTES.TASK_DETAIL(projectData.id, file.taskId))}
            >
              <span className="label1-regular">할 일로 이동</span>
              <ChevronRight className="w-4 h-4" />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center justify-between px-3 py-2 cursor-pointer focus:bg-gray-100 rounded-md"
              onClick={() => downloadFile({ fileId: file.fileId, fileName: file.filename })}
            >
              <span className="label1-regular">다운로드</span>
              <Download className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default FileTableRow;
