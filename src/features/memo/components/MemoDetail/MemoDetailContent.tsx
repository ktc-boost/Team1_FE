import MDEditor from '@uiw/react-md-editor';

interface MemoDetailContentProps {
  content: string;
}

const MemoDetailContent = ({ content }: MemoDetailContentProps) => {
  return (
    <section className="flex-1 p-4 overflow-auto" data-color-mode="light">
      <MDEditor.Markdown source={content} className="prose max-w-none" />
    </section>
  );
};

export default MemoDetailContent;
