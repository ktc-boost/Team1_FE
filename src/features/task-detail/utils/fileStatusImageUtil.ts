import orange from '@/shared/assets/images/file-icon/file_spinner_orange.png';
import green from '@/shared/assets/images/file-icon/file_spinner_green.png';
import type { FileItemType } from '@/features/file/types/fileTypes';

export const FileStatusImages: Record<FileItemType['status'], string> = {
  uploading: orange,
  success: green,
};
