import { Sparkles } from 'lucide-react';

const AvatarHeader = () => {
  return (
    <div className="shrink-0 text-center pt-6 sm:pt-20">
      <div className="inline-flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-boost-blue animate-pulse" />
        <h1 className="subtitle1-bold sm:title1-bold text-gray-800">아바타를 설정해주세요</h1>
      </div>
    </div>
  );
};

export default AvatarHeader;
