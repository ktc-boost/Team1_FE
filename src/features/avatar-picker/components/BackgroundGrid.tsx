import { cn } from '@/shared/lib/utils';
import { Check } from 'lucide-react';
type AvatarBgColor = {
  token: string;
  hex: string;
};
interface BackgroundGridProps {
  avatarBgColors: AvatarBgColor[];
  setBgColor: (hex: string) => void;
  selectedBgColor: string | null;
}
const BackgroundGrid = ({ avatarBgColors, setBgColor, selectedBgColor }: BackgroundGridProps) => {
  return (
    <div className="flex items-center px-6 py-6 border-b border-gray-100 mb-5">
      <div className="flex justify-center gap-5 flex-wrap mx-auto">
        {avatarBgColors.map(({ token, hex }) => (
          <button
            key={hex}
            onClick={() => setBgColor(hex)}
            className={cn(
              'relative w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 focus:scale-120 hover:shadow-sm cursor-pointer',
            )}
            style={{
              backgroundColor: token,
            }}
            aria-label={`색상 ${hex}`}
          >
            {selectedBgColor === hex && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-1 shadow-lg">
                  <Check className="text-gray-800 w-4 h-4" strokeWidth={3} />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundGrid;
