import { SidebarTrigger } from '@/shared/components/shadcn/sidebar';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FloatingSidebarTriggerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const FloatingSidebarTrigger = ({ containerRef }: FloatingSidebarTriggerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pressStart, setPressStart] = useState(0);

  const handlePointerDown = () => {
    setPressStart(Date.now());
    setIsDragging(false);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const pressDuration = Date.now() - pressStart;

    if (pressDuration < 250 && !isDragging) {
      e.stopPropagation();

      const triggerButton = e.currentTarget.querySelector('button');
      triggerButton?.click();
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.2}
      dragConstraints={containerRef}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="
        fixed bottom-5 right-5 z-50 
        md:hidden 
        backdrop-blur-md 
        shadow-md
        rounded-full p-1
        cursor-grab active:cursor-grabbing
        bg-white/70
      "
    >
      <div className="pointer-events-none">
        <SidebarTrigger className="rounded-full p-5" />
      </div>
    </motion.div>
  );
};

export default FloatingSidebarTrigger;
