import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/shared/components/shadcn/separator';

const meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ColorItem = {
  label: string;
  token: string;
};

type ColorSpec = {
  value: string;
};

function ColorSwatch({ item }: { item: ColorItem }) {
  const [spec, setSpec] = useState<ColorSpec>({
    value: '',
  });

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const value = styles.getPropertyValue(item.token).trim();

    setSpec({ value });
  }, [item.token]);

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="h-12 w-12 shrink-0 rounded-xl"
          style={{ backgroundColor: `var(${item.token})` }}
        />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="body1-bold text-text-default">{item.label}</span>
          <code className="caption1-regular text-text-sub">{item.token}</code>
        </div>
      </div>

      <div className="label2-regular shrink-0 text-text-sub">{spec.value}</div>
    </div>
  );
}

function ColorSection({ title, items }: { title: string; items: ColorItem[] }) {
  return (
    <section className="rounded-2xl border-gray-300 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="title2-bold text-text-default">{title}</h2>
      </div>

      <div>
        {items.map((item, index) => (
          <div key={item.token}>
            <ColorSwatch item={item} />
            {index !== items.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

const boostBlueItems: ColorItem[] = [
  { label: 'Boost Blue Light', token: '--color-boost-blue-light' },
  { label: 'Boost Blue Hover', token: '--color-boost-blue-hover' },
  { label: 'Boost Blue', token: '--color-boost-blue' },
  { label: 'Boost Blue Pressed', token: '--color-boost-blue-pressed' },
  { label: 'Boost Blue Dark', token: '--color-boost-blue-dark' },
];

const boostOrangeItems: ColorItem[] = [
  { label: 'Boost Orange Light', token: '--color-boost-orange-light' },
  { label: 'Boost Orange Hover', token: '--color-boost-orange-hover' },
  { label: 'Boost Orange', token: '--color-boost-orange' },
  { label: 'Boost Orange Pressed', token: '--color-boost-orange-pressed' },
  { label: 'Boost Orange Dark', token: '--color-boost-orange-dark' },
];

const boostYellowItems: ColorItem[] = [
  { label: 'Boost Yellow Light', token: '--color-boost-yellow-light' },
  { label: 'Boost Yellow Hover', token: '--color-boost-yellow-hover' },
  { label: 'Boost Yellow', token: '--color-boost-yellow' },
  { label: 'Boost Yellow Pressed', token: '--color-boost-yellow-pressed' },
  { label: 'Boost Yellow Dark', token: '--color-boost-yellow-dark' },
];

const grayItems: ColorItem[] = [
  { label: 'Gray 100', token: '--color-gray-100' },
  { label: 'Gray 200', token: '--color-gray-200' },
  { label: 'Gray 300', token: '--color-gray-300' },
  { label: 'Gray 400', token: '--color-gray-400' },
  { label: 'Gray 500', token: '--color-gray-500' },
  { label: 'Gray 600', token: '--color-gray-600' },
  { label: 'Gray 700', token: '--color-gray-700' },
  { label: 'Gray 800', token: '--color-gray-800' },
  { label: 'Gray 900', token: '--color-gray-900' },
  { label: 'Gray 1000', token: '--color-gray-1000' },
];

const redItems: ColorItem[] = [
  { label: 'Red 50', token: '--color-red-50' },
  { label: 'Red 100', token: '--color-red-100' },
  { label: 'Red 200', token: '--color-red-200' },
  { label: 'Red 300', token: '--color-red-300' },
  { label: 'Red 400', token: '--color-red-400' },
  { label: 'Red 500', token: '--color-red-500' },
  { label: 'Red 600', token: '--color-red-600' },
];

const statusItems: ColorItem[] = [
  { label: 'Info', token: '--color-status-info' },
  { label: 'Success', token: '--color-status-success' },
  { label: 'Warning', token: '--color-status-warning' },
  { label: 'Error', token: '--color-status-error' },
];

const avatarItems: ColorItem[] = [
  { label: 'Avatar Blue', token: '--color-avatar-blue' },
  { label: 'Avatar Orange', token: '--color-avatar-orange' },
  { label: 'Avatar Yellow', token: '--color-avatar-yellow' },
  { label: 'Avatar Red', token: '--color-avatar-red' },
  { label: 'Avatar Pink', token: '--color-avatar-pink' },
  { label: 'Avatar Green', token: '--color-avatar-green' },
  { label: 'Avatar Purple', token: '--color-avatar-purple' },
  { label: 'Avatar Gray', token: '--color-avatar-gray' },
];

const backgroundItems: ColorItem[] = [
  { label: 'Background Default', token: '--color-background-default' },
  { label: 'Background Secondary', token: '--color-background-secondary' },
  { label: 'Background Tertiary', token: '--color-background-tertiary' },
  { label: 'Background Overlay', token: '--color-background-overlay' },
];

const textItems: ColorItem[] = [
  { label: 'Text Default', token: '--color-text-default' },
  { label: 'Text Sub', token: '--color-text-sub' },
  { label: 'Text Disabled', token: '--color-text-disabled' },
  { label: 'Text Placeholder', token: '--color-text-placeholder' },
];

const outlineItems: ColorItem[] = [
  { label: 'Outline Default', token: '--color-outline-default' },
  { label: 'Outline Disabled', token: '--color-outline-disabled' },
];

export const Brand: Story = {
  render: () => (
    <div className="space-y-8">
      <ColorSection title="Boost Blue" items={boostBlueItems} />
      <ColorSection title="Boost Orange" items={boostOrangeItems} />
      <ColorSection title="Boost Yellow" items={boostYellowItems} />
    </div>
  ),
};

export const GrayScale: Story = {
  render: () => <ColorSection title="Gray Scale" items={grayItems} />,
};

export const RedScale: Story = {
  render: () => <ColorSection title="Red Scale" items={redItems} />,
};

export const Status: Story = {
  render: () => <ColorSection title="Status Colors" items={statusItems} />,
};

export const Avatar: Story = {
  render: () => <ColorSection title="Avatar Colors" items={avatarItems} />,
};

export const Alias: Story = {
  render: () => (
    <div className="space-y-8">
      <ColorSection title="Background Colors" items={backgroundItems} />
      <ColorSection title="Text Colors" items={textItems} />
      <ColorSection title="Outline Colors" items={outlineItems} />
    </div>
  ),
};
