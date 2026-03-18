import { Button } from '@/shared/components/shadcn/button';
import { Switch } from '@/shared/components/shadcn/switch';
import Boo from '@/shared/assets/images/boost/boo.webp';

interface CommentEditorHeaderProps {
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
  isEditing: boolean;
  onBooClick: () => void;
}

const CommentEditorHeader = ({
  isAnonymous,
  setIsAnonymous,
  isEditing,
  onBooClick,
}: CommentEditorHeaderProps) => {
  return (
    <div className="flex items-center gap-2 pb-1 sm:pb-2">
      <Button
        size="sm"
        variant="secondaryBoost"
        className="rounded-full px-3 py-1 caption1-bold "
        onClick={onBooClick}
      >
        <img src={Boo} width="20" />
        <p className="label2-bold">Boo가 대신 말하기</p>
      </Button>

      <div className="flex flex-row items-center gap-1.5 ml-1.5">
        <span className="label2-regular sm:label1-regular text-gray-600">익명</span>

        <Switch
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
          className="data-[state=checked]:bg-boost-blue"
        />

        {isEditing && (
          <span className="label2-bold sm:label1-bold font-semibold text-boost-blue ml-1">
            수정중
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentEditorHeader;
