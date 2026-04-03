import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';

interface AvatarSaveButtonProps {
  onSaveAvatar: () => void;
}

const AvatarSaveButton = ({ onSaveAvatar }: AvatarSaveButtonProps) => {
  return (
    <Button onClick={onSaveAvatar} variant="defaultBoost" size="lg" className="rounded-full">
      <ArrowRight className="w-5 h-5" />
      저장하고 다음
    </Button>
  );
};

export default AvatarSaveButton;
