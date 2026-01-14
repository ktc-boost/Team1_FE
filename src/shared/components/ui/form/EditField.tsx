import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { Input } from '@/shared/components/shadcn/input';
import { Button } from '@/shared/components/shadcn/button';

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
    onSave(inputValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-1 border-b border-gray-300 pb-2">
      <span className="subtitle1-bold">{label}</span>
      {editing ? (
        <div className="flex items-center">
          <Input
            type={type}
            value={inputValue}
            onChange={(e) => {
              const nextValue = type === 'number' ? Number(e.target.value) : e.target.value;
              setInputValue(nextValue as T);
            }}
            className="h-10 left-0 w-full subtitle2-regular focus:ring-transparent focus:border-gray-400"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-boost-blue hover:text-boost-blue-hover hover:bg-boost-blue/10"
            onClick={handleSave}
          >
            <Check className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-boost-orange hover:text-boost-orange-pressed hover:bg-boost-orange/10"
            onClick={handleCancel}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      ) : (
        <div className="h-10 flex items-center gap-2 subtitle2-regular pl-1">
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
