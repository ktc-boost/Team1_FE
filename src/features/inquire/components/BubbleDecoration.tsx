import { motion } from 'framer-motion';
import { floatVariant } from '@/shared/utils/animations/motionVariants';
import BoostRocket from '@/shared/assets/images/boost/rocket-2d.png';

interface BubbleDecorationProps {
  content: string;
}

const BubbleDecoration = ({ content }: BubbleDecorationProps) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      variants={floatVariant}
      animate="animate"
      custom={5}
    >
      <div className="flex items-center gap-1 border border-boost-blue-dark/30 text-gray-700 px-3 py-1 rounded-full shadow-sm label2-regular">
        <img src={BoostRocket} alt="boost-rocket" className="w-5" />
        {content}
      </div>
    </motion.div>
  );
};

export default BubbleDecoration;
