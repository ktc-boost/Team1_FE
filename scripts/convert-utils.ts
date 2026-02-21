import { IMAGE_CONVERT_MESSAGES } from './convert-message';
import { IMAGE_VARIANTS, ImageVariant } from '../src/shared/constants/imageVariants';

export const formatKB = (bytes: number) => `${(bytes / 1024).toFixed(1)}KB`;

export function getAllowedWidths(variantKey: ImageVariant): readonly number[] {
  return IMAGE_VARIANTS[variantKey].widths;
}

export function validateWidth(
  variantKey: ImageVariant,
  width: number,
  isSpecificVariant: boolean,
  isForceMode: boolean,
) {
  if (isForceMode) return;

  const allowedWidths = getAllowedWidths(variantKey);
  if (!allowedWidths.includes(width)) {
    if (!isSpecificVariant) {
      const uniqueAllowed = [
        ...new Set(
          Object.values(IMAGE_VARIANTS)
            .flatMap((v) => v.widths)
            .sort((a, b) => a - b),
        ),
      ];
      console.error(IMAGE_CONVERT_MESSAGES.WIDTH_NOT_ALLOWED(width));
      console.error(IMAGE_CONVERT_MESSAGES.WIDTH_RULES(uniqueAllowed.join(', ')));
    } else {
      console.error(
        IMAGE_CONVERT_MESSAGES.VARIANT_WIDTH_MISMATCH(variantKey, width, allowedWidths.join(', ')),
      );
    }
    process.exit(1);
  }
}
