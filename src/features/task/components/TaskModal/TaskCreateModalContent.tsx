import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectsQuery } from '@/features/project/hooks/query/useProjectsQuery';
import { useCreateTaskMutation } from '@/features/task/hooks/mutation/useCreateTaskMutation';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import { useCreateTaskForm } from '@/features/task/hooks/form/useCreateTaskForm';
import TaskFormField from '@/features/task/components/TaskModal/TaskFormField';
import { getTagIds } from '@/features/tag/utils/tagUtils';
import type { Tag } from '@/features/tag/types/tagTypes';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { ApiError } from '@/shared/error/types/apiError.types';

interface TaskCreateModalContentProps {
  isMyTask: boolean;
  projectId?: string;
}

const TaskCreateModalContent = ({
  isMyTask,
  projectId: propProjectId,
}: TaskCreateModalContentProps) => {
  const { resetModal } = useModal();
  const { data: projects } = useProjectsQuery();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { form, handleConfirm, isLoading } = useCreateTaskForm(
    propProjectId ?? '',
    async (taskData) => {
      const selectedProjectId = form.getValues('projectId') || propProjectId;
      if (!selectedProjectId) {
        toast.error('프로젝트를 선택해주세요.');
        return;
      }

      try {
        const payload = { ...taskData, tags: getTagIds(selectedTags) };
        await createTask(payload);
        toast.success('할 일이 생성되었습니다!');
        resetModal();
      } catch (error) {
        if (error instanceof ApiError) toast.error(getErrorMessage(error));
        else toast.error('할 일 생성을 실패했습니다.');
        throw error;
      }
    },
  );

  const selectedProjectId = form.watch('projectId') || propProjectId;
  const { mutateAsync: createTask } = useCreateTaskMutation(selectedProjectId ?? '');
  const { data: projectMembers } = useProjectMembersQuery(selectedProjectId);

  useEffect(() => {
    if (isMyTask && !form.watch('projectId') && projects?.length) {
      form.setValue('projectId', projects[0].id);
    }
  }, [isMyTask, projects, form]);

  return (
    <FormProvider {...form}>
      <TaskFormField
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        isMyTask={isMyTask}
        projects={projects || []}
        projectMembers={projectMembers ?? []}
        projectId={propProjectId}
      />
      <DialogFooter className="gap-2 pt-4 border-t border-gray-300">
        <Button
          onClick={resetModal}
          variant="outline"
          disabled={isLoading}
          className="px-6 border-gray-400"
        >
          취소
        </Button>
        <Button
          variant="defaultBoost"
          onClick={handleConfirm}
          className="px-6 bg-boost-blue hover:boost-blue-hover"
        >
          {isLoading ? '생성 중...' : '할 일 생성'}
        </Button>
      </DialogFooter>
    </FormProvider>
  );
};

export default TaskCreateModalContent;
