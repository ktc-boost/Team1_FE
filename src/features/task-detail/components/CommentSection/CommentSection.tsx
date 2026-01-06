import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { useCommentQuery } from '@/features/comment/hooks/useCommentQuery';
import { useCreateCommentMutation } from '@/features/comment/hooks/useCreateCommentMutation';
import { useUpdateCommentMutation } from '@/features/comment/hooks/useUpdateCommentMutation';
import { useDeleteCommentMutation } from '@/features/comment/hooks/useDeleteCommentMutation';
import { useTaskDetailQuery } from '@/features/task/hooks/query/useTaskDetailQuery';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { useCommentSelect } from '@/features/task-detail/hooks/useCommentSelect';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import CommentList from '@/features/task-detail/components/CommentSection/CommentList';
import CommentEditor from '@/features/task-detail/components/CommentSection/CommentEditor';

interface CommentSectionProps {
  projectId: string;
  taskId: string;
  onCommentsFetched?: (comments: CommentUIType[]) => void;
}

const CommentSection = ({ projectId, taskId, onCommentsFetched }: CommentSectionProps) => {
  const prevCommentsRef = useRef<CommentUIType[] | null>(null);

  const { data: comments = [] } = useCommentQuery(projectId, taskId);
  const { mutate: createComment } = useCreateCommentMutation(projectId, taskId);
  const { mutate: updateComment } = useUpdateCommentMutation(projectId, taskId);
  const { mutate: deleteComment } = useDeleteCommentMutation(projectId, taskId);

  const { data: task } = useTaskDetailQuery(projectId, taskId);
  const { pins, clearCurrentPin, currentPin, persona } = useTaskDetailStore();
  const { commentSelect } = useCommentSelect();
  /** 댓글의 핀 아이콘 클릭 시 PDF 위치 이동 */
  const handlePinClick = (fileInfo: FileInfo | null) => {
    if (!fileInfo || !task?.files) return;
    commentSelect(fileInfo, task.files, pins);
  };

  useEffect(() => {
    if (!onCommentsFetched) return;
    if (
      comments.length > 0 &&
      JSON.stringify(prevCommentsRef.current) !== JSON.stringify(comments)
    ) {
      onCommentsFetched(comments);
      prevCommentsRef.current = comments;
    }
  }, [comments, onCommentsFetched]);

  /** 댓글 등록 */
  const handleCreate = (data: {
    content: string;
    isAnonymous: boolean;
    fileInfo?: FileInfo | null;
  }) => {
    if (!data.content.trim()) return toast.error('댓글을 입력해주세요!');
    const resolvedFileInfo = data.fileInfo ?? currentPin ?? null;

    const newComment = {
      content: data.content,
      isAnonymous: data.isAnonymous,
      persona: persona,
      ...(resolvedFileInfo ? { fileInfo: resolvedFileInfo } : {}),
    };
    createComment({ commentData: newComment });
    clearCurrentPin();
  };

  /** 댓글 수정 */
  const handleUpdate = (
    commentId: string,
    data: { content: string; isAnonymous: boolean; fileInfo?: FileInfo | null },
  ) => {
    if (!data.content.trim()) return toast.error('댓글을 입력해주세요!');

    const { content, isAnonymous, fileInfo } = data;
    const updatedData = {
      content,
      isAnonymous,
      ...(fileInfo !== undefined ? { fileInfo } : {}),
    };

    updateComment({ commentId, updatedData });
  };

  /** 댓글 삭제 */
  const handleDelete = (commentId: string) => deleteComment(commentId);

  return (
    <div className="bg-gray-100 border-none flex flex-col h-full relative">
      <h2 className="px-4 py-3 font-semibold border-b border-gray-300 text-gray-800">
        댓글 ({comments.length})
      </h2>
      <CommentList comments={comments} onSelectPin={handlePinClick} onDelete={handleDelete} />

      <CommentEditor onCreate={handleCreate} onUpdate={handleUpdate} />
    </div>
  );
};

export default CommentSection;
