import fs from 'fs';
import sharp from 'sharp';
import { formatKB } from './convert-utils';
import { IMAGE_CONVERT_MESSAGES } from './convert-message';
import { ImageVariant } from './image-variants';
import { QUALITY, VARIANT_DIR } from './convert-constants';

interface ConvertOneProps {
  inputPath: string;
  outputPath: string;
  outputWidth: number;
  format: string;
  originalStat: fs.Stats;
  originalMeta: sharp.Metadata;
  domain: string;
  file?: string;
  name: string;
  variantKey: ImageVariant;
}

export async function convertOne({
  inputPath,
  outputPath,
  outputWidth,
  format,
  originalStat,
  originalMeta,
  domain,
  name,
  variantKey,
}: ConvertOneProps): Promise<string> {
  const info = await sharp(inputPath)
    .resize({ width: outputWidth, fit: 'inside', withoutEnlargement: true })
    .toFormat(format as keyof sharp.FormatEnum, { quality: QUALITY })
    .toFile(outputPath);

  const rate = ((1 - info.size / originalStat.size) * 100).toFixed(1);
  const sizeInfo = `${formatKB(originalStat.size)} → ${formatKB(info.size)} (-${rate}%)`;
  const dimInfo = `${originalMeta.width}×${originalMeta.height} → ${info.width}×${info.height}`;

  return IMAGE_CONVERT_MESSAGES.CONVERT_SUCCESS(
    domain,
    name,
    variantKey,
    outputWidth,
    format,
    dimInfo,
    sizeInfo,
  );
}

export { VARIANT_DIR };
