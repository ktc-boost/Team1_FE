import type { ComponentType, ReactNode } from 'react';

interface MemoDateInfoProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
}

const MemoDateInfo = ({ icon: Icon, label, value }: MemoDateInfoProps) => {
  return (
    <div className="flex items-center gap-1 text-gray-600 label1-regular">
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="mx-1 font-bold text-gray-700">{label}</span>
      <span className="inline">{value}</span>
    </div>
  );
};

export default MemoDateInfo;
