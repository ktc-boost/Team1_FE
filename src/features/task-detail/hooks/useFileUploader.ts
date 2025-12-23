import { useDropzone } from 'react-dropzone';
import { useUploadFileMutation } from '@/features/task-detail/hooks/useFileUploadUrlMutation';
import { showFileUploadErrorToast } from '@/features/task-detail/ui/toast/showFileUploadErrorToast';

export const useFileUploader = (taskId: string) => {
  const { mutate: uploadFile } = useUploadFileMutation();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadFile(
        { file, taskId },
        {
          onError: (e) => {
            showFileUploadErrorToast(e);
          },
        },
      );
    });
  };
  return useDropzone({ onDrop });
};
