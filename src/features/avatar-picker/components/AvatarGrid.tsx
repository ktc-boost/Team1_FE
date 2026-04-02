import tinycolor from 'tinycolor2';
import { Check, User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { avatarList } from '@/features/avatar-picker/utils/avatarUtils';
import { DEFAULT_BG, SELECTED_BG } from '@/features/avatar-picker/constants/avatar.ui.constants';

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
    <div className="px-10 py-5 sm:px-24 sm:py-6 max-h-96 overflow-y-auto">
      <div aria-label="아바타 목록" className="grid grid-cols-4 gap-6 sm:gap-8 pt-2 ">
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
                    'w-16 h-16 sm:w-30 sm:h-30 border-4 rounded-full transition-all p-1 duration-300 relative flex items-center justify-center',
                    isSelected
                      ? 'shadow-lg scale-105'
                      : 'border-gray-200 group-hover:shadow-md group-hover:scale-105',
                  )}
                  style={{
                    backgroundColor:
                      isSelected || isHovered ? selectedBgColor || SELECTED_BG : DEFAULT_BG,
                    borderColor: isSelected
                      ? tinycolor(selectedBgColor || SELECTED_BG)
                          .darken(3)
                          .toString()
                      : DEFAULT_BG,
                  }}
                >
                  <AvatarImage src={avatarUrl} alt={`Avatar ${index + 1}`} />
                  <AvatarFallback
                    style={{
                      backgroundColor: selectedBgColor || SELECTED_BG,
                    }}
                  >
                    <User size={24} />
                  </AvatarFallback>
                </Avatar>

                {isSelected && (
                  <div className="absolute top-1 -right-0 bg-boost-blue rounded-full p-1.5 shadow-lg">
                    <Check className="text-white w-2 h-2 sm:w-4 sm:h-4" />
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
