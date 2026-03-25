import { useMutation } from '@tanstack/react-query';
import type {
  AiTransformRequest,
  AiTransformResponse,
} from '@/features/ai-transform/types/aiTransformTypes';
import { aiTransformApi } from '@/features/ai-transform/api/aiTransformApi';

export const useAiTransformMutation = (
  onSuccessCallback?: (data: AiTransformResponse) => void,
  onErrorCallback?: (error: Error) => void,
) => {
  return useMutation<AiTransformResponse, Error, AiTransformRequest>({
    mutationFn: async (payload) => {
      const res = await aiTransformApi.commentTransform(payload);
      return res;
    },
    onSuccess: (data) => {
      window.gtag('event', 'use_boo_transform');
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      onErrorCallback?.(error);
    },
  });
};
