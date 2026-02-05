import type { PersonaType } from '@/features/comment/constants/personaConstants';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';

export const isBlank = (content: string) => content.trim().length === 0;
export const resolvePinFileInfo = (currentPin: FileInfo | null): FileInfo | null => {
  return currentPin ?? null;
};
export const buildCreateCommentPayload = (params: {
  content: string;
  isAnonymous: boolean;
  persona: PersonaType | null;
  currentPin: FileInfo | null;
}) => {
  const { content, isAnonymous, persona, currentPin } = params;

  const fileInfo = resolvePinFileInfo(currentPin);

  return {
    content,
    isAnonymous,
    persona,
    ...(fileInfo ? { fileInfo } : {}), // undefined면 key 자체를 제거
  };
};
