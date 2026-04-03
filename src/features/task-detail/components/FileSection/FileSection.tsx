import { Suspense } from 'react';
import { Link } from 'lucide-react';
import toast from 'react-hot-toast';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import ContentItem from '@/shared/components/ui/ContentItem';
import FileItem from '@/features/task-detail/components/FileSection/FileItem';
import { useTaskFilesQuery } from '@/features/task-detail/hooks/query/useTaskFilesQuery';
import { useDeleteFileMutation } from '@/features/task-detail/hooks/mutation/useDeleteFileMutation';
import { FileUploadAction } from '@/features/task-detail/components/FileSection/FileUploadAction';
import { fileToast } from '@/features/task-detail/utils/toast/fileToast';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';

interface FileSectionProps {
  onOpenPdf: (url: string, fileName: string, id: string) => void;
  taskId: string;
}

const FileSection = ({ onOpenPdf, taskId }: FileSectionProps) => {
  const { data: uiFiles } = useTaskFilesQuery(taskId);
  const { mutate: deleteFile } = useDeleteFileMutation(taskId);
  const removeFile = useTaskDetailStore((s) => s.removeFile);

  const handleDeleteFile = (fileId: string) => {
    deleteFile(fileId, {
      onSuccess: () => {
        fileToast.deleteSuccess();
        removeFile(fileId);
      },
      onError: (error) => {
        if (error instanceof ApiError) toast.error(getErrorMessage(error));
        else fileToast.deleteError();
      },
    });
  };

  return (
    <div className="w-full h-full pt-6 p-3 pb-4 border-t-2 border-gray-300 flex flex-col">
      <ContentItem
        icon={Link}
        title="첨부파일"
        action={
          <Suspense fallback={<div className="w-5 h-5" />}>
            <FileUploadAction taskId={taskId} />
          </Suspense>
        }
      />
      <div className="flex flex-col gap-2 overflow-y-auto pt-3 mb-5">
        {uiFiles?.map((item) => (
          <FileItem
            key={item.fileId}
            fileId={item.fileId}
            fileName={item.fileName}
            fileUrl={item.fileUrl}
            fileSize={item.fileSize}
            timeLeft={item.timeLeft}
            onDeleteFile={() => handleDeleteFile(item.fileId)}
            onOpenPdf={() => onOpenPdf(item.fileUrl, item.fileName, item.fileId)}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default FileSection;
