import { Textarea } from '@/shared/components/shadcn/textarea';
import { CommentEditorActions } from '@/features/task-detail/components/CommentSection/CommentEditor/CommentEditorActions';

interface CommentEditorInputProps {
  input: string;
  setInput: (value: string) => void;
  isEditing: boolean;
  isComposing: boolean;
  setIsComposing: (value: boolean) => void;
  onCommentSubmit: () => void;
  onEditCancel: () => void;
}

const CommentEditorInput = ({
  input,
  setInput,
  isEditing,
  isComposing,
  setIsComposing,
  onCommentSubmit,
  onEditCancel,
}: CommentEditorInputProps) => {
  return (
    <div className="flex items-center gap-2 mb-4 sm:mb-2">
      <Textarea
        className="rounded-xl sm:!label1-regular focus:ring-transparent flex-1 h-10 resize-none"
        placeholder={isEditing ? '댓글 수정중..' : '댓글을 입력해주세요'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault();
            onCommentSubmit();
          }
        }}
      />

      <CommentEditorActions
        isEditing={isEditing}
        onCommentSubmit={onCommentSubmit}
        onEditCancel={onEditCancel}
      />
    </div>
  );
};

export default CommentEditorInput;
