import { useState } from 'react';
import { useVerticalScroll } from '@/features/board/hooks/useVerticalScroll';
import { COLLAPSIBLE_SCROLL_THRESHOLD } from '@/features/board/constants/board.ui.constants';

interface UseColumnCollapsibleProps {
  onScrollBottom?: () => void;
}

export const useColumnCollapsible = ({ onScrollBottom }: UseColumnCollapsibleProps) => {
  const [isProfileCollapsible, setIsProfileCollapsible] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);

  const scrollRef = useVerticalScroll<HTMLDivElement>(() => {
    if (!scrollRef.current || !isMouseInside) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    setIsProfileCollapsible(scrollHeight > COLLAPSIBLE_SCROLL_THRESHOLD);

    if (onScrollBottom) {
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isAtBottom) {
        onScrollBottom();
      }
    }
  });

  const handleMouseEnter = () => setIsMouseInside(true);
  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setIsProfileCollapsible(false);
  };

  return {
    scrollRef,
    isProfileCollapsible,
    handleMouseEnter,
    handleMouseLeave,
  };
};
