import type { AiCommentSide } from '@/features/ai-transform/types/ai-transform.ui.types';

export const AI_COMMENT_SIDE = {
  ORIGIN: 'original',
  TRANSFORM: 'transformed',
  DEFAULT: 'default',
} as const;

export const aiTransformGuideMap: Record<AiCommentSide, { text: string; color?: string }> = {
  original: {
    text: '원래 내 댓글 사용하기',
    color: 'text-boost-orange',
  },
  transformed: {
    text: 'Boo가 써준 댓글 선택하기',
    color: 'text-boost-blue',
  },
  default: { text: '어느 쪽이 마음에 드시나요?', color: 'text-gray-700' },
};
