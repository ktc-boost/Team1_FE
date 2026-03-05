import { forwardRef } from 'react';
import { IMAGE_VARIANTS, type ImageVariant } from '@/shared/constants/imageVariants';

interface ImageProps {
  domain: string;
  name: string;
  variant: ImageVariant;
  width: number;
  height?: number;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      domain,
      name,
      variant,
      width,
      height,
      alt,
      className,
      loading = 'lazy',
      fetchPriority,
      sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },
    ref,
  ) => {
    const variantConfig = IMAGE_VARIANTS[variant];
    const allowedWidths: readonly number[] = variantConfig.widths;

    if (!allowedWidths.includes(width)) {
      const message =
        `[Image] invalid width ${width}px for variant "${variant}"\n` +
        `Allowed: ${allowedWidths.join(', ')}`;

      if (process.env.NODE_ENV !== 'production') throw new Error(message);
      else console.warn(message);
    }

    const basePath = `/images/${domain}/${name}`;
    const src = `${basePath}/${name}_${variant}_${width}w.webp`;

    const srcSet = variantConfig.widths
      .filter((w) => w <= width)
      .map((w) => `${basePath}/${name}_${variant}_${w}w.webp ${w}w`)
      .join(', ');

    return (
      <img
        ref={ref}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height ?? width}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    );
  },
);

export default Image;
