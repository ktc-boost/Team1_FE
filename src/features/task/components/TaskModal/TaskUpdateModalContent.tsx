import { Calendar, User, Siren, FileText, Loader, Check, NotebookPen, TagIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { Input } from '@/shared/components/shadcn/input';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { FormField } from '@/shared/components/ui/form/FormField';
import { toggleArrayItem } from '@/shared/utils/arrayUtils';
import { cn } from '@/shared/lib/utils';
import StatusButtons from '@/shared/components/ui/form/StatusButtons';
import UrgentToggle from '@/shared/components/ui/form/UrgentToggle';
import AssigneeDropdown from '@/shared/components/ui/form/AssigneeDropdown';
import TagManager from '@/features/tag/components/TagInput/TagManager';
import { statusList } from '@/features/board/types/boardTypes';
import { useUpdateTaskMutation } from '@/features/task/hooks/mutation/useUpdateTaskMutation';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import type { Tag } from '@/features/tag/types/tagTypes';
import { getTagIds } from '@/features/tag/utils/tagUtils';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import { useUpdateTaskForm } from '@/features/task/hooks/form/useUpdateTaskForm';
import { useModal } from '@/shared/hooks/useModal';
import DueDatePicker from '@/shared/components/ui/form/DueDatePicker';

interface TaskUpdateModalContentProps {
  projectId: string;
  task: TaskDetail;
}

const TaskUpdateModalContent = ({ projectId, task }: TaskUpdateModalContentProps) => {
  const inputClasses = 'hover:bg-gray-200 focus:ring-transparent h-11 label2-regular';
  const [selectedTags, setSelectedTags] = useState<Tag[]>(task.tags ?? []);
  const { resetModal } = useModal();

  const { mutateAsync: updateTask, isPending } = useUpdateTaskMutation(projectId);
  const { data: projectMembers } = useProjectMembersQuery(projectId);

  const { form, handleConfirm } = useUpdateTaskForm(projectId, task, async (taskData) => {
    await updateTask({
      taskId: task.id,
      taskData: { ...taskData, tags: getTagIds(selectedTags) },
    });
    toast.success('할 일이 성공적으로 수정되었습니다!');
  });

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const assignees = watch('assignees');
  const status = watch('status');
  const urgent = watch('urgent') || false;

  return (
    <>
      <div className="flex flex-col gap-8 py-4 max-h-[400px] overflow-y-auto px-1">
        <FormField icon={FileText} required label="제목" error={errors.title?.message}>
          <Input
            {...register('title')}
            placeholder="예: 로그인 페이지 UI 구현하기"
            className={inputClasses}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField icon={Loader} required label="진행 상태" error={errors.status?.message}>
            <StatusButtons
              statusList={statusList}
              selectedStatus={status}
              setStatus={(s) => setValue('status', s)}
            />
          </FormField>
          <FormField icon={Siren} label="긴급 여부">
            <UrgentToggle urgent={urgent} setUrgent={(v) => setValue('urgent', v)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField icon={User} required label="담당자" error={errors.assignees?.message}>
            <AssigneeDropdown
              disabled={!projectMembers?.length}
              assignees={assignees}
              toggleAssignee={(name) =>
                setValue('assignees', toggleArrayItem(assignees, name), { shouldValidate: true })
              }
              members={projectMembers ?? []}
            />
          </FormField>

          <FormField icon={Calendar} required label="마감일" error={errors.dueDate?.message}>
            <DueDatePicker
              value={watch('dueDate')}
              onChange={(date) => setValue('dueDate', date, { shouldValidate: true })}
            />
          </FormField>
        </div>

        <FormField icon={TagIcon} label="태그" error={errors.tags?.message}>
          <TagManager
            projectId={projectId}
            selectedTags={selectedTags}
            onChangeTags={setSelectedTags}
          />
        </FormField>

        <FormField
          icon={Check}
          label="필요한 검토 수"
          error={errors.requiredReviewerCount?.message}
        >
          <Input
            type="number"
            min={0}
            {...register('requiredReviewerCount', { valueAsNumber: true })}
            className={inputClasses}
          />
        </FormField>

        <FormField icon={NotebookPen} label="상세 설명" error={errors.description?.message}>
          <Textarea
            {...register('description')}
            placeholder="할 일에 대한 상세 설명을 입력하세요"
            className={cn('!h-25', inputClasses)}
          />
        </FormField>
      </div>

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
    </>
  );
};

export default TaskUpdateModalContent;
