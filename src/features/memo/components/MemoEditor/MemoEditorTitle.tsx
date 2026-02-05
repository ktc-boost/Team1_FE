import { Input } from '@/shared/components/shadcn/input';
import { Label } from '@/shared/components/shadcn/label';
import { Type } from 'lucide-react';

interface MemoEditorTitleProps {
  title: string;
  setTitle: (val: string) => void;
}

const MemoEditorTitle = ({ title, setTitle }: MemoEditorTitleProps) => {
  return (
    <div className="flex-shrink-0 p-4 pb-1">
      <Label className="flex mb-3 items-center !label1-bold text-gray-700">
        <Type className="w-4 h-4 text-gray-500" />
        제목
      </Label>
      <Input
        type="text"
        placeholder="메모 제목을 입력하세요"
        className="w-full h-9 md:h-11 !subtitle2-regular md:!subtitle1-regular border-gray-300 focus:ring-transparent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default MemoEditorTitle;
