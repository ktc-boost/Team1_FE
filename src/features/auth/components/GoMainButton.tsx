import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTE_PATH } from '@/app/routes/Router';
import { Button } from '@/shared/components/shadcn/button';

const GoMainButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(ROUTE_PATH.MAIN)}
      className="z-10 mb-3 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer
      shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900 md:absolute md:top-6 md:left-6 md:mb-0"
    >
      <ArrowLeft size={16} />
      메인 페이지로
    </Button>
  );
};

export default GoMainButton;
