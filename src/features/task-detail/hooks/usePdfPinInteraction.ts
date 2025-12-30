import { useRef } from 'react';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { useTaskDetailStore } from '@/features/task-detail/store/taskDetail/useTaskDetailStore';
import type { PageSize } from '@/features/task-detail/types/pdfTypes'; // width, height 타입
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useShallow } from 'zustand/react/shallow';

export const usePdfPinInteraction = (pageNumber: number, pageSize: PageSize) => {
  const mouseMoved = useRef(false);
  const user = useAuthStore((s) => s.user);
  const { clearCurrentPin, persona, currentPin, setCurrentPin, selectedFile, isAnonymous } =
    useTaskDetailStore(
      useShallow((s) => ({
        clearCurrentPin: s.clearCurrentPin,
        persona: s.persona,
        currentPin: s.currentPin,
        setCurrentPin: s.setCurrentPin,
        selectedFile: s.selectedFile,
        isAnonymous: s.isAnonymous,
      })),
    );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (mouseMoved.current) return;

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pdfX = (x / rect.width) * pageSize.width;
    const pdfY = (1 - y / rect.height) * pageSize.height;

    if (
      currentPin &&
      Math.abs(currentPin.fileX! - pdfX) < 20 &&
      Math.abs(currentPin.fileY! - pdfY) < 20 &&
      currentPin.filePage === pageNumber
    ) {
      clearCurrentPin();
      return;
    }

    const newPin: PinWithAuthor = {
      fileId: selectedFile?.fileId ?? '',
      fileName: selectedFile?.fileName ?? '',
      filePage: pageNumber,
      fileX: pdfX,
      fileY: pdfY,
      author: {
        memberId: user?.id ?? '',
        name: user?.name ?? '익명',
        avatar: user?.avatar ?? '0',
        backgroundColor: user?.backgroundColor ?? '#CCCCCC',
      },
      isAnonymous: isAnonymous,
      persona: persona,
    };

    setCurrentPin(newPin);
  };

  return { handleOverlayClick, mouseMoved };
};
