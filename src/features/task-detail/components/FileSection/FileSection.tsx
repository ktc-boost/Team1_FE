import { Link, Upload } from 'lucide-react';
import FileItem from '@/features/task-detail/components/FileSection/FileItem';
import { useTaskFilesQuery } from '@/features/task-detail/hooks/useTaskFilesQuery';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';
import ContentItem from '@/shared/components/ui/ContentItem';
import { useFileUploader } from '@/features/task-detail/hooks/useFileUploader';
import { useDeleteFileMutation } from '@/features/task-detail/hooks/useDeleteFileMutation';

interface FileSectionProps {
  onOpenPdf: (url: string, fileName: string, id: string) => void;
  taskId: string;
  files: ServerFileType[];
}

const FileSection = ({ onOpenPdf, taskId, files: serverFiles }: FileSectionProps) => {
  const { data: uiFiles } = useTaskFilesQuery(serverFiles, taskId);
  const { getRootProps, getInputProps } = useFileUploader(taskId);
  const { mutate: deleteFile } = useDeleteFileMutation(taskId);

  const handleDelete = (fileId: string) => {
    deleteFile(fileId);
  };
  return (
    <div className="w-full h-full pt-6 p-3 pb-4 border-t-2 border-gray-300 flex flex-col">
      <ContentItem
        icon={Link}
        title="첨부파일"
        action={
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <Upload className="w-5 h-5 text-gray-900" />
          </div>
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
            onDelete={() => handleDelete(item.fileId)}
            onOpenPdf={() => onOpenPdf(item.fileUrl, item.fileName, item.fileId)}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default FileSection;
