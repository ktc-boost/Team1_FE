import { useEffect, useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { Switch } from '@/shared/components/shadcn/switch';
import Boo from '@/shared/assets/images/boost/boo.webp';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import toast from 'react-hot-toast';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { CommentEditorActions } from '@/features/task-detail/components/CommentSection/CommentEditorActions';
import { useAiTransformModals } from '@/features/ai-transform/hooks/useAiTransformModals';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';

interface CommentEditorProps {
  onCreate: (data: { content: string; isAnonymous: boolean }) => void;
  onUpdate: (commentId: string, data: { content: string; isAnonymous: boolean }) => void;
}

const CommentEditor = ({ onCreate, onUpdate }: CommentEditorProps) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const {
    isAnonymous,
    setIsAnonymous,
    editingComment,
    setEditingComment,
    setCurrentPin,
    setPersona,
  } = useTaskDetailStore();

  useEffect(() => {
    if (editingComment) {
      setInput(editingComment.content);
      setIsAnonymous(editingComment.isAnonymous);

      if (editingComment.fileInfo?.fileId) {
        setCurrentPin(editingComment.fileInfo as PinWithAuthor);
      }
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

  const handleSubmit = () => {
    if (!input.trim()) return toast.error('댓글을 입력해주세요!');

    const data = {
      content: input,
      isAnonymous,
    };

    if (editingComment) {
      onUpdate(editingComment.id, data);
      setEditingComment(null);
    } else {
      onCreate(data);
    }

    setInput('');
    setCurrentPin(null);
    resetAiComment();
    setPersona(null);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setInput('');
    setCurrentPin(null);
  };

  return (
    <div className="absolute left-0 right-0 bottom-0 px-4 pt-4 pb-2 border-t border-gray-300 space-y-2 bg-gray-100">
      {/* Boo 버튼 & 익명 스위치 */}
      <div className="flex items-center gap-2 pb-2">
        <Button
          size="sm"
          className="rounded-full px-3 py-1 text-xs bg-boost-orange hover:bg-boost-orange-hover"
          onClick={() => handleBooClick()}
        >
          <img src={Boo} width="20" />
          <p className="label2-bold">Boo가 대신 말하기</p>
        </Button>
        <div className="flex flex-row items-center gap-1.5 ml-1.5">
          <span className="text-sm text-gray-600">익명</span>
          <Switch
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
            className="data-[state=checked]:bg-boost-blue"
          />
          {editingComment && (
            <span className="text-sm font-semibold text-boost-blue ml-1">수정중</span>
          )}
        </div>
      </div>

      {/* 입력창 + 버튼 */}
      <div className="flex items-center gap-2 mb-2">
        <Textarea
          className="rounded-md text-sm focus:ring-transparent flex-1 h-10 resize-none"
          placeholder={editingComment ? '댓글 수정중..' : '댓글을 입력해주세요'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <CommentEditorActions
          isEditing={!!editingComment}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />
      </div>
    </div>
  );
};

export default CommentEditor;
