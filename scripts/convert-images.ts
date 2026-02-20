import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { parseCliArgs } from './cli-args';
import { convertOne, VARIANT_DIR } from './converter';
import { validateWidth } from './convert-utils';
import { IMAGE_VARIANTS, ImageVariant } from './image-variants';
import { IMAGE_CONVERT_MESSAGES } from './convert-message';
import { ORIGINAL_DIR } from './convert-constants';

(async function run() {
  try {
    const rawArgs = process.argv.slice(2);
    const { TARGET_DOMAIN, TARGET_FILE, TARGET_VARIANT, TARGET_WIDTH, IS_FORCE_MODE } =
      parseCliArgs(rawArgs);

    let domains = TARGET_DOMAIN
      ? [TARGET_DOMAIN]
      : fs
          .readdirSync(ORIGINAL_DIR)
          .filter((d) => fs.statSync(path.join(ORIGINAL_DIR, d)).isDirectory());

    if (TARGET_FILE) {
      domains = domains.filter((d) => fs.existsSync(path.join(ORIGINAL_DIR, d, TARGET_FILE!)));
      if (domains.length === 0) {
        console.error(IMAGE_CONVERT_MESSAGES.FILE_NOT_FOUND(TARGET_FILE));
        process.exit(1);
      }
    }

    if (TARGET_WIDTH) {
      const variantKeys = TARGET_VARIANT
        ? [TARGET_VARIANT]
        : (Object.keys(IMAGE_VARIANTS) as ImageVariant[]);
      for (const variantKey of variantKeys) {
        validateWidth(variantKey, TARGET_WIDTH, !!TARGET_VARIANT, IS_FORCE_MODE);
      }
    }

    const tasks: Promise<string>[] = [];

    for (const domain of domains) {
      const srcDir = path.join(ORIGINAL_DIR, domain);
      const outDomainDir = path.join(VARIANT_DIR, domain);
      fs.mkdirSync(outDomainDir, { recursive: true });

      const files = TARGET_FILE ? [TARGET_FILE] : fs.readdirSync(srcDir);

      for (const file of files) {
        if (!file.endsWith('.png')) continue;

        const inputPath = path.join(srcDir, file);
        const name = path.basename(file, '.png');
        const outputBaseDir = path.join(outDomainDir, name);
        fs.mkdirSync(outputBaseDir, { recursive: true });

        const variantKeys = TARGET_VARIANT
          ? [TARGET_VARIANT]
          : (Object.keys(IMAGE_VARIANTS) as ImageVariant[]);

        tasks.push(
          (async () => {
            const originalStat = fs.statSync(inputPath);
            const originalMeta = await sharp(inputPath).metadata();
            if (!originalMeta.width) return '';

            const innerTasks: Promise<string>[] = [];
            const seen = new Set<string>();

            for (const variantKey of variantKeys) {
              const variant = IMAGE_VARIANTS[variantKey];
              const widths = TARGET_WIDTH ? [TARGET_WIDTH] : variant.widths;

              for (const width of widths) {
                const outputWidth = Math.min(width, originalMeta.width);

                for (const format of variant.formats) {
                  const key = `${variantKey}_${outputWidth}w.${format}`;
                  if (seen.has(key)) continue;
                  seen.add(key);

                  const outputPath = path.join(outputBaseDir, `${name}_${key}`);
                  innerTasks.push(
                    convertOne({
                      inputPath,
                      outputPath,
                      outputWidth,
                      format,
                      originalStat,
                      originalMeta,
                      domain,
                      name,
                      variantKey,
                    }),
                  );
                }
              }
            }

            const results = await Promise.allSettled(innerTasks);
            return results
              .map((r) =>
                r.status === 'fulfilled'
                  ? r.value
                  : IMAGE_CONVERT_MESSAGES.CONVERT_FAILED(
                      domain,
                      name,
                      (r as PromiseRejectedResult).reason,
                    ),
              )
              .join('\n');
          })(),
        );
      }
    }

    console.log(IMAGE_CONVERT_MESSAGES.CONVERT_START(tasks.length));

    const results = await Promise.allSettled(tasks);

    let successCount = 0;
    let failCount = 0;

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value) {
        for (const line of result.value.split('\n')) {
          if (!line.trim()) continue;
          if (line.includes('❌')) failCount++;
          else if (line.includes('✅')) successCount++;
          console.log(line);
        }
      } else if (result.status === 'rejected') {
        failCount++;
        console.error(IMAGE_CONVERT_MESSAGES.FILE_TASK_FAILED(result.reason));
      }
    }

    if (failCount > 0) {
      console.log(IMAGE_CONVERT_MESSAGES.FINISH_PARTIAL(successCount, failCount));
      process.exitCode = 1;
    } else {
      console.log(IMAGE_CONVERT_MESSAGES.FINISH_ALL(successCount));
    }
  } catch (error) {
    console.error(IMAGE_CONVERT_MESSAGES.UNEXPECTED_ERROR(error));
    process.exitCode = 1;
  } finally {
    if (process.exitCode === 1) console.error(IMAGE_CONVERT_MESSAGES.TERMINATED_WITH_ERROR);
  }
})();
