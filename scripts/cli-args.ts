import fs from 'fs';
import path from 'path';
import { IMAGE_CONVERT_MESSAGES } from './convert-message';
import { IMAGE_VARIANTS, ImageVariant } from '../src/shared/constants/imageVariants';
import { ORIGINAL_DIR } from './convert-constants';

export function parseCliArgs(rawArgs: string[]) {
  let TARGET_DOMAIN: string | undefined;
  let TARGET_FILE: string | undefined;
  let TARGET_VARIANT: ImageVariant | undefined;
  let TARGET_WIDTH: number | undefined;
  let IS_FORCE_MODE = false;

  for (const arg of rawArgs) {
    if (arg === '--force' || arg === '--unsafe') {
      IS_FORCE_MODE = true;
      continue;
    }

    if (arg.endsWith('.png')) {
      TARGET_FILE = arg;
      continue;
    }

    if (IMAGE_VARIANTS[arg as ImageVariant]) {
      TARGET_VARIANT = arg as ImageVariant;
      continue;
    }

    const n = Number(arg);
    if (Number.isInteger(n) && n > 0) {
      TARGET_WIDTH = n;
      continue;
    }

    const domainPath = path.join(ORIGINAL_DIR, arg);
    if (!TARGET_DOMAIN && fs.existsSync(domainPath) && fs.statSync(domainPath).isDirectory()) {
      TARGET_DOMAIN = arg;
      continue;
    }

    console.error(IMAGE_CONVERT_MESSAGES.UNKNOWN_ARG(arg));
    process.exit(1);
  }

  if (TARGET_WIDTH && !TARGET_VARIANT && !IS_FORCE_MODE) {
    console.error(IMAGE_CONVERT_MESSAGES.UNAUTHORIZED_WIDTH(TARGET_WIDTH));
    process.exit(1);
  }

  return { TARGET_DOMAIN, TARGET_FILE, TARGET_VARIANT, TARGET_WIDTH, IS_FORCE_MODE };
}
