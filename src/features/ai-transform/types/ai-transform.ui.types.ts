import type { AI_COMMENT_SIDE } from '@/features/ai-transform/constants/ai-transform.ui.constants';

export type AiCommentSide = (typeof AI_COMMENT_SIDE)[keyof typeof AI_COMMENT_SIDE];
