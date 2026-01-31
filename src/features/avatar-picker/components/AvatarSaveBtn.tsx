import { Button } from '@/shared/components/shadcn/button';
interface AvatarSaveBtnProps {
  handleSave: () => void;
}
const AvatarSaveBtn = ({ handleSave }: AvatarSaveBtnProps) => {
  return (
    <div className="pt-12">
      <Button
        onClick={handleSave}
        className="w-50 sm:w-80 bg-boost-blue hover:bg-boost-blue-hover cursor-pointer text-white font-semibold text-md h-14 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        size="lg"
      >
        완료
      </Button>
    </div>
  );
};

export default AvatarSaveBtn;
