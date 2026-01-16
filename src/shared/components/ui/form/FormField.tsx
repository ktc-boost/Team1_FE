import type { LucideIcon } from 'lucide-react';
import FormLabel from '@/shared/components/ui/form/FormLabel';

interface FormFieldProps {
  label: string;
  icon: LucideIcon;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}

export const FormField = ({ label, icon, required, children, error }: FormFieldProps) => (
  <div className="flex flex-col gap-1">
    <FormLabel icon={icon} required={required}>
      {label}
    </FormLabel>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
