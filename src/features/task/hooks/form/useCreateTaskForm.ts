import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, useEffect } from 'react';
import {
  createTaskSchema,
  validateReviewerCount,
  type CreateTaskInput,
} from '@/features/task/schemas/taskSchema';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import { useProjectStore } from '@/features/project/store/useProjectStore';

export const useCreateTaskForm = (
  initialProjectId: string,
  onConfirm: (data: CreateTaskInput) => Promise<void> | void,
) => {
  const { resetModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const projectData = useProjectStore((state) => state.projectData);
  const { data: projectMembers = [] } = useProjectMembersQuery(initialProjectId);

  const resolver = useMemo(() => {
    return zodResolver(
      createTaskSchema.superRefine((data, ctx) => validateReviewerCount(data, ctx, projectMembers)),
    );
  }, [projectMembers]);

  const form = useForm<CreateTaskInput>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      projectId: initialProjectId,
      title: '',
      description: '',
      requiredReviewerCount: projectData.defaultReviewerCount ?? 0,
      assignees: [],
      dueDate: '',
      status: 'TODO',
      tags: [],
      urgent: false,
    },
  });

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
        .map((name) => projectMembers.find((m) => m.name === name)?.id)
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
