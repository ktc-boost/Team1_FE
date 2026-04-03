import { lazy, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import FileSection from '@/features/task-detail/components/FileSection/FileSection';
import TaskDetailContent from '@/features/task-detail/components/TaskDetailContent/TaskDetailContent';
import type { TaskDetail } from '@/features/task/types/task.domain.types';
const PDFViewer = lazy(() => import('@/features/task-detail/components/PdfViewer/PdfViewer'));

interface TaskDetailInfoSectionProps {
  task: TaskDetail;
  taskId: string;
}

const TaskDetailInfoSection = ({ task, taskId }: TaskDetailInfoSectionProps) => {
  const { isPdfOpen, setSelectedFile, togglePdf, setFiles } = useTaskDetailStore(
    useShallow((s) => ({
      isPdfOpen: s.isPdfOpen,
      setSelectedFile: s.setSelectedFile,
      togglePdf: s.togglePdf,
      setFiles: s.setFiles,
    })),
  );

  useEffect(() => {
    setFiles(task.files);
  }, [task.files, setFiles]);

  return (
    <div className="w-full flex flex-col sm:w-6/10 overflow-hidden">
      {isPdfOpen ? (
        <PDFViewer />
      ) : (
        <>
          <section id="detail" className="h-8/12 overflow-y-scroll">
            <TaskDetailContent task={task} />
          </section>

          <section id="file" className="h-4/12">
            <FileSection
              taskId={taskId ?? ''}
              onOpenPdf={(url, name, id) => {
                setSelectedFile({ fileId: id, fileName: name, fileUrl: url });
                togglePdf(true);
              }}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default TaskDetailInfoSection;
