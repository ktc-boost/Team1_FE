import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { aiTransformGuideMap } from '@/features/ai-transform/constants/ai-transform.ui.constants';
import type { AiCommentSide } from '@/features/ai-transform/types/ai-transform.ui.types';

interface AiTransformGuideProps {
  hoveredSide: AiCommentSide;
}

const AiTransformGuide = ({ hoveredSide }: AiTransformGuideProps) => {
  const current = hoveredSide ? aiTransformGuideMap[hoveredSide] : aiTransformGuideMap.default;
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center justify-center w-42 gap-1 sm:gap-4">
      <MovingBoo size={isMobile ? 32 : 37} />
      <div className="flex items-center gap-2 body2-bold text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.text}
            className={cn('hidden sm:block', current.color)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {current.text}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AiTransformGuide;
