import { Headset } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/tooltip';
import { Button } from '@/shared/components/shadcn/button';
import { useInquireModals } from '@/features/inquire/hooks/useInquireModals';

const InquireFloatingButton = () => {
  const { showInquireModal } = useInquireModals();
  const handleInquireClick = () => showInquireModal();

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 [margin-right:var(--removed-body-scroll-bar-size)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="defaultBoost"
            onClick={handleInquireClick}
            className="w-12 h-12 rounded-full border-4 border-white/50 shadow-md"
          >
            <Headset className="text-white scale-125" strokeWidth={2} />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side="left"
          className="bg-boost-blue [&_svg]:fill-boost-blue [&_svg]:bg-boost-blue"
        >
          <p>문의하기</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default InquireFloatingButton;
