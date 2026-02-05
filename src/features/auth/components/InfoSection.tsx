import BoostRocket from '@/shared/assets/images/boost/rocket-2d.png';
import BoostLogo from '@/shared/assets/images/boost/boost-logo-white.png';
import BoostInfoList from '@/features/auth/components/BoostInfoList';

const InfoSection = () => (
  <section className="flex-1 flex flex-col justify-center items-center px-6 py-10 sm:p-16 overflow-hidden bg-gradient-to-br from-blue-800 via-boost-blue to-boost-blue-hover text-center">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-boost-yellow rounded-lg sm:rounded-2xl shadow-lg">
        <img src={BoostRocket} alt="boost-rocket" className="w-8 sm:w-14 h-auto" />
      </div>
      <img src={BoostLogo} alt="boost-logo" className="w-[140px] sm:w-[250px] h-auto" />
    </div>

    <p className="subtitle1-bold sm:title1-bold text-white leading-relaxed mb-4">
      더 빠르게, 더 쉽게
      <br />
      당신의 프로젝트를 부스트하세요
    </p>

    <div className="mx-auto mt-4">
      <BoostInfoList />
    </div>
  </section>
);

export default InfoSection;
