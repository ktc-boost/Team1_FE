import Header from '@/widgets/Header';
import { useModal } from '@/shared/hooks/useModal';
import TaskCreateModalContent from '@/features/task/components/TaskModal/TaskCreateModalContent';

const MyTaskHeader = ({ userName }: { userName: string }) => {
  const { showCustom } = useModal();

  return (
    <Header
      title={`${userName} 님의 할 일`}
      onCreate={() =>
        showCustom({
          title: '할 일 생성',
          size: 'lg',
          description: '새로운 할 일을 만들어보세요!',
          content: <TaskCreateModalContent isMyTask={true} />,
        })
      }
    />
  );
};

export default MyTaskHeader;
