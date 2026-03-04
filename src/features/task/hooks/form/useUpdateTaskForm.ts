import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, useEffect } from 'react';
import {
  updateTaskSchema,
  validateReviewerCount,
  type UpdateTaskInput,
} from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import type { TaskDetail, TaskStatus } from '@/features/task/types/task.domain.types';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

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
      updateTaskSchema.superRefine((data, ctx) => validateReviewerCount(data, ctx, projectMembers)),
    );
  }, [projectMembers]);

  const form = useForm<UpdateTaskInput>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      projectId: projectId,
      title: task.title,
      description: task.description ?? '',
      requiredReviewerCount: task.requiredReviewerCount ?? 0,
      assignees: task.assignees.map((a) => a.name),
      dueDate: task.dueDate,
      status: (task.status ?? TASK_STATUS.TODO) as TaskStatus,
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
