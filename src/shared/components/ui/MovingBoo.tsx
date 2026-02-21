import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import Boo from '@/shared/assets/images/boost/boo-front.png';

interface MovingBooProps {
  size?: number;
}

const sizeClassMap: Record<number, string> = {
  16: 'w-16 h-16',
  24: 'w-24 h-24',
  28: 'w-28 h-28',
  32: 'w-32 h-32',
  36: 'w-36 h-36',
  40: 'w-40 h-40',
};

const MovingBoo = ({ size = 32 }: MovingBooProps) => (
  <div className="flex justify-center items-center pt-8 pb-6">
    <motion.img
      src={Boo}
      className={cn(sizeClassMap[size])}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export default MovingBoo;
