import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { useModal } from '@/shared/hooks/useModal';
import { useUpdateTaskMutation } from '@/features/task/hooks/mutation/useUpdateTaskMutation';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import { useUpdateTaskForm } from '@/features/task/hooks/form/useUpdateTaskForm';
import TaskFormField from '@/features/task/components/TaskModal/TaskFormField';
import type { TaskDetail } from '@/features/task/types/task.domain.types';
import { getTagIds } from '@/features/tag/utils/tagUtils';
import type { Tag } from '@/features/tag/types/tagTypes';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { ApiError } from '@/shared/error/types/apiError.types';

interface TaskUpdateModalContentProps {
  projectId: string;
  task: TaskDetail;
}

const TaskUpdateModalContent = ({ projectId, task }: TaskUpdateModalContentProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(task.tags ?? []);
  const { resetModal } = useModal();
  const { mutateAsync: updateTask, isPending } = useUpdateTaskMutation(projectId);
  const { data: projectMembers } = useProjectMembersQuery(projectId);

  const { form, handleConfirm } = useUpdateTaskForm(projectId, task, async (taskData) => {
    try {
      await updateTask({
        taskId: task.id,
        taskData: { ...taskData, tags: getTagIds(selectedTags) },
      });
      toast.success('할 일이 수정되었습니다!');
      resetModal();
    } catch (error) {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('할 일 수정을 실패했습니다.');
      throw error;
    }
  });

  return (
    <FormProvider {...form}>
      <TaskFormField
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        projectId={projectId}
        projectMembers={projectMembers ?? []}
      />
      <DialogFooter className="gap-2 pt-4 border-t border-gray-300">
        <Button
          onClick={() => {
            form.reset();
            resetModal();
          }}
          variant="outline"
          disabled={isPending}
          className="px-6 border-gray-400"
        >
          취소
        </Button>
        <Button
          onClick={handleConfirm}
          variant="defaultBoost"
          className="px-6 bg-boost-blue hover:boost-blue-hover"
          disabled={isPending}
        >
          {isPending ? '수정 중...' : '할 일 수정'}
        </Button>
      </DialogFooter>
    </FormProvider>
  );
};

export default TaskUpdateModalContent;
