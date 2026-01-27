import { cn } from '@/shared/lib/utils';
import { motion, type MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface CircleBoxProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const CircleBox = ({ className, children, ...props }: CircleBoxProps) => (
  <motion.div
    className={cn(
      'hidden md:flex flex-col items-center justify-center gap-2 w-[200px] h-[200px] rounded-full text-center font-semibold text-lg shadow-md text-white',
      className,
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export default CircleBox;
