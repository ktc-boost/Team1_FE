import { FileText } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Label } from '@/shared/components/shadcn/label';

interface MemoEditorContentProps {
  content: string;
  setContent: (val: string) => void;
}

const MemoEditorContent = ({ content, setContent }: MemoEditorContentProps) => {
  const handleChange = (val?: string) => setContent(val ?? '');

  return (
    <div className="flex-1 overflow-hidden p-4 pt-1">
      <div className="mb-3 flex items-center gap-2">
        <Label className="flex items-center gap-1 !label1-bold text-gray-700">
          <FileText className="h-4 w-4 text-gray-500" />
          내용
        </Label>
        <p className="caption1-regular md:hidden text-gray-500 ">※ 공간이 좁다면 전체화면 이용</p>
      </div>

      <div className="h-[calc(100%-2rem)]" data-color-mode="light">
        <MDEditor value={content} onChange={handleChange} height="100%" />
      </div>
    </div>
  );
};

export default MemoEditorContent;
