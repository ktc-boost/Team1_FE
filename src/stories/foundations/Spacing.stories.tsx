import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/shared/components/shadcn/separator';

const meta = {
  title: 'Foundation/Spacing',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type SpacingItem = {
  token: string;
  rem: string;
  px: number;
};

const spacingItems: SpacingItem[] = [
  { token: 'spacing-0', rem: '0rem', px: 0 },
  { token: 'spacing-1', rem: '0.25rem', px: 4 },
  { token: 'spacing-2', rem: '0.5rem', px: 8 },
  { token: 'spacing-3', rem: '0.75rem', px: 12 },
  { token: 'spacing-4', rem: '1rem', px: 16 },
  { token: 'spacing-5', rem: '1.25rem', px: 20 },
  { token: 'spacing-6', rem: '1.5rem', px: 24 },
  { token: 'spacing-7', rem: '1.75rem', px: 28 },
  { token: 'spacing-8', rem: '2rem', px: 32 },
  { token: 'spacing-9', rem: '2.25rem', px: 36 },
  { token: 'spacing-10', rem: '2.5rem', px: 40 },
  { token: 'spacing-11', rem: '2.75rem', px: 44 },
  { token: 'spacing-12', rem: '3rem', px: 48 },
  { token: 'spacing-13', rem: '3.25rem', px: 52 },
  { token: 'spacing-14', rem: '3.5rem', px: 56 },
  { token: 'spacing-15', rem: '3.75rem', px: 60 },
  { token: 'spacing-16', rem: '4rem', px: 64 },
];

function SpacingRow({ item }: { item: SpacingItem }) {
  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="body2-regular flex flex-wrap items-center gap-2 text-gray-600">
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-900">{item.token}</code>
        <span>•</span>
        <span>{item.rem}</span>
        <span>•</span>
        <span>{item.px}px</span>
      </div>

      <div
        className="shrink-0 rounded-md bg-gray-900"
        style={{
          width: item.rem,
          height: '1rem',
          minWidth: item.px === 0 ? '1px' : undefined,
        }}
      />
    </div>
  );
}

function SpacingPreview({ items }: { items: SpacingItem[] }) {
  return (
    <section className="rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="title2-bold">Spacing</h2>
      </div>

      <div>
        {items.map((item, index) => (
          <div key={item.token}>
            <SpacingRow item={item} />
            {index !== items.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export const AllSpacing: Story = {
  render: () => <SpacingPreview items={spacingItems} />,
};
