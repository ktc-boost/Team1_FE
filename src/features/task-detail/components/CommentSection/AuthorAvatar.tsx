import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { User } from 'lucide-react';
import BOO from '@/shared/assets/images/boost/boo.webp';
import type { PersonaType } from '@/features/comment/constants/personaConstants';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';

interface AuthorAvatarProps {
  persona?: PersonaType; // 'BOO' | null
  isAnonymous: boolean;
  avatar?: string | null;
  backgroundColor?: string | null;
  name?: string | null;
}

export const AuthorAvatar = ({
  persona,
  isAnonymous,
  avatar,
  backgroundColor,
  name,
}: AuthorAvatarProps) => {
  const isBooPersona = persona === 'BOO';
  const effectiveAnonymous = isBooPersona ? true : isAnonymous;

  if (isBooPersona) {
    return (
      <Avatar className="flex items-center justify-center h-8 w-8 shrink-0 shadow-xs bg-boost-yellow">
        <AvatarImage className="w-6 h-6" src={BOO} alt="BOO" />
        <AvatarFallback>BOO</AvatarFallback>
      </Avatar>
    );
  }

  if (effectiveAnonymous) {
    return (
      <Avatar className="flex items-center justify-center h-8 w-8 shrink-0 shadow-xs bg-gray-500">
        <User className="w-4 h-4 text-white" />
      </Avatar>
    );
  }

  return (
    <Avatar
      className="flex items-center justify-center h-8 w-8 shrink-0 shadow-xs text-white text-xs"
      style={{
        backgroundColor: backgroundColor ?? undefined,
      }}
    >
      {avatar ? (
        <AvatarImage
          src={getAvatarSrc({ avatar })}
          alt={name || 'avatar'}
          className="h-7 w-7 object-cover rounded-full"
        />
      ) : (
        <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
      )}
    </Avatar>
  );
};
