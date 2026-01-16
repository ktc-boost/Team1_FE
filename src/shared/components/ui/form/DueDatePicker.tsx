import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/shadcn/popover';
import { Calendar } from '@/shared/components/shadcn/calendar';
import { Button } from '@/shared/components/shadcn/button';
import { formatDate, parseDateString } from '@/shared/utils/dateUtils';
import { useState } from 'react';

interface DueDatePickerProps {
  value: string | undefined;
  onChange: (dateString: string) => void;
}

const DueDatePicker = ({ value, onChange }: DueDatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-gray-200 focus:ring-transparent h-11 label2-regular border-gray-300 w-full justify-start text-left"
          >
            {value || '날짜 선택'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ? parseDateString(value) : undefined}
            onSelect={(date) => {
              if (date) {
                onChange(formatDate(date));
                setOpen(false);
              }
            }}
            captionLayout="dropdown"
            className="border-gray-300"
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DueDatePicker;
