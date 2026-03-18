import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { Button } from '@/shared/components/shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/shadcn/tooltip';
import { MessageSquare } from 'lucide-react';

interface PinCommentTooltipProps {
  hintOpen: boolean;
  onOpenComments: (() => void) | undefined;
  currentPin: PinWithAuthor | null;
}
const PinCommentTooltip = ({ hintOpen, onOpenComments, currentPin }: PinCommentTooltipProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={hintOpen}>
        <TooltipTrigger asChild>
          <Button onClick={onOpenComments} variant="ghost" className="relative">
            <MessageSquare className="size-5 transition-colors text-black" />
            {currentPin && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900"></span>
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="sm:hidden" side="bottom">
          <p> 핀댓글 달기</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PinCommentTooltip;
