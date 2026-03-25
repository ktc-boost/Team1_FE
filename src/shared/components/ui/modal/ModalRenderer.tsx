import useModalStore from '@/shared/store/useModalStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/shadcn/dialog';
import { ModalButtons } from '@/shared/components/ui/modal/ModalButtons';
import { ModalSizeMap } from '@/shared/types/modalTypes';
import { cn } from '@/shared/lib/utils';

const ModalRenderer = () => {
  const { stack, resetModal } = useModalStore();
  const current = stack[stack.length - 1];
  if (!current) return null;

  const modalSize = ModalSizeMap[current.size || 'md'];

  return (
    <Dialog
      open={!!current}
      onOpenChange={(open) => {
        if (open === false && current.closeOnOutsideClick) resetModal();
      }}
    >
      <DialogContent
        className={cn('border-gray-300 gap-0', modalSize)}
        style={{ transition: 'none' }}
        showCloseButton={current.showCloseButton}
      >
        <DialogHeader
          className={cn(
            'mb-0 border-b pb-3 border-gray-300',
            current.titleAlign === 'center' ? 'items-center' : '',
          )}
        >
          <DialogTitle>{current.title}</DialogTitle>
          {current.description && (
            <DialogDescription className="label2-regular">{current.description}</DialogDescription>
          )}
        </DialogHeader>

        {current.content}
        {current.buttons && <ModalButtons buttons={current.buttons} />}
      </DialogContent>
    </Dialog>
  );
};

export default ModalRenderer;
