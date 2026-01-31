import { Button } from '@/shared/components/shadcn/button';
import { Check } from 'lucide-react';
interface AvatarSaveBtnProps {
  handleSave: () => void;
}
const AvatarSaveBtn = ({ handleSave }: AvatarSaveBtnProps) => {
  return (
    <div className="pt-12">
      <Button
        onClick={handleSave}
        className="w-0 sm:w-80 bg-boost-blue hover:bg-boost-blue-hover text-white font-semibold text-lg h-14 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        size="lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <span className="relative z-10 flex items-center gap-2">
          <Check size={20} />
          완료
        </span>
      </Button>
    </div>
  );
};

export default AvatarSaveBtn;
