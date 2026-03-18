import { useEffect, useRef, useState } from 'react';
import { useResponsiveColumns } from '@/features/board/hooks/useResponsiveColumns';
import type { ColumnData } from '@/features/board/types/board.domain.types';

export const useBoardSlider = (columnsData: ColumnData[]) => {
  const visibleCount = useResponsiveColumns();
  const isMobileView = visibleCount < 4;

  const getChunkedColumns = () => {
    if (!isMobileView) return [];

    const result = [];
    for (let i = 0; i < columnsData.length; i += visibleCount) {
      result.push(columnsData.slice(i, i + visibleCount));
    }
    return result;
  };

  const chunkedColumns = getChunkedColumns();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [visibleCount]);

  const calculatePageIndex = (scrollLeft: number, pageWidth: number) =>
    Math.round(scrollLeft / pageWidth);

  const onScroll = () => {
    if (!isMobileView) return;

    const el = scrollContainerRef.current;
    if (!el) return;

    const nextIndex = calculatePageIndex(el.scrollLeft, el.clientWidth);
    setCurrentIndex(nextIndex);
  };

  return {
    visibleCount,
    isMobileView,
    chunkedColumns,
    currentIndex,
    scrollContainerRef,
    onScroll,
  };
};
