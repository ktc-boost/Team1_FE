import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

export const showFileUploadErrorToast = (error: unknown) => {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 400:
        toast.error('PDF 파일만 업로드할 수 있습니다.');
        return;
      case 403:
        toast.error('담당자만 파일을 업로드할 수 있습니다.');
        return;
      case 413:
        toast.error('파일 크기가 너무 커서 업로드할 수 없습니다.');
        return;
      default:
        toast.error('파일 업로드에 실패했습니다.');
        return;
    }
  }

  toast.error('예기치 못한 문제로 파일 업로드에 실패했습니다.');
};
