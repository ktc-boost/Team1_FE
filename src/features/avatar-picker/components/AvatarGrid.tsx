import { avatarList } from '@/features/avatar-picker/utils/avatarUtils';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Check, User } from 'lucide-react';
import tinycolor from 'tinycolor2';
interface AvatarGridProps {
  selectedAvatarId: string;
  hoveredIndex: number | null;
  setAvatarId: (id: string) => void;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selectedBgColor: string | null;
}
const AvatarGrid = ({
  selectedAvatarId,
  hoveredIndex,
  setAvatarId,
  setHoveredIndex,
  selectedBgColor,
}: AvatarGridProps) => {
  return (
    <div className="px-24 py-6 max-h-96 overflow-y-auto">
      <div aria-label="아바타 목록" className="grid grid-cols-4 gap-6">
        {avatarList.map((avatarUrl, index) => {
          const isSelected = selectedAvatarId === String(index);
          const isHovered = hoveredIndex === index;

          return (
            <div key={index} className="flex justify-center">
              <button
                type="button"
                className="group relative cursor-pointer outline-none"
                onClick={() => setAvatarId(String(index))}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-50 scale-110 transition-all"
                    style={{
                      background: `radial-gradient(circle, ${selectedBgColor} 0%, transparent 30%)`,
                    }}
                  />
                )}

                <Avatar
                  className={cn(
                    'w-30 h-30 border-4 rounded-full transition-all p-1 duration-300 relative flex items-center justify-center',
                    isSelected
                      ? 'shadow-lg scale-105'
                      : 'border-gray-200 group-hover:shadow-md group-hover:scale-105',
                  )}
                  style={{
                    backgroundColor:
                      isSelected || isHovered ? selectedBgColor || '#f3f4f6' : '#ffffff',
                    borderColor: isSelected
                      ? tinycolor(selectedBgColor || '#f3f4f6')
                          .darken(3)
                          .toString()
                      : '#ffffff',
                  }}
                >
                  <AvatarImage src={avatarUrl} alt={`Avatar ${index + 1}`} className="w-24 h-24" />
                  <AvatarFallback
                    style={{
                      backgroundColor: selectedBgColor || '#f3f4f6',
                    }}
                  >
                    <User size={24} />
                  </AvatarFallback>
                </Avatar>

                {isSelected && (
                  <div className="absolute top-1 -right-0 bg-boost-blue rounded-full p-1.5 shadow-lg">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarGrid;
