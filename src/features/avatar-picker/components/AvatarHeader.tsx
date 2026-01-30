import { Sparkles } from 'lucide-react';

const AvatarHeader = () => {
  return (
    <div className="text-center pt-20">
      <div className="inline-flex items-center gap-2 mb-4">
        <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-800">아바타를 설정해주세요</h1>
      </div>
    </div>
  );
};

export default AvatarHeader;
