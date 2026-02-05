import { Clipboard, FileText, Edit2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const tabs = [
  { label: '보드', icon: Clipboard },
  { label: '파일', icon: FileText },
  { label: '메모', icon: Edit2 },
] as const;

type Tab = (typeof tabs)[number]['label'];

interface TopTabProps {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
  showTabs?: boolean;
}

const TopTab = ({ activeTab, onChangeTab, showTabs = true }: TopTabProps) => {
  return (
    <nav className="w-full bg-gray-100 border-b border-gray-300 subtitle2-bold" aria-label="탭">
      <ul className="flex h-12 pl-5" role="tablist" aria-orientation="horizontal">
        {showTabs &&
          tabs.map(({ label, icon: Icon }) => (
            <li key={label} className="border-r border-gray-200 last:border-r-0">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === label}
                className={cn(
                  'flex h-12 items-center gap-2 px-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-boost-blue transition-colors duration-300',
                  activeTab === label
                    ? 'text-boost-blue border-b-2 border-b-boost-blue'
                    : 'subtitle2-regular text-gray-600 hover:text-gray-700 border-b-2 border-b-transparent',
                )}
                onClick={() => onChangeTab(label)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default TopTab;
