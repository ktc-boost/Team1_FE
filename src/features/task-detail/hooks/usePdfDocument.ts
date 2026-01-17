import { useEffect } from 'react';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useShallow } from 'zustand/react/shallow';

export const usePdfDocument = (pdfDocument: PDFDocumentProxy | null, pageNumber: number) => {
  const { setNumPages, updatePageSize, setPdfDocument } = usePdfStore(
    useShallow((s) => ({
      setNumPages: s.setNumPages,
      updatePageSize: s.updatePageSize,
      setPdfDocument: s.setPdfDocument,
    })),
  );

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    if (pdfDocument && pageNumber) {
      updatePageSize(pageNumber);
    }
  }, [pdfDocument, pageNumber, updatePageSize]);

  return { onDocumentLoadSuccess, setPdfDocument };
};
