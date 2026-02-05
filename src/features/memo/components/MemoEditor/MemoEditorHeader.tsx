import Rocket from '@/shared/assets/images/boost/rocket-2d.png';
import { Button } from '@/shared/components/shadcn/button';
import SmallLoader from '@/shared/components/ui/loading/SmallLoader';

interface MemoEditorHeaderProps {
  isEditMode: boolean;
  onCancel: () => void;
  onSave: () => void;
  disableSave: boolean;
  isSaving: boolean;
}

const MemoEditorHeader = ({
  isEditMode,
  onCancel,
  onSave,
  disableSave,
  isSaving,
}: MemoEditorHeaderProps) => {
  return (
    <header className="flex-shrink-0 px-3 pt-3 pb-1 border-b border-gray-300 md:px-6 md:py-6">
      <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row">
        <div className="flex flex-1 items-start gap-4">
          <div className="mt-0.5 rounded-lg bg-boost-blue/10 p-2">
            <img src={Rocket} alt="rocket" className="h-7 w-7 md:h-8 md:w-8" />
          </div>

          <div>
            <h2 className="mb-1 subtitle2-bold text-gray-900 md:title2-bold">
              {isEditMode ? '메모 수정' : '새 메모 작성'}
            </h2>
            <p className="label2-regular text-gray-600 md:label1-regular">
              기록하고 싶은 내용을 적어보세요! 팀원들과 공유할 수 있어요.
            </p>
          </div>
        </div>

        <div className="ml-auto flex gap-2 md:ml-0">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 hover:bg-gray-200"
          >
            취소
          </Button>

          <Button variant="defaultBoost" onClick={onSave} disabled={disableSave || isSaving}>
            {isSaving ? <SmallLoader text="저장 중.." /> : '저장'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MemoEditorHeader;
