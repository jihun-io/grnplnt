// scripts/optimize-images.js
import sharp from "sharp";
import { existsSync, mkdirSync, readdir } from "fs";
import { basename, extname, join } from "path";

const sizes = [640, 750, 828, 1080, 1200];
const imageDir = "public/images";
const outputDir = "public/optimized";

// 출력 디렉토리 생성
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// 이미지 최적화 함수
async function optimizeImage(file) {
  const filename = basename(file, extname(file));

  for (const size of sizes) {
    await sharp(join(imageDir, file))
      .resize(size, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({ quality: 100 }) // WebP 형식으로 변환
      .toFile(join(outputDir, `${filename}-${size}.webp`));
  }
}

// 이미지 디렉토리 처리
readdir(imageDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      optimizeImage(file);
    }
  });
});
