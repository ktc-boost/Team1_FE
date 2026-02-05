import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTE_PATH } from '@/app/routes/Router';
import { Button } from '@/shared/components/shadcn/button';
import Boost_3D from '@/shared/assets/images/boost/webp/boost-logo-3d.webp';
import { floatVariant } from '@/shared/utils/animations/motionVariants';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:min-h-[80vh] gap-0 sm:gap-10">
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            팀 프로젝트를
            <br />
            <span className="text-boost-blue">쉽게 관리</span>하세요
          </h1>

          <p className="text-sm sm:text-xl text-gray-600 leading-relaxed">
            <span className="block sm:inline">칸반보드로 진행 현황을 확인하고,</span>
            <span className="block sm:inline">서로에게 피드백을 남겨보세요.</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">대학생 팀프로젝트에 필요한 기능들을 제공합니다!</span>
          </p>

          <div className="flex flex-col lg:flex-row gap-4 lg:justify-start">
            <Button
              onClick={() => navigate(ROUTE_PATH.LOGIN)}
              variant="defaultBoost"
              className="lg:w-auto"
              size="lg"
            >
              서비스 경험하기
            </Button>
          </div>
        </div>

        <motion.img
          src={Boost_3D}
          alt="Boost 3D"
          className="order-1 lg:order-2 w-[250px] xl:w-[400px] justify-self-center"
          variants={floatVariant}
          animate="animate"
        />
      </div>
    </div>
  );
};

export default HeroSection;
