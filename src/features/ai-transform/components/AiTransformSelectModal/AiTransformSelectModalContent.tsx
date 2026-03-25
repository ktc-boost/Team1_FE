import { useState } from 'react';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import { useModal } from '@/shared/hooks/useModal';
import toast from 'react-hot-toast';
import AiTransformTextCard from '@/features/ai-transform/components/AiTransformSelectModal/AiTransformTextCard';
import AiTransformGuide from '@/features/ai-transform/components/AiTransformSelectModal/AiTransformGuide';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { PERSONA } from '@/features/comment/constants/personaConstants';
import { AI_COMMENT_SIDE } from '@/features/ai-transform/constants/ai-transform.ui.constants';
import type { AiCommentSide } from '@/features/ai-transform/types/ai-transform.ui.types';

const AiTransformSelectModalContent = () => {
  const { transformedText, originalText, setSelectedText } = useAiTransformStore();
  const { setIsAnonymous, setPersona } = useTaskDetailStore();
  const { resetModal } = useModal();

  const [hoveredSide, setHoveredSide] = useState<AiCommentSide>(AI_COMMENT_SIDE.DEFAULT);

  const handleSelect = (type: AiCommentSide) => {
    const text = type === AI_COMMENT_SIDE.ORIGIN ? originalText : transformedText;

    if (!text) return;

    setSelectedText(text);

    if (type === AI_COMMENT_SIDE.TRANSFORM) {
      setIsAnonymous(true);
      setPersona(PERSONA.BOO);

      toast.success('댓글이 반영되었어요!');
    }

    resetModal();
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-12 h-full items-center">
        <AiTransformTextCard
          type="original"
          text={originalText}
          isHovered={hoveredSide === AI_COMMENT_SIDE.ORIGIN}
          onHover={setHoveredSide}
          onSelect={() => handleSelect(AI_COMMENT_SIDE.ORIGIN)}
        />

        <AiTransformGuide hoveredSide={hoveredSide} />

        <AiTransformTextCard
          type="transformed"
          text={transformedText}
          isHovered={hoveredSide === AI_COMMENT_SIDE.TRANSFORM}
          onHover={setHoveredSide}
          onSelect={() => handleSelect(AI_COMMENT_SIDE.TRANSFORM)}
        />
      </div>
    </div>
  );
};

export default AiTransformSelectModalContent;
