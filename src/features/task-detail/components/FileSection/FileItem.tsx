import fileIcon from '@/shared/assets/images/file-icon/file-icon.png';
import { EllipsisVertical } from 'lucide-react';
import { FileStatusImages } from '@/features/task-detail/utils/fileStatusImageUtil';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import { useFileDownloadMutation } from '@/features/file/hooks/useFileDownloadMutation';
import type { FileItemType } from '@/features/file/types/fileTypes';
interface FileItemProps extends FileItemType {
  onOpenPdf: (fileUrl: string) => void;
  onDelete: () => void;
  onDownload?: () => void;
}

const FileItem = ({
  fileId,
  fileName,
  fileUrl,
  onOpenPdf,
  onDelete,
  fileSize,
  timeLeft,
  status,
}: FileItemProps) => {
  const handleOpenPdf = () => {
    if (onOpenPdf) onOpenPdf(fileUrl);
  };
  const { mutate: downloadFile } = useFileDownloadMutation();

  return (
    <div
      onClick={handleOpenPdf}
      className="w-full justify-between border-2 rounded-xl border-gray-300 pl-4 pr-3 pt-1.5 pb-1.5 flex items-center gap-2 hover:border-gray-400 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <img src={fileIcon} alt="파일 아이콘" className="w-5 h-5" />
        <div className="flex-1">
          <p className="text-sm">{fileName}</p>
          <p className="text-xs pt-1 text-gray-500">
            {fileSize} | {timeLeft} |
            <img src={FileStatusImages[status]} alt={status} className="inline-block w-4 h-4" />
            {status}
          </p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="w-5 h-5 text-gray-700 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  downloadFile({ fileId, fileName });
                }}
                className="px-4 py-2 text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
              >
                다운로드
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete) onDelete();
                }}
                className="px-4 py-2 text-red-800 dark:text-gray-200 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FileItem;
