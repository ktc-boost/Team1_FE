import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';

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
