import { z } from 'zod';

const baseTaskSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  description: z.string().optional(),
  requiredReviewerCount: z
    .number({ error: '숫자를 입력해주세요' })
    .min(0, '검토 수는 0 이상이어야 합니다.')
    .optional(),
  assignees: z.array(z.string()).min(1, '담당자를 선택하세요.'),
  dueDate: z.string().min(1, '마감일은 필수입니다.'),
  status: z.enum(['TODO', 'PROGRESS', 'REVIEW', 'DONE']),
  tags: z.array(z.string()).optional(),
  urgent: z.boolean().optional(),
});

export const createTaskSchema = baseTaskSchema.extend({
  projectId: z.string().min(1, '프로젝트를 선택해주세요.'),
});

export const updateTaskSchema = baseTaskSchema.extend({
  projectId: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskFormValues = CreateTaskInput | UpdateTaskInput;

export const validateReviewerCount = (
  data: TaskFormValues,
  ctx: z.RefinementCtx,
  projectMembers: { id: string; name: string }[],
) => {
  const numAssignees = data.assignees?.length || 0;
  const maxReviewers = Math.max(projectMembers.length - numAssignees, 0);

  if (numAssignees === 0) {
    ctx.addIssue({
      code: 'custom',
      message: '담당자를 먼저 지정해주세요.',
      path: ['requiredReviewerCount'],
    });
  } else if (maxReviewers <= 0 && (data.requiredReviewerCount ?? 0) > 0) {
    ctx.addIssue({
      code: 'custom',
      message: '담당자로 모두 지정되어 검토 수를 지정할 수 없습니다. 0으로 설정해주세요.',
      path: ['requiredReviewerCount'],
    });
  } else if ((data.requiredReviewerCount ?? 0) > maxReviewers) {
    ctx.addIssue({
      code: 'custom',
      message: `검토 수는 담당자를 제외한 최대 ${maxReviewers}명까지 설정할 수 있습니다.`,
      path: ['requiredReviewerCount'],
    });
  }
};
