import { useRef } from 'react';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';

export const usePdfDrag = () => {
  const { isDragging, start, position, startDrag, updatePosition, stopDrag } = usePdfStore();
  const mouseMoved = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    startDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
    mouseMoved.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition({ x: e.clientX - start.x, y: e.clientY - start.y });
    mouseMoved.current = true;
  };

  const onMouseUp = () => stopDrag();

  return { onMouseDown, onMouseMove, onMouseUp, mouseMoved };
};
