import { Check, X } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';

interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  checkClassName?: string;
  cancelClassName?: string;
}

const DEFAULT_CHECK_CLASS =
  'h-9 w-9 text-boost-blue hover:text-boost-blue-hover hover:bg-boost-blue/10';
const DEFAULT_CANCEL_CLASS =
  'h-9 w-9 text-boost-orange hover:text-boost-orange-pressed hover:bg-boost-orange/10';

const ActionButtons = ({
  onSave,
  onCancel,
  checkClassName = DEFAULT_CHECK_CLASS,
  cancelClassName = DEFAULT_CANCEL_CLASS,
}: ActionButtonsProps) => (
  <>
    <Button variant="ghost" size="icon" className={checkClassName} onClick={onSave}>
      <Check className="w-5 h-5" />
    </Button>
    <Button variant="ghost" size="icon" className={cancelClassName} onClick={onCancel}>
      <X className="w-5 h-5" />
    </Button>
  </>
);

export default ActionButtons;
