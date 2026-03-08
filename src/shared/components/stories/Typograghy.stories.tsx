import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/shared/components/shadcn/separator';

const meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type TypographyItem = {
  className: string;
  sample: string;
};

type TypographySpec = {
  fontSizeRem: string;
  lineHeight: string;
  fontWeight: string;
};

function pxToRem(pxValue: string) {
  const numeric = Number.parseFloat(pxValue);

  if (Number.isNaN(numeric)) return pxValue;

  return `${numeric / 16}rem`;
}

function TypographyRow({ item }: { item: TypographyItem }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [spec, setSpec] = useState<TypographySpec>({
    fontSizeRem: '',
    lineHeight: '',
    fontWeight: '',
  });

  useEffect(() => {
    if (!textRef.current) return;

    const styles = window.getComputedStyle(textRef.current);
    const fontSizePx = styles.fontSize;

    setSpec({
      fontSizeRem: pxToRem(fontSizePx),
      lineHeight: styles.lineHeight,
      fontWeight: styles.fontWeight,
    });
  }, [item.className]);

  return (
    <div className="flex flex-col gap-1 py-6">
      <div className="flex gap-1">
        <div className="body2-regular flex flex-wrap items-center gap-2">
          <span>{spec.fontSizeRem}</span>
          <span>•</span>
          <span>{spec.lineHeight}</span>
          <span>•</span>
          <span>{spec.fontWeight}</span>
        </div>
      </div>

      <p ref={textRef} className={item.className}>
        {item.className} <br /> {item.sample}
      </p>
    </div>
  );
}

function TypographyPreview({ title, items }: { title?: string; items: TypographyItem[] }) {
  return (
    <section className="rounded-2xl border-b-gray-200 p-6 shadow-sm">
      {title ? (
        <div className="mb-6">
          <h2 className="title2-bold">{title}</h2>
        </div>
      ) : null}

      <div>
        {items.map((item, index) => (
          <div key={item.className}>
            <TypographyRow item={item} />
            {index !== items.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

const displayItems: TypographyItem[] = [
  {
    className: 'display1-bold',
    sample: '디자인 시스템 타이포그래피',
  },
  {
    className: 'display1-regular',
    sample: '디자인 시스템 타이포그래피',
  },
  {
    className: 'display2-bold',
    sample: '디자인 시스템 타이포그래피',
  },
  {
    className: 'display2-regular',
    sample: '디자인 시스템 타이포그래피',
  },
];

const titleItems: TypographyItem[] = [
  {
    className: 'title1-bold',
    sample: '프로젝트 제목 텍스트',
  },
  {
    className: 'title1-regular',
    sample: '프로젝트 제목 텍스트',
  },
  {
    className: 'title2-bold',
    sample: '섹션 제목 텍스트',
  },
  {
    className: 'title2-regular',
    sample: '섹션 제목 텍스트',
  },
];

const subtitleItems: TypographyItem[] = [
  {
    className: 'subtitle1-bold',
    sample: '보조 제목 텍스트',
  },
  {
    className: 'subtitle1-regular',
    sample: '보조 제목 텍스트',
  },
  {
    className: 'subtitle2-bold',
    sample: '보조 제목 텍스트',
  },
  {
    className: 'subtitle2-regular',
    sample: '보조 제목 텍스트',
  },
];

const bodyItems: TypographyItem[] = [
  {
    className: 'body1-bold',
    sample: '본문 텍스트입니다. 사용자가 읽는 기본 콘텐츠 영역에 사용합니다.',
  },
  {
    className: 'body1-regular',
    sample: '본문 텍스트입니다. 사용자가 읽는 기본 콘텐츠 영역에 사용합니다.',
  },
  {
    className: 'body2-bold',
    sample: '보조 본문 텍스트입니다.',
  },
  {
    className: 'body2-regular',
    sample: '보조 본문 텍스트입니다.',
  },
];

const labelItems: TypographyItem[] = [
  {
    className: 'label1-bold',
    sample: '버튼 / 입력 라벨',
  },
  {
    className: 'label1-regular',
    sample: '버튼 / 입력 라벨',
  },
  {
    className: 'label2-bold',
    sample: '작은 라벨 텍스트',
  },
  {
    className: 'label2-regular',
    sample: '작은 라벨 텍스트',
  },
];

const captionItems: TypographyItem[] = [
  {
    className: 'caption1-bold',
    sample: '보조 설명 텍스트',
  },
  {
    className: 'caption1-regular',
    sample: '보조 설명 텍스트',
  },
];

export const AllTypography: Story = {
  render: () => (
    <div className="space-y-10">
      <TypographyPreview title="Display" items={displayItems} />
      <TypographyPreview title="Title" items={titleItems} />
      <TypographyPreview title="Subtitle" items={subtitleItems} />
      <TypographyPreview title="Body" items={bodyItems} />
      <TypographyPreview title="Label" items={labelItems} />
      <TypographyPreview title="Caption" items={captionItems} />
    </div>
  ),
};

export const Display: Story = {
  render: () => <TypographyPreview title="Display" items={displayItems} />,
};

export const Title: Story = {
  render: () => <TypographyPreview title="Title" items={titleItems} />,
};

export const Subtitle: Story = {
  render: () => <TypographyPreview title="Subtitle" items={subtitleItems} />,
};

export const Body: Story = {
  render: () => <TypographyPreview title="Body" items={bodyItems} />,
};

export const Label: Story = {
  render: () => <TypographyPreview title="Label" items={labelItems} />,
};

export const Caption: Story = {
  render: () => <TypographyPreview title="Caption" items={captionItems} />,
};
