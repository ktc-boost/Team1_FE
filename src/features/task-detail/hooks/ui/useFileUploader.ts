import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { useUploadFileMutation } from '@/features/task-detail/hooks/mutation/useFileUploadUrlMutation';

export const useFileUploader = (taskId: string) => {
  const { mutate: uploadFile } = useUploadFileMutation();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadFile(
        { file, taskId },
        {
          onError: (error) => {
            if (error instanceof ApiError) toast.error(getErrorMessage(error));
            else toast.error('파일 업로드를 실패했어요.');
          },
        },
      );
    });
  };

  return useDropzone({ onDrop });
};
