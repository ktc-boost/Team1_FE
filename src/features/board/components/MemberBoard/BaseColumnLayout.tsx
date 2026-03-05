import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/components/shadcn/separator';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useColumnCollapsible } from '@/features/board/hooks/useColumnCollapsible';

interface BaseColumnLayoutProps {
  columnBgColor: string;
  headerBgColor: string;
  onScrollBottom?: () => void;
  headerAvatar: (isCollapsed: boolean) => ReactNode;
  headerContent: (isCollapsed: boolean) => ReactNode;
  children: ReactNode;
  separatorColor?: string;
}

const BaseColumnLayout = ({
  columnBgColor,
  headerBgColor,
  onScrollBottom,
  headerAvatar,
  headerContent,
  children,
  separatorColor = 'bg-gray-300',
}: BaseColumnLayoutProps) => {
  const isMobile = useIsMobile();
  const { scrollRef, isProfileCollapsible, handleMouseEnter, handleMouseLeave } =
    useColumnCollapsible({ onScrollBottom });

  const isCollapsed = isMobile || isProfileCollapsible;

  return (
    <div
      className={cn(
        'flex flex-col m-1 h-full shadow-md rounded-xl border-2 border-gray-300 flex-none w-[calc(100vw-26px)] md:w-[330px] snap-center md:snap-align-none overflow-hidden',
        columnBgColor,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          'flex items-center gap-10 md:gap-3 justify-center md:justify-between p-3 rounded-t-xl sticky top-0 z-10',
          headerBgColor,
        )}
        animate={{ flexDirection: isCollapsed ? 'row' : 'column' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className={cn('relative flex items-center mt-6', {
            'ml-3': isProfileCollapsible,
          })}
          animate={{
            marginTop: isCollapsed ? '0px' : '20px',
            scale: isCollapsed ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {headerAvatar(isCollapsed)}
        </motion.div>

        <motion.div
          className={cn(
            'flex flex-col',
            isCollapsed ? 'gap-1 items-start mr-5 mb-2' : 'gap-4 items-center',
          )}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {headerContent(isCollapsed)}
        </motion.div>
      </motion.div>

      <Separator
        className={cn(
          'hidden md:block',
          separatorColor,
          isProfileCollapsible ? 'my-2' : '!w-3/5 mx-auto my-7',
        )}
      />

      <div ref={scrollRef} className="relative flex flex-col p-2 gap-4 overflow-y-auto flex-grow">
        {children}
      </div>
    </div>
  );
};

export default BaseColumnLayout;
