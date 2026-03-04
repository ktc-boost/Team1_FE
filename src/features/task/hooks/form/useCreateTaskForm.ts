import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, useEffect } from 'react';
import {
  createTaskSchema,
  validateReviewerCount,
  type CreateTaskInput,
} from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

export const useCreateTaskForm = (
  initialProjectId: string,
  onConfirm: (data: CreateTaskInput) => Promise<void> | void,
) => {
  const { resetModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const projectData = useProjectStore((state) => state.projectData);

  const form = useForm<CreateTaskInput>({
    mode: 'onChange',
    defaultValues: {
      projectId: initialProjectId,
      title: '',
      description: '',
      requiredReviewerCount: projectData.defaultReviewerCount ?? 0,
      assignees: [],
      dueDate: '',
      status: TASK_STATUS.TODO,
      tags: [],
      urgent: false,
    },
  });

  const currentProjectId = form.watch('projectId');
  const { data: projectMembers = [] } = useProjectMembersQuery(
    currentProjectId || initialProjectId,
  );

  const resolver = useMemo(() => {
    return zodResolver(
      createTaskSchema.superRefine((data, ctx) => validateReviewerCount(data, ctx, projectMembers)),
    );
  }, [projectMembers]);

  useEffect(() => {
    form.control._options.resolver = resolver;
  }, [resolver, form]);

  const assignees = form.watch('assignees');
  const numAssignees = assignees?.length || 0;
  const maxReviewers = Math.max(projectMembers.length - numAssignees, 0);

  useEffect(() => {
    if (projectMembers.length === 0) return;

    const defaultCount = projectData.defaultReviewerCount ?? 0;
    const safeCount = defaultCount > maxReviewers ? maxReviewers : defaultCount;

    form.setValue('requiredReviewerCount', safeCount, { shouldValidate: true });
  }, [projectMembers, maxReviewers, projectData.defaultReviewerCount, form]);

  useEffect(() => {
    if (numAssignees > 0 && maxReviewers <= 0) {
      form.setValue('requiredReviewerCount', 0);
    }
  }, [numAssignees, maxReviewers, form]);

  const handleConfirm = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const assigneeIds = data.assignees
        .map((name) => projectMembers.find((m) => m.name === name || m.id === name)?.id)
        .filter((id): id is string => !!id);

      const payload: CreateTaskInput = {
        ...data,
        assignees: assigneeIds,
      };

      await onConfirm(payload);
      resetModal();
      form.reset();
    } finally {
      setIsLoading(false);
    }
  });

  return { form, handleConfirm, isLoading };
};
