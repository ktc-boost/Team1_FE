import { Button } from '@/shared/components/shadcn/button';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { MAX_ZOOM, MIN_ZOOM } from '@/features/task-detail/types/pdfTypes';
import { useShallow } from 'zustand/react/shallow';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

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

  const isPrevDisabled = pageNumber <= 1;
  const isNextDisabled = numPages ? pageNumber >= numPages : true;
  const isZoomOutDisabled = zoom <= MIN_ZOOM;
  const isZoomInDisabled = zoom >= MAX_ZOOM;

  return (
    <div className="sticky bottom-0 z-20 w-full border-t border-gray-300 bg-white  ">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-3 py-2 sm:flex-nowrap sm:gap-3 sm:px-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={'outlineBoost'}
            size="icon"
            onClick={goPrevPage}
            disabled={isPrevDisabled}
            aria-label="이전 페이지"
            className="w-8 h-8 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm">
            <span className="label2-regular sm:label1-regular">Page</span>
            <span className="label2-regular sm:label1-regular tabular-nums">
              {pageNumber}/{numPages ?? '-'}
            </span>
          </div>

          <Button
            type="button"
            variant={'outlineBoost'}
            size="icon"
            onClick={goNextPage}
            disabled={isNextDisabled}
            aria-label="다음 페이지"
            className="w-8 h-8 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              disabled={isZoomOutDisabled}
              aria-label="축소"
              className="w-8 h-8 sm:h-10 sm:w-10"
            >
              <Minus className="h-5 w-5" />
            </Button>

            <div className="min-w-[72px] label2-regular sm:label1-regular px-2 text-center tabular-nums">
              {(zoom * 100).toFixed(0)}%
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              disabled={isZoomInDisabled}
              aria-label="확대"
              className="w-8 h-8 sm:h-10 sm:w-10"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 sm:block">
            Size: {Math.round(pageSize.width)}×{Math.round(pageSize.height)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfControlBar;
