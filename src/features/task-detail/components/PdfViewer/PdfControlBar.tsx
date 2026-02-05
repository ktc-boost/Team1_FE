import { Button } from '@/shared/components/shadcn/button';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { MAX_ZOOM, MIN_ZOOM } from '@/features/task-detail/types/pdfTypes';
import { useShallow } from 'zustand/react/shallow';

const PdfControlBar = () => {
  const { numPages, pageNumber, zoom, pageSize, goPrevPage, goNextPage, zoomIn, zoomOut } =
    usePdfStore(
      useShallow((s) => ({
        numPages: s.numPages,
        pageNumber: s.pageNumber,
        zoom: s.zoom,
        pageSize: s.pageSize,
        goPrevPage: s.goPrevPage,
        goNextPage: s.goNextPage,
        zoomIn: s.zoomIn,
        zoomOut: s.zoomOut,
      })),
    );

  return (
    <>
      <div className="flex gap-2 items-center justify-center bg-gray-400 p-2">
        <Button onClick={goPrevPage} disabled={pageNumber <= 1}>
          이전 페이지
        </Button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Button onClick={goNextPage} disabled={numPages ? pageNumber >= numPages : true}>
          다음 페이지
        </Button>
        <Button onClick={zoomOut} disabled={zoom <= MIN_ZOOM}>
          -
        </Button>
        <Button onClick={zoomIn} disabled={zoom >= MAX_ZOOM}>
          +
        </Button>
        <p>Zoom: {(zoom * 100).toFixed(0)}%</p>
        <p className="text-sm">
          Size: {Math.round(pageSize.width)}×{Math.round(pageSize.height)}
        </p>
      </div>
    </>
  );
};

export default PdfControlBar;
