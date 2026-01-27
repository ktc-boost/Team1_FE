import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { animationVariants, type AnimationType } from '@/shared/utils/animations/animationVariants';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  animationType?: AnimationType;
}

const motionBaseProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.3 },
} as const;

const FeaturesSection = ({
  title,
  subtitle,
  description,
  image,
  animationType = 'left',
}: FeatureSectionProps) => {
  const isLeft = animationType === 'left';
  const isRight = animationType === 'right';

  return (
    <div
      className={cn('flex flex-col w-fit items-center max-w-6xl mx-auto py-20 px-6 gap-12', {
        'ml-30 ': isLeft,
        'mr-30': isRight,
      })}
    >
      <motion.div
        className={cn(
          'flex flex-col flex-1',
          isLeft && 'items-end text-right sm:items-start sm:text-left',
          isRight && 'items-start text-left sm:items-end sm:text-right',
        )}
        {...motionBaseProps}
        variants={animationVariants[animationType]}
      >
        <h2 className="text-xl sm:text-4xl font-bold mb-4 items-center">{title}</h2>
        <p className="title2-regular sm:title1-regular text-gray-600 mb-2 sm:mb-4">{subtitle}</p>
        <p className="body2-regular sm:subtitle1-regular text-gray-500">{description}</p>
      </motion.div>

      {image && (
        <motion.img
          src={image}
          alt={title}
          className="flex-1 max-w-5xl"
          {...motionBaseProps}
          variants={animationVariants[animationType]}
        />
      )}
    </div>
  );
};

export default FeaturesSection;
