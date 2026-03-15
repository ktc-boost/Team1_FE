import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { fn } from 'storybook/test';
import { Button, buttonVariantOptions, buttonSizeOptions } from '@/shared/components/shadcn/button';

const iconStoryArgTypes = {
  children: { control: false },
  size: { control: false },
  asChild: { control: false },
} as const;

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariantOptions,
    },
    size: {
      control: 'select',
      options: buttonSizeOptions,
    },
    asChild: {
      control: 'boolean',
    },
  },
  args: {
    children: '버튼',
    variant: 'defaultBoost',
    size: 'default',
    asChild: false,
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const DefaultBoost: Story = {
  args: {
    variant: 'defaultBoost',
    children: '생성하기',
  },
};

export const SecondaryBoost: Story = {
  args: {
    variant: 'secondaryBoost',
    children: '추가하기',
  },
};

export const OutlineBoost: Story = {
  args: {
    variant: 'outlineBoost',
    children: '자세히 보기',
  },
};

export const OutlineSecondaryBoost: Story = {
  args: {
    variant: 'outlineSecondaryBoost',
    children: '자세히 보기',
  },
};

export const Actions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="destructive">삭제하기</Button>
      <Button variant="ghost">더보기</Button>
      <Button variant="link">자세히 보기</Button>
    </div>
  ),
};

export const SizeSm: Story = {
  args: {
    size: 'sm',
    children: 'sm 버튼',
  },
};

export const SizeLg: Story = {
  args: {
    size: 'lg',
    children: 'lg 버튼',
  },
};

export const SizeIcon: Story = {
  argTypes: iconStoryArgTypes,
  render: (args) => (
    <Button {...args} size="icon" aria-label="추가">
      <Plus />
    </Button>
  ),
};

export const SizeIconSm: Story = {
  argTypes: iconStoryArgTypes,
  render: (args) => (
    <Button {...args} size="icon-sm" aria-label="추가">
      <Plus />
    </Button>
  ),
};

export const SizeIconLg: Story = {
  argTypes: iconStoryArgTypes,
  render: (args) => (
    <Button {...args} size="icon-lg" aria-label="추가">
      <Plus />
    </Button>
  ),
};
