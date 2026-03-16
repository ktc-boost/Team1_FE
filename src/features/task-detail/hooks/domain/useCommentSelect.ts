import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { useTaskDetailQuery } from '@/features/task/hooks/query/useTaskDetailQuery';
import { useCommentQuery } from '@/features/comment/hooks/useCommentQuery';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { commentToast } from '@/features/task-detail/utils/toast/commentToast';
import { extractPinsFromComments } from '@/features/comment/utils/commentUtils';

export const useCommentSelect = (projectId: string, taskId: string) => {
  const { setSelectedFile, setPins, togglePdf } = useTaskDetailStore();
  const { setPageNumber } = usePdfStore();

  const { data: task } = useTaskDetailQuery(projectId, taskId);
  const { data: comments = [] } = useCommentQuery(projectId, taskId);

  const commentSelect = async (fileInfo: FileInfo) => {
    if (!fileInfo?.fileId || !task) return;

    try {
      const downloadResult = await fetchFileDownloadUrl(fileInfo.fileId);
      const clickedFile = task.files?.find((f) => f.id === fileInfo.fileId);

      if (clickedFile) {
        setSelectedFile({
          fileId: clickedFile.id,
          fileName: clickedFile.filename,
          fileUrl: downloadResult.url,
        });

        const allPins = extractPinsFromComments(comments);
        const relatedPins = allPins.filter((p) => p.fileId === fileInfo.fileId);

        setPins(relatedPins);
        togglePdf(true);

        if (fileInfo.filePage) setPageNumber(fileInfo.filePage);
      }
    } catch (err) {
      console.error('파일 열기 오류:', err);
      commentToast.openFileError();
    }
  };

  return { commentSelect };
};
