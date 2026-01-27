import CircleBox from '@/shared/components/ui/CircleBox';
import { cn } from '@/shared/lib/utils';
import { floatVariant } from '@/shared/utils/animations/motionVariants';
import { BellRing, AlarmClock, SquareCheck } from 'lucide-react';

interface NotificationItem {
  icon: React.ReactNode;
  text: React.ReactNode;
  colorClass: string;
  customFloat: number;
  marginClass: string;
}

interface NotificationExamplesProps {
  position: 'left' | 'right';
}

const NOTIFICATION_DATA: Record<'left' | 'right', NotificationItem[]> = {
  left: [
    {
      icon: <BellRing />,
      text: (
        <>
          할 일이 <br /> 생겼어요!
        </>
      ),
      colorClass: 'bg-boost-yellow',
      customFloat: 10,
      marginClass: 'mr-14',
    },
    {
      icon: <AlarmClock />,
      text: (
        <>
          마감일이 얼마 <br /> 남지 않았어요!
        </>
      ),
      colorClass: 'bg-boost-blue-light',
      customFloat: -10,
      marginClass: 'ml-24 mb-10',
    },
  ],
  right: [
    {
      icon: <SquareCheck />,
      text: (
        <>
          팀원의 작업을 <br /> 승인해주세요!
        </>
      ),
      colorClass: 'bg-boost-orange',
      customFloat: 10,
      marginClass: 'mr-14',
    },
  ],
};

const NotificationExamples = ({ position }: NotificationExamplesProps) => {
  const items = NOTIFICATION_DATA[position];

  return (
    <section
      aria-label={`${position} notification examples`}
      className={cn(
        'flex flex-col items-center w-[25%] h-full py-24 box-border',
        position === 'left' ? 'justify-between pl-20 mr-5' : 'justify-center px-10',
      )}
    >
      {items.map((item, index) => (
        <CircleBox
          key={index}
          className={`${item.marginClass} ${item.colorClass}`}
          variants={floatVariant}
          custom={item.customFloat}
          animate="animate"
        >
          {item.icon}
          <p>{item.text}</p>
        </CircleBox>
      ))}
    </section>
  );
};

export default NotificationExamples;
