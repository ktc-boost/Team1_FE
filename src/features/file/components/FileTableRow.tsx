import { TableRow, TableCell } from '@/shared/components/shadcn/table';
import { Button } from '@/shared/components/shadcn/button';
import { Download, ChevronRight } from 'lucide-react'; // ExternalLink 추가 가능
import { formatBytes, getFileIcon } from '@/features/file/utils/fileUtils';
import { useFileDownloadMutation } from '@/features/file/hooks/useFileDownloadMutation';
import { formatDateTime } from '@/shared/utils/dateUtils';
import type { ProjectFile } from '@/features/file/types/fileApiTypes';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/Router';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { cn } from '@/shared/lib/utils';
import FileMobileActionMenu from '@/features/file/components/FileMobileActionMenu';

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
  const handleNavigate = () => navigate(ROUTES.TASK_DETAIL(projectData.id, file.taskId));
  const handleDownload = () => downloadFile({ fileId: file.fileId, fileName: file.filename });
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
          <span className="truncate body2-regular text-gray-900">{file.filename}</span>
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
        <FileMobileActionMenu onNavigate={handleNavigate} onDownload={handleDownload} />
      </TableCell>
    </TableRow>
  );
};

export default FileTableRow;
