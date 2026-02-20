import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { useShallow } from 'zustand/react/shallow';
import { PinAvatar } from '@/features/task-detail/components/PdfViewer/PinAvatar';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
interface OverlayProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Overlay = ({ onClick }: OverlayProps) => {
  const { pageNumber, zoom, pageSize } = usePdfStore(
    useShallow((s) => ({
      pageNumber: s.pageNumber,
      zoom: s.zoom,
      pageSize: s.pageSize,
    })),
  );
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
    openCommentDrawer,
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
      openCommentDrawer: s.openCommentDrawer,
    })),
  );
  const user = useAuthStore((state) => state.user);
  const pinList = pins as PinWithAuthor[];
  const isMobile = window.matchMedia('(max-width: 640px)').matches;

  return (
    <div className="absolute inset-0 top-0 left-0 w-full h-full z-10" onClick={onClick}>
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
              onClick={(e) => {
                e.stopPropagation();
                if (editingComment) return;
                if (pin.commentId) {
                  setActivePinCommentId(pin.commentId);
                  clearCurrentPin();
                  if (isMobile) openCommentDrawer();
                }
              }}
            />
          );
        })}

      {currentPin?.filePage === pageNumber && (
        <PinAvatar
          persona={persona}
          isAnonymous={isAnonymous ?? false}
          avatar={user?.avatar}
          backgroundColor={user?.backgroundColor}
          name={user?.name}
          zoom={zoom}
          left={((currentPin.fileX ?? 0) / pageSize.width) * 100}
          top={100 - ((currentPin.fileY ?? 0) / pageSize.height) * 100}
          onClick={(e) => {
            e.stopPropagation();
            if (editingComment) return;
            if (isMobile) {
              openCommentDrawer();
              console.log('dksfjksdjflkdsjflksdjf');
            }
          }}
        />
      )}
    </div>
  );
};

export default Overlay;
