import { Button } from '@/shared/components/shadcn/button';
import { ArrowRight } from 'lucide-react';
interface AvatarSaveBtnProps {
  handleSave: () => void;
}
const AvatarSaveBtn = ({ handleSave }: AvatarSaveBtnProps) => {
  return (
    <Button onClick={handleSave} variant="defaultBoost" size="lg">
      <ArrowRight className="w-5 h-5" />
      저장하고 다음
    </Button>
  );
};

export default AvatarSaveBtn;
