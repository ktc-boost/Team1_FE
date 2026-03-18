import { useEffect, useState } from 'react';

export function useResponsiveColumns() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width > 1024) setVisibleCount(4);
      else if (width >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };

    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return visibleCount;
}
