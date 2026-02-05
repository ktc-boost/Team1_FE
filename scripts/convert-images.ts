import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * 실행 예:
 * pnpm img:webp
 * pnpm img:webp member-avatar
 * pnpm img:webp boost hero.png
 */

const BASE_DIR = path.resolve('src/shared/assets/images');

type ImageConfig = { type: 'square'; size: number } | { type: 'responsive'; maxWidth: number };

const IMAGE_CONFIG: Record<string, ImageConfig> = {
  'member-avatar': { type: 'square', size: 128 },
  boost: { type: 'responsive', maxWidth: 768 },
};

const QUALITY = 80;

const TARGET_DIR = process.argv[2];
const TARGET_FILE = process.argv[3];

const formatKB = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

(async function run() {
  const dirs = TARGET_DIR ? [TARGET_DIR] : Object.keys(IMAGE_CONFIG);

  for (const dir of dirs) {
    const config = IMAGE_CONFIG[dir];
    if (!config) {
      console.warn(`⚠️ 설정 없음: ${dir}`);
      continue;
    }

    const srcDir = path.join(BASE_DIR, dir, 'original');
    const outDir = path.join(BASE_DIR, dir, 'webp');

    if (!fs.existsSync(srcDir)) {
      console.warn(`⚠️ 폴더 없음: ${srcDir}`);
      continue;
    }

    fs.mkdirSync(outDir, { recursive: true });

    const files = TARGET_FILE ? [TARGET_FILE] : fs.readdirSync(srcDir);

    console.log(TARGET_FILE ? `🎯 Single mode: ${dir}/${TARGET_FILE}` : `📦 Batch mode: ${dir}`);

    for (const file of files) {
      if (!file.endsWith('.png')) continue;

      const inputPath = path.join(srcDir, file);
      if (!fs.existsSync(inputPath)) {
        console.error(`❌ 파일 없음: ${file}`);
        continue;
      }

      const outputPath = path.join(outDir, file.replace('.png', '.webp'));

      const originalStat = fs.statSync(inputPath);
      const image = sharp(inputPath);
      const originalMeta = await image.metadata();

      let pipeline = image;

      if (config.type === 'square') {
        pipeline = pipeline.resize(config.size, config.size, {
          fit: 'cover',
          position: 'center',
        });
      }

      if (config.type === 'responsive') {
        pipeline = pipeline.resize({
          width: config.maxWidth,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

      const resultStat = fs.statSync(outputPath);
      const resultMeta = await sharp(outputPath).metadata();

      const rate = ((1 - resultStat.size / originalStat.size) * 100).toFixed(1);

      console.log(`
┌────────────────────────────────────────
│ 📁 ${dir}
│ 🖼  ${file}
│
│ 원본   : ${originalMeta.width} × ${originalMeta.height}   ${formatKB(originalStat.size)}
│ 결과   : ${resultMeta.width} × ${resultMeta.height}   ${formatKB(resultStat.size)}
│ 압축률 : -${rate}%
└────────────────────────────────────────
`);
    }
  }

  console.log('🎉 이미지 변환 완료');
})();
