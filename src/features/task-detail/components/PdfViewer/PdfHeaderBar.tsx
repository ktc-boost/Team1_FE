import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { Button } from '@/shared/components/shadcn/button';
import { useShallow } from 'zustand/react/shallow';

const PdfHeaderBar = () => {
  const { clearFileState, selectedFile } = useTaskDetailStore(
    useShallow((s) => ({
      clearFileState: s.clearFileState,
      selectedFile: s.selectedFile,
    })),
  );

  const resetPdf = usePdfStore((s) => s.resetPdf);
  return (
    <div className="w-full h-12 flex items-center justify-between bg-white border-b border-gray-300 px-4">
      <span className="label2-regular sm:label1-regular truncate max-w-[70%]">
        {selectedFile?.fileName ?? 'PDF 문서'}
      </span>
      <Button
        size="sm"
        variant="outline"
        className="!label2-regular sm:!label1-regular"
        onClick={() => {
          clearFileState();
          resetPdf();
        }}
      >
        ← 뒤로가기
      </Button>
    </div>
  );
};

export default PdfHeaderBar;
