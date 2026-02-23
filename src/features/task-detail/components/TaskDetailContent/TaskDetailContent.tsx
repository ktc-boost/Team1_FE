import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/app/routes/Router';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useDeleteTaskMutation } from '@/features/task/hooks/mutation/useDeleteTaskMutation';
import { useModal } from '@/shared/hooks/useModal';
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
  const currentUser = useAuthStore((state) => state.user);

  if (!projectId) {
    console.error('Project ID가 없습니다!');
    return null;
  }

  const currentUserId = currentUser?.id;
  const isAssignee = task.assignees?.some((assignee) => assignee.id === currentUserId);

  const handleDelete = async () => {
    try {
      await deleteTaskMutation({ taskId: task.id, status: task.status });
      resetModal();
      navigate(ROUTES.PROJECT_BOARD(projectId));
    } catch (err) {
      console.error('할 일 삭제 실패:', err);
    }
  };

  const handleEdit = () => {
    showCustom({
      title: '할 일 수정',
      size: 'lg',
      description: '할 일을 수정합니다.',
      content: <TaskUpdateModalContent projectId={projectId} task={task} />,
    });
  };

  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-gray-100">
      {isAssignee && <TaskControlDropdown onClickDelete={handleDelete} onEdit={handleEdit} />}

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
