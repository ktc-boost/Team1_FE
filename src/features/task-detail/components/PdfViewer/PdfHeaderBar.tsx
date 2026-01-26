import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
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
    <div className="w-full h-12 flex items-center justify-between bg-white border-b border-gray-400 px-4">
      <span className="text-sm font-medium truncate max-w-[70%]">
        {selectedFile?.fileName ?? 'PDF 문서'}
      </span>
      <button
        onClick={() => {
          clearFileState();
          resetPdf();
        }}
        className="text-sm bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md transition"
      >
        ← 뒤로가기
      </button>
    </div>
  );
};

export default PdfHeaderBar;
