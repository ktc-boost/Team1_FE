import { useState } from 'react';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import { useModal } from '@/shared/hooks/useModal';
import toast from 'react-hot-toast';
import AiTransformTextCard from '@/features/ai-transform/components/AiTransformSelectModal/AiTransformTextCard';
import AiTransformGuide from '@/features/ai-transform/components/AiTransformSelectModal/AiTransformGuide';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { PERSONA } from '@/features/comment/constants/personaConstants';

const AiTransformSelectModalContent = () => {
  const { transformedText, originalText, setSelectedText } = useAiTransformStore();
  const [hoveredSide, setHoveredSide] = useState<'original' | 'transformed' | null>(null);
  const { resetModal } = useModal();
  const { setIsAnonymous, setPersona } = useTaskDetailStore();
  const handleSelect = (type: 'original' | 'transformed') => {
    const text = type === 'original' ? originalText : transformedText;
    if (!text) return;
    setSelectedText(text);
    if (type === 'transformed') {
      setIsAnonymous(true);
      setPersona(PERSONA.BOO);
      toast.success('댓글이 반영되었어요!');
    }
    resetModal();
  };

  return (
    <div className="flex flex-col gap-4 h-[400px]">
      <div className="flex gap-12 h-full">
        <AiTransformTextCard
          type="original"
          text={originalText}
          isHovered={hoveredSide === 'original'}
          onHover={setHoveredSide}
          onSelect={() => handleSelect('original')}
        />

        <AiTransformGuide hoveredSide={hoveredSide} />

        <AiTransformTextCard
          type="transformed"
          text={transformedText}
          isHovered={hoveredSide === 'transformed'}
          onHover={setHoveredSide}
          onSelect={() => handleSelect('transformed')}
        />
      </div>
    </div>
  );
};

export default AiTransformSelectModalContent;
