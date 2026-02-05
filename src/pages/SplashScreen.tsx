import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Boo from '@/shared/assets/images/boost/boo.webp';
import Boost from '@/shared/assets/images/boost/boost-logo-3d-low.webp';

const SplashScreen = () => {
  return (
    <div className="relative w-full h-screen bg-white flex flex-col items-center justify-center">
      <motion.div
        className="mb-6"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 30 }}
      >
        <img src={Boost} alt="boost-logo" className="w-30 h-30" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6"
      >
        <img src={Boo} alt="boo" className="w-32 h-32" />
      </motion.div>
      <p className="my-4 text-gray-500">초기화 중입니다.. </p>

      <div className="relative w-72 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-7">
        <motion.div
          className="absolute top-0 h-full w-1/3 bg-boost-blue rounded-full"
          initial={{ left: '-33%' }}
          animate={{ left: '100%' }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <Loader2 strokeWidth={3} className="w-7 h-7 animate-spin text-boost-blue mb-22" />
    </div>
  );
};

export default SplashScreen;
