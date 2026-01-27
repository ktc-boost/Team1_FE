import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Label } from '@/shared/components/shadcn/label';

interface FormLabelProps {
  icon: LucideIcon;
  children: ReactNode;
  required?: boolean;
}

const FormLabel = ({ icon: Icon, children, required }: FormLabelProps) => (
  <Label className="label1-bold mb-0.5 text-gray-800">
    <Icon className="w-4 h-4 text-gray-500" />
    {children}
    {required && <span className="text-red-500">*</span>}
  </Label>
);

export default FormLabel;
