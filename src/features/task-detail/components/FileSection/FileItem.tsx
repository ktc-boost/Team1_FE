import fileIcon from '@/shared/assets/images/file-icon/file_icon.png';
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
      className="w-full justify-between border-2 rounded-xl border-gray-300 pl-4 pr-3 py-1.5 flex items-start sm:items-center gap-2 hover:border-gray-400 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <img src={fileIcon} alt="파일 아이콘" className="w-4 h-4 sm:w-5 sm:h-5" />
        <div className="flex-1">
          <p className="label2-regular sm:label1-regular">{fileName}</p>
          <p className="label2-regular pt-1 text-gray-500">
            {fileSize} | {timeLeft} |
            <img src={FileStatusImages[status]} alt={status} className="inline-block w-4 h-4" />
            {status}
          </p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-gray-700 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-30 sm:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  downloadFile({ fileId, fileName });
                }}
                className="px-4 py-2 !label2-regular sm:!label1-regular text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
              >
                다운로드
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete) onDelete();
                }}
                className="px-4 py-2 !label2-regular sm:!label1-regular text-red-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
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
