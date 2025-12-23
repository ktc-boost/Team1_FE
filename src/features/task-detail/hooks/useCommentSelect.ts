import { useTaskDetailStore } from '@/features/task-detail/store/taskDetail/useTaskDetailStore';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import toast from 'react-hot-toast';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';

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
      toast.error('해당 파일이 삭제되어 마커를 찾을 수 없습니다.');
    }
  };

  return { commentSelect };
};
