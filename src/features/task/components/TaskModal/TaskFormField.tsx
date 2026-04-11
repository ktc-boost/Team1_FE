import { useFormContext } from 'react-hook-form';
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
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/shadcn/input';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { FormField } from '@/shared/components/ui/form/FormField';
import { toggleArrayItem } from '@/shared/utils/arrayUtils';
import StatusButtons from '@/shared/components/ui/form/StatusButtons';
import UrgentToggle from '@/shared/components/ui/form/UrgentToggle';
import AssigneeDropdown from '@/shared/components/ui/form/AssigneeDropdown';
import ProjectSelect from '@/shared/components/ui/form/ProjectSelect';
import TagManager from '@/features/tag/components/TagInput/TagManager';
import DueDatePicker from '@/shared/components/ui/form/DueDatePicker';
import { COLUMN_STATUS_LIST } from '@/features/board/constants/board.ui.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';
import type { TaskFormValues } from '@/features/task/schemas/taskSchema';
import type { Tag } from '@/features/tag/types/tagTypes';
import type { Project } from '@/features/project/types/projectTypes';
import type { Member } from '@/features/user/types/userTypes';

interface TaskFormFieldProps {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  isMyTask?: boolean;
  projects?: Project[];
  projectMembers?: Member[];
  projectId?: string;
}

const TaskFormField = ({
  selectedTags,
  setSelectedTags,
  isMyTask,
  projects = [],
  projectMembers = [],
  projectId,
}: TaskFormFieldProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TaskFormValues>();

  const inputClasses = 'hover:bg-gray-200 focus:ring-transparent h-11 label2-regular';

  const watchProjectId = watch('projectId');
  const currentProjectId = watchProjectId || projectId;
  const status = watch('status');
  const urgent = watch('urgent') || false;
  const assignees = watch('assignees') || [];

  return (
    <div className="flex flex-col gap-8 py-4 max-h-[400px] overflow-y-auto overflow-x-hidden px-1 scroll-smooth">
      {isMyTask && (
        <FormField icon={Folder} required label="프로젝트" error={errors.projectId?.message}>
          <ProjectSelect
            selectedProjectId={watchProjectId}
            projects={projects}
            onProjectSelect={(id: string) => setValue('projectId', id, { shouldValidate: true })}
          />
        </FormField>
      )}

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
            statusList={COLUMN_STATUS_LIST}
            selectedStatus={status}
            setStatus={(s: TaskStatus) => setValue('status', s)}
          />
        </FormField>

        <FormField icon={Siren} label="긴급 여부">
          <UrgentToggle urgent={urgent} setUrgent={(v: boolean) => setValue('urgent', v)} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField icon={User} required label="담당자" error={errors.assignees?.message}>
          <AssigneeDropdown
            disabled={!projectMembers?.length}
            assignees={assignees}
            toggleAssignee={(name: string) =>
              setValue('assignees', toggleArrayItem(assignees, name), { shouldValidate: true })
            }
            members={projectMembers}
          />
        </FormField>

        <FormField icon={Calendar} required label="마감일" error={errors.dueDate?.message}>
          <DueDatePicker
            value={watch('dueDate')}
            onChange={(date: string) => setValue('dueDate', date, { shouldValidate: true })}
          />
        </FormField>
      </div>

      <FormField icon={TagIcon} label="태그" error={errors.tags?.message}>
        <TagManager
          projectId={currentProjectId ?? ''}
          selectedTags={selectedTags}
          onChangeTags={setSelectedTags}
        />
      </FormField>

      <FormField icon={Check} label="필요한 검토 수" error={errors.requiredReviewerCount?.message}>
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
  );
};

export default TaskFormField;
