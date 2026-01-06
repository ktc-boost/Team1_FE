import {
  Calendar,
  User,
  Siren,
  FileText,
  Loader,
  Check,
  NotebookPen,
  Folder,
  TagIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { Input } from '@/shared/components/shadcn/input';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { FormField } from '@/shared/components/ui/form/FormField';
import { useModal } from '@/shared/hooks/useModal';
import { toggleArrayItem } from '@/shared/utils/arrayUtils';
import { cn } from '@/shared/lib/utils';
import StatusButtons from '@/features/task/components/TaskCreateModal/StatusButtons';
import UrgentToggle from '@/features/task/components/TaskCreateModal/UrgentToggle';
import AssigneeDropdown from '@/features/task/components/TaskCreateModal/AssigneeDropdown';
import ProjectSelect from '@/features/task/components/TaskCreateModal/ProjectSelect';
import TagManager from '@/features/task/components/TaskCreateModal/TagInput/TagManager';
import { useCreateTaskForm } from '@/features/task/hooks/useCreateTaskForm';
import { statusList } from '@/features/board/types/boardTypes';
import { useProjectsQuery } from '@/features/project/hooks/useProjectsQuery';
import { useCreateTaskMutation } from '@/features/task/hooks/useCreateTaskMutation';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import type { Tag } from '@/features/tag/types/tagTypes';
import { getTagIds } from '@/features/tag/utils/tagUtils';
import DueDatePicker from '@/features/task/components/TaskCreateModal/DueDatePicker';

interface TaskCreateModalContentProps {
  isMyTask: boolean;
  projectId?: string;
}

const TaskCreateModalContent = ({
  isMyTask,
  projectId: propProjectId,
}: TaskCreateModalContentProps) => {
  const inputClasses = 'hover:bg-gray-200 focus:ring-transparent h-11 label2-regular';
  const { resetModal } = useModal();
  const { data: projects } = useProjectsQuery();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { form, handleConfirm, isLoading } = useCreateTaskForm(
    propProjectId ?? '',
    async (taskData) => {
      if (!selectedProjectId) {
        toast.error('프로젝트를 선택해주세요.');
        return;
      }

      try {
        const payload = { ...taskData, tags: getTagIds(selectedTags) };
        await createTask(payload);
        toast.success('할 일이 성공적으로 생성되었습니다!');
        resetModal();
      } catch (err) {
        console.log(err);
        toast.error('할 일 생성에 실패했습니다');
      }
    },
  );

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const assignees = watch('assignees');
  const status = watch('status');
  const urgent = watch('urgent') || false;
  const selectedProjectId = watch('projectId') || propProjectId;

  const { mutate: createTask } = useCreateTaskMutation(selectedProjectId ?? '');
  const { data: projectMembers } = useProjectMembersQuery(selectedProjectId);

  useEffect(() => {
    if (isMyTask && !watch('projectId') && projects?.length) {
      setValue('projectId', projects[0].id);
    }
  }, [isMyTask, projects, setValue, watch]);

  return (
    <>
      <div className="flex flex-col gap-8 py-4 max-h-[400px] overflow-y-auto px-1">
        {/* 프로젝트 선택 */}
        {isMyTask && (
          <FormField icon={Folder} required label="프로젝트" error={errors.projectId?.message}>
            <ProjectSelect
              selectedProjectId={watch('projectId')}
              projects={projects || []}
              onProjectSelect={(id) => setValue('projectId', id, { shouldValidate: true })}
            />
          </FormField>
        )}

        {/* 제목 */}
        <FormField icon={FileText} required label="제목" error={errors.title?.message}>
          <Input
            {...register('title')}
            placeholder="예: 로그인 페이지 UI 구현하기"
            className={inputClasses}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 진행 상태 */}
          <FormField icon={Loader} required label="진행 상태" error={errors.status?.message}>
            <StatusButtons
              statusList={statusList}
              selectedStatus={status}
              setStatus={(s) => setValue('status', s)}
            />
          </FormField>

          {/* 긴급 여부 */}
          <FormField icon={Siren} label="긴급 여부">
            <UrgentToggle urgent={urgent} setUrgent={(v) => setValue('urgent', v)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 담당자 */}
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

          {/* 마감일 */}
          <FormField icon={Calendar} required label="마감일" error={errors.dueDate?.message}>
            <DueDatePicker
              value={watch('dueDate')}
              onChange={(date) => setValue('dueDate', date, { shouldValidate: true })}
            />
          </FormField>
        </div>

        {/* 태그 */}
        <FormField icon={TagIcon} label="태그" error={errors.tags?.message}>
          <TagManager
            projectId={selectedProjectId ?? ''}
            selectedTags={selectedTags}
            onChangeTags={setSelectedTags}
          />
        </FormField>

        {/* 필요한 검토 수 */}
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

        {/* 상세 설명 */}
        <FormField icon={NotebookPen} label="상세 설명" error={errors.description?.message}>
          <Textarea
            {...register('description')}
            placeholder="할 일에 대한 상세 설명을 입력하세요"
            className={cn('!h-25', inputClasses)}
          />
        </FormField>
      </div>

      {/* 하단 버튼 영역 (취소, 생성) */}
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
    </>
  );
};

export default TaskCreateModalContent;
