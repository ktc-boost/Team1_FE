import { api } from '@/shared/api/axiosInstance';
import type { FileDownloadUrlResponse } from '@/features/file/types/fileApiTypes';

export const fetchFileDownloadUrl = async (fileId: string): Promise<FileDownloadUrlResponse> => {
  const { data } = await api.get(`/files/${fileId}/download-url`);
  return data;
};
