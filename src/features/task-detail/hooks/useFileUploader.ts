import { useDropzone } from 'react-dropzone';
import { useUploadFileMutation } from '@/features/task-detail/hooks/useFileUploadUrlMutation';
import { fileToast } from '@/features/task-detail/ui/toast/fileToast';

export const useFileUploader = (taskId: string) => {
  const { mutate: uploadFile } = useUploadFileMutation();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadFile(
        { file, taskId },
        {
          onError: (e) => {
            fileToast.uploadError(e);
          },
        },
      );
    });
  };
  return useDropzone({ onDrop });
};
