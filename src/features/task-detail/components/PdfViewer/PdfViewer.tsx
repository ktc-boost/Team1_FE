import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { cn } from '@/shared/lib/utils';
import Overlay from '@/features/task-detail/components/PdfViewer/PdfOverlay';
import PdfControlBar from '@/features/task-detail/components/PdfViewer/PdfControlBar';
import { usePdfDrag } from '@/features/task-detail/hooks/usePdfDrag';
import { useTaskDetailStore } from '@/features/task-detail/store/taskDetail/useTaskDetailStore';
import { usePdfPinInteraction } from '@/features/task-detail/hooks/usePdfPinInteraction';
import { usePdfDocument } from '@/features/task-detail/hooks/usePdfDocument';
import PdfHeaderBar from '@/features/task-detail/components/PdfViewer/PdfHeaderBar';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const { pageNumber, zoom, position, isDragging, pdfDocument, pageSize } = usePdfStore();
  const { onMouseDown, onMouseMove, onMouseUp, mouseMoved } = usePdfDrag();
  const { onDocumentLoadSuccess, setPdfDocument } = usePdfDocument(pdfDocument, pageNumber);
  const { handleOverlayClick } = usePdfPinInteraction(pageNumber, pageSize);
  const { selectedFile } = useTaskDetailStore();

  const handleOverlayClickWithDragCheck = (e: React.MouseEvent) => {
    if (mouseMoved.current) return;
    handleOverlayClick(e);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-300">
      <PdfHeaderBar />
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        <div
          className={cn('relative bg-white', isDragging ? 'cursor-grabbing' : 'cursor-grab')}
          style={{
            width: pageSize.width,
            height: pageSize.height,
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <Document
            file={selectedFile?.fileUrl}
            onLoadSuccess={(pdf) => {
              onDocumentLoadSuccess(pdf);
              setPdfDocument(pdf);
            }}
          >
            <Page pageNumber={pageNumber} width={pageSize.width} />
          </Document>

          <Overlay
            pageNumber={pageNumber}
            zoom={zoom}
            pageSize={pageSize}
            onClick={handleOverlayClickWithDragCheck}
          />
        </div>
      </div>
      <PdfControlBar />
    </div>
  );
};

export default PDFViewer;
