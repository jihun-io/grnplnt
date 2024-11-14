import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import env from "./loadEnv.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, "..", "public", "optimized");
const originalDir = path.join(__dirname, "..", "public", "images");
const OUTPUT_JSON = path.join(process.cwd(), "public", "photoName.json");

const sizes = [640, 750, 828, 1080, 1200];
const formats = ["webp", "jpg"];

const WORKER_URL = env.CDN_URL;

// 파일명 매핑을 저장할 객체
let fileNameMapping = [];

async function getFileList() {
  const response = await fetch(`${WORKER_URL}/list-files`);
  if (!response.ok) {
    throw new Error(`Failed to fetch file list: ${response.statusText}`);
  }
  return await response.json();
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  return await response.arrayBuffer();
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function saveOriginalImage(imageBuffer, fileName) {
  const encodedFileName = fileName;
  const outputPath = path.join(originalDir, encodedFileName);
  if (await fileExists(outputPath)) {
    console.log(`Original already exists: ${fileName}`);
    return false;
  }
  await fs.writeFile(outputPath, Buffer.from(imageBuffer));
  console.log(`Saved original: ${fileName}`);

  // 파일명 매핑 추가
  fileNameMapping.push({
    title: path.parse(fileName).name,
    filename: encodedFileName,
  });

  return true;
}

async function optimizeImage(imageBuffer, fileName) {
  const image = sharp(Buffer.from(imageBuffer));
  const metadata = await image.metadata();

  let optimized = false;
  const encodedFileName = fileName;
  let generatedSizes = [];

  for (const size of sizes) {
    if (size > metadata.width) continue;

    let sizeGenerated = false;

    for (const format of formats) {
      const outputFileName = `${
        path.parse(encodedFileName).name
      }-${size}.${format}`;
      const outputPath = path.join(outputDir, outputFileName);

      if (await fileExists(outputPath)) {
        console.log(`Optimized version already exists: ${outputFileName}`);
        sizeGenerated = true;
        continue;
      }

      await image
        .resize(size)
        .toFormat(format, { quality: 95 })
        .toFile(outputPath);

      console.log(`Optimized: ${outputFileName}`);
      optimized = true;
      sizeGenerated = true;
    }

    if (sizeGenerated) {
      generatedSizes.push(size);
    }
  }

  return { optimized, generatedSizes };
}

// processFiles 함수 수정
async function processFiles(files) {
  for (const file of files) {
    // SVG 파일도 포함하도록 정규식 수정
    if (!/\.(jpg|jpeg|png|webp|svg)$/i.test(file.name)) continue;

    console.log(`Processing: ${file.name}`);
    const isSvg = /\.svg$/i.test(file.name);
    const originalPath = path.join(originalDir, file.name);
    let imageBuffer;

    if (await fileExists(originalPath)) {
      console.log(`Using existing original: ${file.name}`);
      imageBuffer = await fs.readFile(originalPath);
    } else {
      console.log(`Downloading: ${file.name}`);
      imageBuffer = await downloadImage(`${WORKER_URL}${file.url}`);
      await saveOriginalImage(imageBuffer, file.name);
    }

    // SVG 파일은 최적화 건너뛰기
    if (!isSvg) {
      const { optimized, generatedSizes } = await optimizeImage(
        imageBuffer,
        file.name
      );

      if (!optimized) {
        console.log(`All optimized versions already exist for: ${file.name}`);
      }

      // 이미지 파일의 경우 크기 정보 포함
      fileNameMapping.push({
        title: path.parse(file.name).name,
        filename: file.name,
        sizes: generatedSizes,
      });
    } else {
      // SVG 파일의 경우 크기 정보 없이 저장
      fileNameMapping.push({
        title: path.parse(file.name).name,
        filename: file.name,
        type: "svg",
      });
    }
  }
}

async function saveFileNameMapping() {
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(fileNameMapping, null, 2));
  console.log(`File name mapping saved to ${OUTPUT_JSON}`);
}

async function main() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    await fs.mkdir(originalDir, { recursive: true });

    console.log("Fetching file list from Cloudflare Worker...");
    const files = await getFileList();
    console.log(`Found ${files.length} files.`);

    await processFiles(files);
    await saveFileNameMapping();
    console.log("Image optimization completed successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
