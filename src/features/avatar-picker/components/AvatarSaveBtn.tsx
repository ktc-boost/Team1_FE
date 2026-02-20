import { Button } from '@/shared/components/shadcn/button';
interface AvatarSaveBtnProps {
  handleSave: () => void;
}
const AvatarSaveBtn = ({ handleSave }: AvatarSaveBtnProps) => {
  return (
    <div className="pt-12">
      <Button
        onClick={handleSave}
        variant="defaultBoost"
        className="w-50 sm:w-80 h-14 body1-bold rounded-2xl hover:shadow-lg hover:-translate-y-1 transition"
        size="lg"
      >
        완료
      </Button>
    </div>
  );
};

export default AvatarSaveBtn;
