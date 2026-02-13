import type { CommentUIType } from '@/features/comment/types/commentTypes';
import CommentSection from '@/features/task-detail/components/CommentSection/CommentSection';
import { Drawer, DrawerContent } from '@/shared/components/shadcn/drawer';
interface CommentDrawerMobileProps {
  isCommentOpen: boolean;
  setIsCommentOpen: (open: boolean) => void;
  projectId: string;
  taskId: string;
  comments: CommentUIType[];
}

const CommentDrawerMobile = ({
  isCommentOpen,
  setIsCommentOpen,
  projectId,
  taskId,
  comments,
}: CommentDrawerMobileProps) => {
  return (
    <Drawer open={isCommentOpen} onOpenChange={setIsCommentOpen}>
      <DrawerContent className="h-[90vh]">
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <CommentSection projectId={projectId!} taskId={taskId!} comments={comments} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawerMobile;
