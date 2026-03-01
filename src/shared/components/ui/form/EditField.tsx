import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Input } from '@/shared/components/shadcn/input';
import { Button } from '@/shared/components/shadcn/button';
import ActionButtons from '@/shared/components/ui/ActionButtons';

interface EditFieldProps<T extends string | number> {
  label: string;
  value: T;
  type?: 'text' | 'number';
  onSave: (newValue: T) => void;
}

const EditField = <T extends string | number>({
  label,
  value,
  type = 'text',
  onSave,
}: EditFieldProps<T>) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState<T>(value);

  const handleSave = () => {
    if (inputValue !== value) onSave(inputValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = type === 'number' ? Number(e.target.value) : e.target.value;
    setInputValue(nextValue as T);
  };

  return (
    <div className="flex flex-col gap-1 py-2 md:pb-2 md:pt-0 border-b border-gray-300">
      <span className="body2-bold md:subtitle1-bold">{label}</span>
      {editing ? (
        <div className="flex items-center gap-1">
          <Input
            type={type}
            value={inputValue}
            onChange={handleChange}
            className="w-full h-8 md:h-10 left-0 body2-regular md:subtitle2-regular focus:ring-transparent focus:border-gray-400"
            autoFocus
          />
          <ActionButtons onSave={handleSave} onCancel={handleCancel} />
        </div>
      ) : (
        <div className="flex items-center gap-2 h-9 md:h-10 pl-1 body2-regular md:subtitle2-regular">
          <span className="text-gray-800">
            {value}
            {type === 'number' ? '명' : ''}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-500 hover:text-boost-blue hover:bg-boost-blue/10"
            onClick={() => setEditing(true)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditField;
