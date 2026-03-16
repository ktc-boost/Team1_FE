import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import toast from 'react-hot-toast';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { useAiTransformModals } from '@/features/ai-transform/hooks/useAiTransformModals';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import { useKeyboardOffset } from '@/features/task-detail/hooks/ui/usekeyboardOffset';
import CommentEditorHeader from '@/features/task-detail/components/CommentSection/CommentEditor/CommentEditorHeader';
import CommentEditorInput from '@/features/task-detail/components/CommentSection/CommentEditor/CommentEditorInput';

interface CommentEditorProps {
  onCommentCreate: (data: { content: string; isAnonymous: boolean }) => void;
  onCommentUpdate: (commentId: string, data: { content: string; isAnonymous: boolean }) => void;
}

const CommentEditor = ({ onCommentCreate, onCommentUpdate }: CommentEditorProps) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const keyboardOffset = useKeyboardOffset();

  const {
    isAnonymous,
    setIsAnonymous,
    editingComment,
    setEditingComment,
    setCurrentPin,
    setPersona,
  } = useTaskDetailStore(
    useShallow((s) => ({
      isAnonymous: s.isAnonymous,
      setIsAnonymous: s.setIsAnonymous,
      editingComment: s.editingComment,
      setEditingComment: s.setEditingComment,
      setCurrentPin: s.setCurrentPin,
      setPersona: s.setPersona,
    })),
  );

  useEffect(() => {
    if (editingComment) {
      setInput(editingComment.content);
      setIsAnonymous(editingComment.isAnonymous);

      if (editingComment.fileInfo?.fileId) setCurrentPin(editingComment.fileInfo as PinWithAuthor);
    } else {
      setInput('');
    }
  }, [editingComment, setIsAnonymous, setCurrentPin]);

  const { showAiTransformConfirmModal } = useAiTransformModals();

  const setOriginalText = useAiTransformStore((state) => state.setOriginalText);
  const selectedText = useAiTransformStore((state) => state.selectedText);
  const resetAiComment = useAiTransformStore((state) => state.reset);

  useEffect(() => {
    if (selectedText) setInput(selectedText);
  }, [selectedText]);

  const handleBooClick = () => {
    if (!input.trim()) {
      toast.error('댓글을 입력해주세요!');
      return;
    }

    setOriginalText(input);
    showAiTransformConfirmModal();
  };

  const handleCommentSubmit = () => {
    if (!input.trim()) return toast.error('댓글을 입력해주세요!');

    const data = {
      content: input,
      isAnonymous,
    };

    if (editingComment) {
      onCommentUpdate(editingComment.id, data);
      setEditingComment(null);
    } else {
      onCommentCreate(data);
    }

    setInput('');
    setCurrentPin(null);
    setPersona(null);

    resetAiComment();
  };

  const handleEditCancel = () => {
    setEditingComment(null);
    setInput('');
    setCurrentPin(null);
  };

  return (
    <div
      className="fixed sm:absolute left-0 right-0 bottom-0 px-4 pt-4 pb-2 border-t border-gray-300 space-y-2 bg-gray-100"
      style={keyboardOffset ? { bottom: keyboardOffset } : undefined}
    >
      <CommentEditorHeader
        isAnonymous={isAnonymous}
        setIsAnonymous={setIsAnonymous}
        isEditing={!!editingComment}
        onBooClick={handleBooClick}
      />

      <CommentEditorInput
        input={input}
        setInput={setInput}
        isEditing={!!editingComment}
        isComposing={isComposing}
        setIsComposing={setIsComposing}
        onCommentSubmit={handleCommentSubmit}
        onEditCancel={handleEditCancel}
      />
    </div>
  );
};

export default CommentEditor;
