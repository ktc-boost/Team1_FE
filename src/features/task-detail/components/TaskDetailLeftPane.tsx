import { useTaskDetailStore } from '@/features/task-detail/store/taskDetail/useTaskDetailStore';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import FileSection from '@/features/task-detail/components/FileSection/FileSection';
import TaskDetailContent from '@/features/task-detail/components/TaskDetailContent/TaskDetailContent';
import PDFViewer from '@/features/task-detail/components/PdfViewer/PdfViewer';
import { useShallow } from 'zustand/react/shallow';

interface TaskDetailLeftPaneProps {
  task: TaskDetail;
  taskId: string;
}
const TaskDetailLeftPane = ({ task, taskId }: TaskDetailLeftPaneProps) => {
  const { isPdfOpen, setSelectedFile, togglePdf } = useTaskDetailStore(
    useShallow((state) => ({
      isPdfOpen: state.isPdfOpen,
      setSelectedFile: state.setSelectedFile,
      togglePdf: state.togglePdf,
    })),
  );
  return (
    <div id="left" className="flex flex-col w-6/10 overflow-hidden">
      {isPdfOpen ? (
        <PDFViewer />
      ) : (
        <>
          <section id="detail" className="h-8/12 overflow-y-scroll">
            <TaskDetailContent task={task} />
          </section>

          <section id="file" className="h-4/12">
            <FileSection
              files={task.files}
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

export default TaskDetailLeftPane;
