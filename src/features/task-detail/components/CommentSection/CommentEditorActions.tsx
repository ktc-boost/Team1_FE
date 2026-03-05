import { Button } from '@/shared/components/shadcn/button';
import { SendIcon, X } from 'lucide-react';

interface Props {
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export const CommentEditorActions = ({ isEditing, onSubmit, onCancel }: Props) => {
  return (
    <>
      {isEditing ? (
        <>
          <Button
            size="icon"
            className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-boost-blue hover:bg-boost-blue-hover flex-shrink-0"
            onClick={onSubmit}
          >
            <SendIcon />
          </Button>
          <Button
            size="icon"
            className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-gray-400 hover:bg-gray-500 flex-shrink-0"
            onClick={onCancel}
          >
            <X />
          </Button>
        </>
      ) : (
        <Button
          size="icon"
          className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-boost-blue hover:bg-boost-blue-hover flex-shrink-0"
          onClick={onSubmit}
        >
          <SendIcon />
        </Button>
      )}
    </>
  );
};
