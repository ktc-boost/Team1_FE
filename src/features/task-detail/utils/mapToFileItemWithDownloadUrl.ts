import { formatBytes } from '@/features/file/utils/fileUtils';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';
import type { FileItemType } from '@/features/file/types/fileTypes';

export const mapToFileItemWithDownloadUrl = async (
  serverFile: ServerFileType,
): Promise<FileItemType> => {
  const downloadRes = await fetchFileDownloadUrl(serverFile.id);
  return {
    fileId: serverFile.id,
    fileName: serverFile.filename,
    fileUrl: downloadRes.url,
    fileSize: formatBytes(serverFile.sizeBytes),
    timeLeft: '완료',
    status: 'success',
  };
};
