import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, useEffect } from 'react';
import { updateTaskSchema, type UpdateTaskInput } from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import type { Status } from '@/features/board/types/boardTypes';

export const useUpdateTaskForm = (
  projectId: string,
  task: TaskDetail,
  onConfirm: (data: UpdateTaskInput) => Promise<void> | void,
) => {
  const { resetModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { data: projectMembers = [] } = useProjectMembersQuery(projectId);

  const resolver = useMemo(() => {
    return zodResolver(
      updateTaskSchema.superRefine((data, ctx) => {
        const numAssignees = data.assignees?.length || 0;
        const maxReviewers = Math.max(projectMembers.length - numAssignees, 0);

        if (numAssignees === 0) {
          ctx.addIssue({
            code: 'custom',
            message: '담당자를 먼저 지정해주세요.',
            path: ['requiredReviewerCount'],
          });
        } else if (maxReviewers <= 0 && data.requiredReviewerCount! > 0) {
          ctx.addIssue({
            code: 'custom',
            message: '담당자로 모두 지정되어 검토 수를 지정할 수 없습니다. 0으로 설정해주세요.',
            path: ['requiredReviewerCount'],
          });
        } else if (data.requiredReviewerCount! > maxReviewers) {
          ctx.addIssue({
            code: 'custom',
            message: `검토 수는 담당자를 제외한 최대 ${maxReviewers}명까지 설정할 수 있습니다.`,
            path: ['requiredReviewerCount'],
          });
        }
      }),
    );
  }, [projectMembers]);

  const form = useForm<UpdateTaskInput>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      title: task.title,
      description: task.description ?? '',
      requiredReviewerCount: task.requiredReviewerCount ?? 0,
      assignees: task.assignees.map((a) => a.name),
      dueDate: task.dueDate,
      status: (task.status ?? 'TODO') as Status,
      tags: task.tags?.map((t) => t.tagId) || [],
      urgent: task.urgent ?? false,
    },
  });

  const assignees = form.watch('assignees');
  const numAssignees = assignees?.length || 0;
  const maxReviewers = Math.max(projectMembers.length - numAssignees, 0);

  useEffect(() => {
    if (projectMembers.length === 0) return;

    const currentValue = task.requiredReviewerCount ?? 0;
    const safeCount = currentValue > maxReviewers ? maxReviewers : currentValue;

    form.setValue('requiredReviewerCount', safeCount, { shouldValidate: true });
  }, [projectMembers, maxReviewers, task.requiredReviewerCount, form]);

  useEffect(() => {
    if (numAssignees > 0 && maxReviewers <= 0) {
      form.setValue('requiredReviewerCount', 0);
    }
  }, [numAssignees, maxReviewers, form]);

  const handleConfirm = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const assigneeIds: string[] = data.assignees
        .map((name) => projectMembers.find((m) => m.name === name)?.id)
        .filter((id): id is string => !!id);

      const payload: UpdateTaskInput = {
        ...data,
        assignees: assigneeIds,
      };

      await onConfirm(payload);
      form.reset(data);
      resetModal();
    } finally {
      setIsLoading(false);
    }
  });

  return { form, handleConfirm, isLoading };
};
