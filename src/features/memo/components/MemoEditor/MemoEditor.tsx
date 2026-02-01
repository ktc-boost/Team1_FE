import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/app/routes/Router';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import { useCreateMemoMutation } from '@/features/memo/hooks/mutation/useCreateMemoMutation';
import { useUpdateMemoMutation } from '@/features/memo/hooks/mutation/useUpdateMemoMutation';
import { useMemoQuery } from '@/features/memo/hooks/query/useMemoQuery';
import { useMemoModals } from '@/features/memo/hooks/modal/useMemoModals';
import MemoEditorHeader from '@/features/memo/components/MemoEditor/MemoEditorHeader';
import MemoEditorTitle from '@/features/memo/components/MemoEditor/MemoEditorTitle';
import MemoEditorContent from '@/features/memo/components/MemoEditor/MemoEditorContent';
import { useMemoEditorStore } from '@/features/memo/store/useMemoEditorStore';

const MemoEditor = () => {
  const navigate = useNavigate();
  const { projectId, memoId } = useParams<{ projectId: string; memoId?: string }>();
  const setIsDirty = useMemoEditorStore((state) => state.setIsDirty);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isEditMode = Boolean(memoId);

  const { data: memo, isLoading } = useMemoQuery(projectId ?? '', memoId ?? '');
  const createMutation = useCreateMemoMutation(projectId ?? '');
  const updateMutation = useUpdateMemoMutation(projectId ?? '', memoId ?? '');

  const { showEmptyFieldsModal, showUnsavedChangesModal } = useMemoModals();

  const initialRef = useRef({ title: '', content: '' });

  useEffect(() => {
    if (isEditMode && memo) {
      setTitle(memo.title);
      setContent(memo.content);
      initialRef.current = { title: memo.title, content: memo.content };
    } else if (!isEditMode) {
      setTitle('');
      setContent('');
      initialRef.current = { title: '', content: '' };
    }
  }, [isEditMode, memo, memoId]);

  const hasUnsavedChanges =
    title !== initialRef.current.title || content !== initialRef.current.content;

  useEffect(() => {
    setIsDirty(hasUnsavedChanges);
    return () => setIsDirty(false);
  }, [hasUnsavedChanges, setIsDirty]);

  const isValid = title.trim() && content.trim();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  const executeMemoMutation = (mutation: typeof createMutation | typeof updateMutation) => {
    mutation.mutate(
      { title, content },
      {
        onSuccess: () => {
          initialRef.current = { title, content };
          setIsDirty(false);
        },
      },
    );
  };

  const handleSaveMemo = () => {
    if (!isValid) {
      showEmptyFieldsModal();
      return;
    }
    executeMemoMutation(isEditMode ? updateMutation : createMutation);
  };

  const handleCancelEdit = () => {
    if (!hasUnsavedChanges) {
      navigate(ROUTES.PROJECT_MEMO_DETAIL(projectId ?? '', memoId ?? ''));
      return;
    }
    showUnsavedChangesModal(projectId ?? '', navigate);
  };

  if (!projectId) return <div className="p-4">프로젝트 ID를 찾을 수 없습니다.</div>;
  if (isLoading && isEditMode) return <FullPageLoader text="메모 불러오는 중.." />;

  return (
    <article className="flex flex-col h-full bg-gray-200 border-t border-gray-300">
      <div className="flex flex-col h-full gap-4 p-1 m-3 overflow-hidden bg-gray-100 rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.08)]">
        <MemoEditorHeader
          isEditMode={isEditMode}
          onCancel={handleCancelEdit}
          onSave={handleSaveMemo}
          disableSave={!isValid || isSaving}
          isSaving={isSaving}
        />

        <section className="flex flex-col h-full gap-4">
          <MemoEditorTitle title={title} setTitle={setTitle} />
          <MemoEditorContent content={content} setContent={setContent} />
        </section>
      </div>
    </article>
  );
};

export default MemoEditor;
