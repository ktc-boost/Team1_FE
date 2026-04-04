import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routeHelpers';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { useModal } from '@/shared/hooks/useModal';
import { useDeleteTaskMutation } from '@/features/task/hooks/mutation/useDeleteTaskMutation';
import StatusInfo from '@/features/task-detail/components/TaskDetailContent/StatusInfo';
import DescriptionArea from '@/features/task-detail/components/TaskDetailContent/DescriptionArea';
import AssigneeSection from '@/features/task-detail/components/TaskDetailContent/AssigneeMoreList';
import DueDateSection from '@/features/task-detail/components/TaskDetailContent/DueDateInfo';
import TagSection from '@/features/task-detail/components/TaskDetailContent/TagList';
import TaskControlDropdown from '@/features/task-detail/components/TaskDetailContent/TaskControlDropdown';
import TaskUpdateModalContent from '@/features/task/components/TaskModal/TaskUpdateModalContent';
import type { TaskDetail } from '@/features/task/types/task.domain.types';

interface TaskDetailContentProps {
  task: TaskDetail;
}

const TaskDetailContent = ({ task }: TaskDetailContentProps) => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { showCustom, resetModal } = useModal();

  const { mutateAsync: deleteTaskMutation } = useDeleteTaskMutation(projectId || '');

  if (!projectId) return null;

  const handleDeleteTask = async () => {
    try {
      await deleteTaskMutation({ taskId: task.id, status: task.status });
      resetModal();
      navigate(ROUTES.PROJECT_BOARD(projectId));
      toast.success('할 일이 삭제되었어요.');
    } catch (error) {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('할 일 삭제를 실패했어요.');
    }
  };

  const handleEditTask = () => {
    showCustom({
      title: '할 일 수정',
      size: 'lg',
      description: '할 일을 수정합니다.',
      content: <TaskUpdateModalContent projectId={projectId} task={task} />,
    });
  };

  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-gray-100">
      <TaskControlDropdown onClickDelete={handleDeleteTask} onEdit={handleEditTask} />

      <div className="flex flex-col flex-1  p-3 sm:p-4 gap-2 sm:gap-4 overflow-hidden">
        <div className="px-2.5">
          <AssigneeSection assignees={task.assignees} />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-5">
          <TagSection task={task} />
          <DueDateSection dueDate={task.dueDate} />
          <StatusInfo status={task.status} />
        </div>

        <DescriptionArea description={task.description} />
      </div>
    </div>
  );
};

export default TaskDetailContent;
