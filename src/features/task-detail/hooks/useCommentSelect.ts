import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';
import { commentToast } from '@/features/task-detail/utils/toast/commentToast';

export const useCommentSelect = () => {
  const { setSelectedFile, setPins, togglePdf } = useTaskDetailStore();
  const { setPageNumber } = usePdfStore();

  const commentSelect = async (
    fileInfo: FileInfo,
    files: ServerFileType[],
    allPins: PinWithAuthor[],
  ) => {
    if (!fileInfo?.fileId) return;

    try {
      const downloadResult = await fetchFileDownloadUrl(fileInfo.fileId);
      const clickedFile = files.find((f) => f.id === fileInfo.fileId);
      if (clickedFile) {
        setSelectedFile({
          fileId: clickedFile.id,
          fileName: clickedFile.filename,
          fileUrl: downloadResult.url,
        });

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
