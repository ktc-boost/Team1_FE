export const IMAGE_VARIANTS = {
  hero: {
    description: '레이아웃을 차지하는 이미지',
    formats: ['webp'],
    widths: [640, 960, 1280, 1920],
  },

  standard: {
    description: '카드/리스트용 콘텐츠 이미지',
    formats: ['webp'],
    widths: [96, 128, 192, 256, 384, 480, 512],
  },

  icon: {
    description: '아이콘, 아바타 등 고정 크기 이미지',
    formats: ['webp'],
    widths: [16, 24, 32, 48, 64, 72],
  },
} as const;

export type ImageVariant = keyof typeof IMAGE_VARIANTS;
