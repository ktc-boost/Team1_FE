import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { useIsMobile } from '@/shared/hooks/use-mobile';

interface AiTransformGuideProps {
  hoveredSide: 'original' | 'transformed' | null;
}

const guideMap: Record<'original' | 'transformed' | 'default', { text: string; color?: string }> = {
  original: {
    text: '원래 내 댓글 사용하기',
    color: 'text-boost-orange',
  },
  transformed: {
    text: 'Boo가 써준 댓글 선택하기',
    color: 'text-boost-blue',
  },
  default: { text: '어느 쪽이 마음에 드시나요?', color: 'text-gray-700' },
};

const AiTransformGuide = ({ hoveredSide }: AiTransformGuideProps) => {
  const current = hoveredSide ? guideMap[hoveredSide] : guideMap.default;
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
