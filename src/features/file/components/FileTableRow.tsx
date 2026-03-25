import { TableRow, TableCell } from '@/shared/components/shadcn/table';
import { Button } from '@/shared/components/shadcn/button';
import { Download, ChevronRight } from 'lucide-react';
import { formatBytes, getFileIcon } from '@/features/file/utils/fileUtils';
import { useFileDownloadMutation } from '@/features/file/hooks/useFileDownloadMutation';
import { formatDateTime } from '@/shared/utils/dateUtils';
import type { ProjectFile } from '@/features/file/types/fileApiTypes';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routeHelpers';
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
  const handleDownload = () => downloadFile({ fileId: file.id, fileName: file.filename });
  return (
    <TableRow className="bg-white border-b border-gray-100 hover:bg-boost-blue/5 transition-colors duration-150 h-[54px]">
      <TableCell className={cn('pl-6 text-center', commonCellClass)}>{index + 1}</TableCell>

      <TableCell className="max-w-0">
        <div className="flex items-center gap-3 h-full">
          <img
            src={getFileIcon(file.contentType)}
            alt="file-icon"
            className="hidden sm:block w-5 h-5 flex-shrink-0"
          />
          <span className="truncate body2-regular text-gray-900">{file.filename}</span>
        </div>
      </TableCell>

      <TableCell className={cn(commonCellClass, mobileHiddenClass)}>
        {formatBytes(file.sizeBytes)}
      </TableCell>

      <TableCell className={cn(commonCellClass, mobileHiddenClass)}>
        {formatDateTime(file.completedAt)}
      </TableCell>

      <TableCell className={mobileHiddenClass}>
        <Button
          onClick={handleNavigate}
          variant="link"
          className="p-0 text-gray-700 hover:text-boost-blue flex items-center gap-1 body2-regular h-auto max-w-[180px]"
        >
          <span className="truncate">할 일로 이동</span>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        </Button>
      </TableCell>

      <TableCell className={cn('text-center', mobileHiddenClass)}>
        <Button
          onClick={handleDownload}
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
        >
          <Download className="w-4 h-4" />
        </Button>
      </TableCell>

      <TableCell className="sm:hidden text-center">
        <FileMobileActionMenu onNavigate={handleNavigate} onDownload={handleDownload} />
      </TableCell>
    </TableRow>
  );
};

export default FileTableRow;
