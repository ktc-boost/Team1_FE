import {
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleUp,
} from '@/shared/utils/animations/motionVariants';

export const animationVariants = {
  left: fadeInLeft,
  right: fadeInRight,
  up: fadeInUp,
  down: fadeInDown,
  scale: scaleUp,
};

export type AnimationType = keyof typeof animationVariants;
