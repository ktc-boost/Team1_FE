import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateMemoMutation } from '@/features/memo/hooks/useCreateMemoMutation';
import { useUpdateMemoMutation } from '@/features/memo/hooks/useUpdateMemoMutation';
import { useMemoQuery } from '@/features/memo/hooks/useMemoQuery';
import { useMemoModals } from '@/features/memo/hooks/useMemoModals';
import MemoEditorHeader from '@/features/memo/components/MemoEditor/MemoEditorHeader';
import MemoEditorTitle from '@/features/memo/components/MemoEditor/MemoEditorTitle';
import MemoEditorContent from '@/features/memo/components/MemoEditor/MemoEditorContent';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import { ROUTES } from '@/app/routes/Router';

const MemoEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { projectId, memoId } = useParams<{ projectId: string; memoId?: string }>();

  const { data: memo, isLoading } = useMemoQuery(projectId ?? '', memoId ?? '');
  const createMutation = useCreateMemoMutation(projectId ?? '');
  const updateMutation = useUpdateMemoMutation(projectId ?? '', memoId ?? '');
  const { showEmptyFieldsModal, showUnsavedChangesModal } = useMemoModals();

  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');

  const isEditMode = !!memoId;

  useEffect(() => {
    if (!isEditMode || !memo) return;

    setTitle(memo.title);
    setContent(memo.content);

    setInitialTitle(memo.title);
    setInitialContent(memo.content);
  }, [memo, isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      setInitialTitle('');
      setInitialContent('');
    }
  }, [isEditMode]);

  const hasUnsavedChanges = useMemo(() => {
    return title !== initialTitle || content !== initialContent;
  }, [title, content, initialTitle, initialContent]);

  if (!projectId) return <div className="p-4">프로젝트 ID를 찾을 수 없습니다.</div>;

  if (isLoading && isEditMode) return <FullPageLoader text="메모 불러오는 중.." />;

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      showEmptyFieldsModal();
      return;
    }

    const mutation = isEditMode ? updateMutation : createMutation;

    mutation.mutate(
      { title, content },
      {
        onSuccess: () => {
          setInitialTitle(title);
          setInitialContent(content);
        },
      },
    );
  };

  const handleCancel = () => {
    if (!hasUnsavedChanges) {
      navigate(ROUTES.PROJECT_MEMO_LIST(projectId));
      return;
    }
    showUnsavedChangesModal(projectId, navigate);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-200 border-t border-gray-300">
      <div className="flex flex-col gap-4 p-1 h-full overflow-hidden bg-gray-100 m-3 rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.08)]">
        <MemoEditorHeader
          isEditMode={isEditMode}
          onCancel={handleCancel}
          handleSave={handleSave}
          disableSave={
            !title.trim() || !content.trim() || createMutation.isPending || updateMutation.isPending
          }
          isSaving={createMutation.isPending || updateMutation.isPending}
        />
        <MemoEditorTitle title={title} setTitle={setTitle} />
        <MemoEditorContent content={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default MemoEditor;
