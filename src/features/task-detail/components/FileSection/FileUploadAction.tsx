import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useUploadFileMutation } from '@/features/task-detail/hooks/useFileUploadUrlMutation';
import { fileToast } from '@/features/task-detail/utils/toast/fileToast';

export function FileUploadAction({ taskId }: { taskId: string }) {
  const { mutate: uploadFile } = useUploadFileMutation();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadFile({ file, taskId }, { onError: (e) => fileToast.uploadError(e) });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Upload className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-gray-900" />
    </div>
  );
}
