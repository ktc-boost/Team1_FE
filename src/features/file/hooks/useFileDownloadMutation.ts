import { useMutation } from '@tanstack/react-query';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import { downloadFromS3 } from '@/features/file/utils/fileDownloadUtil';

export const useFileDownloadMutation = () => {
  return useMutation({
    mutationFn: async ({ fileId, fileName }: { fileId: string; fileName: string }) => {
      const presigned = await fetchFileDownloadUrl(fileId);
      await downloadFromS3(presigned.url, presigned.headers, fileName);
    },
  });
};
