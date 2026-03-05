import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { cn } from '@/shared/lib/utils';
import Overlay from '@/features/task-detail/components/PdfViewer/PdfOverlay';
import PdfControlBar from '@/features/task-detail/components/PdfViewer/PdfControlBar';
import { usePdfDrag } from '@/features/task-detail/hooks/usePdfDrag';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { usePdfPinInteraction } from '@/features/task-detail/hooks/usePdfPinInteraction';
import { usePdfDocument } from '@/features/task-detail/hooks/usePdfDocument';
import PdfHeaderBar from '@/features/task-detail/components/PdfViewer/PdfHeaderBar';
import { useShallow } from 'zustand/react/shallow';
import { useLayoutEffect, useRef, useState } from 'react';
import { PAGE_HORIZONTAL_PADDING } from '@/features/task-detail/constants/task-detail.ui.constants';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const PDFViewer = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { pageNumber, zoom, position, isDragging, pdfDocument, pageSize } = usePdfStore(
    useShallow((s) => ({
      pageNumber: s.pageNumber,
      zoom: s.zoom,
      position: s.position,
      isDragging: s.isDragging,
      pdfDocument: s.pdfDocument,
      pageSize: s.pageSize,
    })),
  );
  const selectedFile = useTaskDetailStore((s) => s.selectedFile);

  const { onMouseDown, onMouseMove, onMouseUp, mouseMoved } = usePdfDrag();
  const { onDocumentLoadSuccess, setPdfDocument } = usePdfDocument(pdfDocument, pageNumber);
  const { setActivePinCommentId } = useTaskDetailStore();
  const { handleOverlayClick } = usePdfPinInteraction(pageNumber, pageSize);
  const handleOverlayClickWithDragCheck = (e: React.MouseEvent) => {
    if (mouseMoved.current) return;
    handleOverlayClick(e);
    setActivePinCommentId(null);
  };
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setContainerWidth(Math.max(0, w - PAGE_HORIZONTAL_PADDING));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);
  const dragEnabled = zoom > 1;

  return (
    <div className="flex flex-col w-full h-full bg-gray-300">
      <PdfHeaderBar />
      <div
        ref={viewportRef}
        className="flex-1 overflow-auto overscroll-contain px-2 py-2 sm:px-4 sm:py-4"
      >
        <div
          className={cn(
            'mx-auto w-fit relative bg-white',
            dragEnabled ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default',
          )}
          style={
            dragEnabled
              ? {
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  willChange: 'transform',
                }
              : undefined
          }
          onMouseDown={dragEnabled ? onMouseDown : undefined}
          onMouseMove={dragEnabled ? onMouseMove : undefined}
          onMouseUp={dragEnabled ? onMouseUp : undefined}
          onMouseLeave={dragEnabled ? onMouseUp : undefined}
        >
          <Document
            file={selectedFile?.fileUrl}
            onLoadSuccess={(pdf) => {
              onDocumentLoadSuccess(pdf);
              setPdfDocument(pdf);
            }}
          >
            {containerWidth > 0 && (
              <Page pageNumber={pageNumber} width={containerWidth} scale={zoom} />
            )}
          </Document>
          <Overlay onClick={handleOverlayClickWithDragCheck} />
        </div>
      </div>
      <PdfControlBar />
    </div>
  );
};

export default PDFViewer;
