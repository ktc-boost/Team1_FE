import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { User } from 'lucide-react';
import BOO from '@/shared/assets/images/boost/boo.webp';
import { PERSONA, type PersonaType } from '@/features/comment/constants/personaConstants';
import { cn } from '@/shared/lib/utils';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';

interface PinAvatarProps {
  persona?: PersonaType;
  isAnonymous: boolean;
  avatar?: string | null;
  backgroundColor?: string | null;
  name?: string | null;

  zoom: number;
  left: number;
  top: number;
  isHighlighted?: boolean;

  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PinAvatar = ({
  persona,
  isAnonymous,
  avatar,
  backgroundColor,
  name,
  zoom,
  left,
  top,
  className,
  isHighlighted,
  onClick,
}: PinAvatarProps) => {
  const isBoo = persona === PERSONA.BOO;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={cn(
        'absolute w-8 h-8 rounded-[50%_50%_50%_0] -rotate-45 border-2 shadow-md overflow-hidden cursor-pointer select-none transition-all duration-200 z-50',
        isBoo && 'bg-boost-yellow border-boost-yellow',
        !isBoo && isAnonymous && 'bg-gray-500 border-gray-500',

        isHighlighted && ' shadow-[0_0_15px_rgba(255,193,7,0.9)] scale-[1.18]',
        className,
      )}
      style={{
        ...(!isBoo && !isAnonymous
          ? {
              backgroundColor: backgroundColor ?? undefined,
              borderColor: backgroundColor ?? undefined,
            }
          : {}),
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(50%, -120%) scale(${zoom})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full rotate-[45deg]">
        {isBoo ? (
          <img src={BOO} alt="BOO" className="w-5 h-5 object-contain" />
        ) : !isBoo && isAnonymous ? (
          <User className="text-white w-4 h-4" />
        ) : (
          <Avatar className="bg-transparent w-full h-full flex items-center justify-center">
            {avatar ? (
              <AvatarImage
                src={getAvatarSrc({ avatar })}
                alt={name || 'avatar'}
                className="w-6 h-6 object-cover rounded-full"
              />
            ) : (
              <AvatarFallback className="text-xs">{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        )}
      </div>
    </div>
  );
};
