import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Download, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/app/routes/routeHelpers';
import { cn } from '@/shared/lib/utils';
import { formatDateTime } from '@/shared/utils/dateUtils';
import { TableRow, TableCell } from '@/shared/components/shadcn/table';
import { Button } from '@/shared/components/shadcn/button';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { formatBytes, getFileIcon } from '@/features/file/utils/fileUtils';
import { useFileDownloadMutation } from '@/features/file/hooks/useFileDownloadMutation';
import type { ProjectFile } from '@/features/file/types/fileApiTypes';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import FileMobileActionMenu from '@/features/file/components/FileMobileActionMenu';

interface FileTableRowProps {
  file: ProjectFile;
  index: number;
}

const FileTableRow = ({ file, index }: FileTableRowProps) => {
  const navigate = useNavigate();
  const projectData = useProjectStore((s) => s.projectData);

  const { mutate: downloadFile } = useFileDownloadMutation();

  const mobileHiddenClass = 'hidden sm:table-cell';
  const tabletHiddenClass = 'hidden lg:table-cell';
  const commonCellClass = '!label2-regular sm:!body2-regular text-gray-600';

  const handleNavigate = () => navigate(ROUTES.TASK_DETAIL(projectData.id, file.taskId));
  const handleDownloadFile = () => {
    downloadFile(
      { fileId: file.fileId, fileName: file.filename },
      {
        onSuccess: () => {
          toast.success('파일이 다운로드 되었습니다.');
        },
        onError: (error) => {
          if (error instanceof ApiError) toast.error(getErrorMessage(error));
          else toast.error('파일 다운로드를 실패했습니다.');
        },
      },
    );
  };

  return (
    <TableRow className="bg-white border-b border-gray-100 hover:bg-boost-blue/5 transition-colors duration-150 h-[54px]">
      <TableCell className={cn('text-center', commonCellClass)}>{index + 1}</TableCell>

      <TableCell className="max-w-0">
        <div className="flex items-center gap-3 h-full">
          <img
            src={getFileIcon(file.contentType)}
            alt="file-icon"
            className="w-5 h-5 flex-shrink-0"
          />
          <span className="truncate body2-regular text-gray-900">{file.filename}</span>
        </div>
      </TableCell>

      <TableCell className={cn(commonCellClass, mobileHiddenClass)}>
        {formatBytes(file.sizeBytes)}
      </TableCell>

      <TableCell className={cn(commonCellClass, tabletHiddenClass)}>
        {formatDateTime(file.completedAt)}
      </TableCell>

      <TableCell className={mobileHiddenClass}>
        <Button
          onClick={handleNavigate}
          variant="link"
          className="!p-0 text-gray-700 hover:text-boost-blue flex items-center gap-1 body2-regular h-auto max-w-[180px]"
        >
          <span className="truncate">할 일로 이동</span>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        </Button>
      </TableCell>

      <TableCell className={cn('text-center', mobileHiddenClass)}>
        <Button
          onClick={handleDownloadFile}
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
        >
          <Download className="w-4 h-4" />
        </Button>
      </TableCell>

      <TableCell className="sm:hidden text-end">
        <FileMobileActionMenu onNavigate={handleNavigate} onDownload={handleDownloadFile} />
      </TableCell>
    </TableRow>
  );
};

export default FileTableRow;
