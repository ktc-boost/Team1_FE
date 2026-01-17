import { PinAvatar } from './PinAvatar';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import type { PageSize } from '@/features/task-detail/types/pdfTypes';
import { useShallow } from 'zustand/react/shallow';
interface OverlayProps {
  pageNumber: number;
  zoom: number;
  pageSize: PageSize;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Overlay = ({ pageNumber, zoom, pageSize, onClick }: OverlayProps) => {
  const {
    pins,
    selectedFile,
    activePinCommentId,
    setActivePinCommentId,
    clearCurrentPin,
    currentPin,
    editingComment,
    persona,
    isAnonymous,
  } = useTaskDetailStore(
    useShallow((s) => ({
      pins: s.pins,
      selectedFile: s.selectedFile,
      activePinCommentId: s.activePinCommentId,
      setActivePinCommentId: s.setActivePinCommentId,
      clearCurrentPin: s.clearCurrentPin,
      currentPin: s.currentPin,
      editingComment: s.editingComment,
      persona: s.persona,
      isAnonymous: s.isAnonymous,
    })),
  );
  const user = useAuthStore((state) => state.user);
  const pinList = pins as PinWithAuthor[];

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10" onClick={onClick}>
      {pinList
        .filter((pin) => pin.fileId === selectedFile?.fileId && pin.filePage === pageNumber)
        .map((pin) => {
          const left = ((pin.fileX ?? 0) / pageSize.width) * 100;
          const top = 100 - ((pin.fileY ?? 0) / pageSize.height) * 100;
          return (
            <PinAvatar
              key={pin.commentId}
              persona={pin.persona}
              isAnonymous={!!pin.isAnonymous}
              avatar={pin.author?.avatar}
              backgroundColor={pin.author?.backgroundColor}
              name={pin.author?.name}
              zoom={zoom}
              left={left}
              isHighlighted={pin.commentId === activePinCommentId}
              top={top}
              onClick={() => {
                if (pin.commentId) {
                  if (editingComment) return;
                  setActivePinCommentId(pin.commentId);
                  clearCurrentPin();
                }
              }}
            />
          );
        })}

      {/* currentPin */}
      {currentPin?.filePage === pageNumber &&
        (() => {
          if (!currentPin) return null;

          const left = ((currentPin.fileX ?? 0) / pageSize.width) * 100;
          const top = 100 - ((currentPin.fileY ?? 0) / pageSize.height) * 100;

          return (
            <PinAvatar
              persona={persona}
              isAnonymous={isAnonymous ?? false}
              avatar={user?.avatar}
              backgroundColor={user?.backgroundColor}
              name={user?.name}
              zoom={zoom}
              left={left}
              top={top}
            />
          );
        })()}
    </div>
  );
};

export default Overlay;
