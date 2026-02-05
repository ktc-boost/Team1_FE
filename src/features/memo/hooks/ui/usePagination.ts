import { useState, useLayoutEffect, useCallback, useEffect } from 'react';

interface UsePaginationParams<T> {
  data?: T[];
  containerRef: React.RefObject<HTMLElement | null>;
  headerHeight: number;
  rowHeight: number;
}

export const usePagination = <T>({
  data,
  containerRef,
  headerHeight,
  rowHeight,
}: UsePaginationParams<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  const updatePageSize = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;

    const containerHeight = node.offsetHeight;

    if (containerHeight > 0) {
      const availableHeight = containerHeight - headerHeight;
      const calculated = Math.max(1, Math.floor(availableHeight / rowHeight));

      setPageSize((prev) => (prev !== calculated ? calculated : prev));
    }
  }, [containerRef, headerHeight, rowHeight]);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver(() => {
      updatePageSize();
    });

    observer.observe(node);
    updatePageSize();

    const timeoutId = setTimeout(updatePageSize, 0);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [containerRef, updatePageSize]);

  useEffect(() => {
    updatePageSize();
  }, [data?.length, updatePageSize]);

  const effectivePageSize = pageSize || 10;
  const pageCount = Math.max(1, Math.ceil((data?.length || 0) / effectivePageSize));

  const safePage = Math.min(currentPage, Math.max(0, pageCount - 1));

  useEffect(() => {
    if (currentPage !== safePage) {
      setCurrentPage(safePage);
    }
  }, [currentPage, safePage]);

  const currentData = data
    ? data.slice(safePage * effectivePageSize, (safePage + 1) * effectivePageSize)
    : [];

  return {
    currentPage: safePage,
    setCurrentPage,
    pageSize: effectivePageSize,
    pageCount,
    currentData,
  };
};
