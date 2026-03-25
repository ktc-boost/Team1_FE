import type { ReactNode } from 'react';

type ModalType = 'confirm' | 'alert' | 'custom' | 'select';
type ModalSize = 'sm' | 'md' | 'lg' | 'lgPlus' | 'xl';

export type ModalButton = {
  text: string;
  onClick: () => void | Promise<void>;
  variant?:
    | 'link'
    | 'default'
    | 'defaultBoost'
    | 'secondaryBoost'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
  disabled?: boolean;
  styleClass?: string;
};

export type ModalPayload = {
  type: ModalType;
  size?: ModalSize;
  title: string;
  description?: string;
  content?: ReactNode;
  buttons?: ModalButton[];
  isLoading?: boolean;
  titleAlign?: 'left' | 'center';
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
};

export const ModalSizeMap: Record<string, string> = {
  sm: 'sm:max-w-[300px]',
  md: 'sm:max-w-[500px]',
  lg: 'sm:max-w-[700px]',
  lgPlus: 'sm:max-w-[800px]',
  xl: 'sm:max-w-[900px]',
};
