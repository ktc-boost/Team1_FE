import { Button } from '@/shared/components/shadcn/button';
import { SendIcon, X } from 'lucide-react';

interface CommentEditorActionsProps {
  isEditing: boolean;
  onCommentSubmit: () => void;
  onEditCancel: () => void;
}

export const CommentEditorActions = ({
  isEditing,
  onCommentSubmit,
  onEditCancel,
}: CommentEditorActionsProps) => {
  const editorButtonClasses = 'w-10 h-10 sm:w-13 sm:h-13 rounded-2xl flex-shrink-0';

  if (!isEditing) {
    return (
      <Button
        size="icon"
        variant="defaultBoost"
        className={editorButtonClasses}
        onClick={onCommentSubmit}
      >
        <SendIcon />
      </Button>
    );
  }

  return (
    <>
      <Button
        size="icon"
        variant="defaultBoost"
        className={editorButtonClasses}
        onClick={onCommentSubmit}
      >
        <SendIcon />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        className={editorButtonClasses}
        onClick={onEditCancel}
      >
        <X />
      </Button>
    </>
  );
};
