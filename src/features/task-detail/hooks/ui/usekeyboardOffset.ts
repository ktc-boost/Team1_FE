import { useEffect, useState } from 'react';

export const useKeyboardOffset = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const offset = window.innerHeight - viewport.height - viewport.offsetTop;

      setKeyboardOffset(offset > 0 ? offset : 0);
    };

    viewport.addEventListener('resize', handleResize);
    viewport.addEventListener('scroll', handleResize);

    return () => {
      viewport.removeEventListener('resize', handleResize);
      viewport.removeEventListener('scroll', handleResize);
    };
  }, []);

  return keyboardOffset;
};
