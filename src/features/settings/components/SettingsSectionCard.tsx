import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/shadcn/card';
import type { ReactNode } from 'react';

interface SettingsSectionCardProps {
  title: string;
  children: ReactNode;
  desc?: string;
}

export const SettingsSectionCard = ({ title, desc, children }: SettingsSectionCardProps) => {
  return (
    <Card className={'shadow-none border-none mb-0 py-5 sm:py-6'}>
      <CardHeader>
        <CardTitle className="title2-bold">{title}</CardTitle>
        {desc && (
          <p className="label2-regular sm:body2-regular text-gray-500 mt-3 leading-relaxed">
            {desc}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};
