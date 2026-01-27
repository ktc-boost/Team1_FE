import { motion } from 'framer-motion';
import { fadeInLeftStagger } from '@/shared/utils/animations/motionVariants';
import { boostInfo } from '@/features/auth/constants/auth.ui.constants';

const BoostInfoList = () => {
  return (
    <div className="flex flex-col gap-3 w-full px-2 sm:px-0">
      {boostInfo.map((info, index) => (
        <motion.div
          key={info.title}
          className="flex items-center gap-3 w-full"
          custom={index}
          variants={fadeInLeftStagger}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-white/40 rounded-lg shrink-0">
            <span className="text-xl">{info.icon}</span>
          </div>

          <p className="text-white body2-regular sm:title2-regular text-left leading-relaxed">
            <strong className="text-boost-blue-light">{info.keyLetter}</strong>
            {info.title}: {info.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default BoostInfoList;
