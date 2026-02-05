import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

const FILE_TOAST_MESSAGE = {
  upload: {
    onlyPdf: 'PDF 파일만 업로드할 수 있습니다.',
    onlyAssignee: '담당자만 파일을 업로드할 수 있습니다.',
    tooLarge: '파일 크기가 너무 커서 업로드할 수 없습니다.',
    failed: '파일 업로드에 실패했습니다.',
    unexpected: '예기치 못한 문제로 파일 업로드에 실패했습니다.',
  },
  delete: {
    success: '파일이 삭제되었습니다.',
    failed: '파일 삭제에 실패했습니다.',
  },
} as const;

const getUploadErrorMessage = (error: unknown): string => {
  if (!isAxiosError(error)) return FILE_TOAST_MESSAGE.upload.unexpected;

  const status = error.response?.status;
  switch (status) {
    case 400:
      return FILE_TOAST_MESSAGE.upload.onlyPdf;
    case 403:
      return FILE_TOAST_MESSAGE.upload.onlyAssignee;
    case 413:
      return FILE_TOAST_MESSAGE.upload.tooLarge;
    default:
      return FILE_TOAST_MESSAGE.upload.failed;
  }
};

export const fileToast = {
  deleteSuccess: () => toast.success(FILE_TOAST_MESSAGE.delete.success),
  deleteError: () => toast.error(FILE_TOAST_MESSAGE.delete.failed),

  uploadError: (error: unknown) => toast.error(getUploadErrorMessage(error)),
} as const;
