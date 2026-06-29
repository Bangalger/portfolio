import sharp from "sharp";
import { existsSync, renameSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "assets", "perfil.jpeg");

if (!existsSync(source)) {
    console.log("skip: assets/perfil.jpeg not found");
    process.exit(0);
}

const input = await sharp(source).toBuffer();
const meta = await sharp(input).metadata();
const maxWidth = 800;
const width = meta.width && meta.width > maxWidth ? maxWidth : meta.width;
const pipeline = sharp(input).resize({ width, withoutEnlargement: true });

await pipeline.clone().webp({ quality: 82 }).toFile(join(root, "assets", "perfil.webp"));

const jpegTemp = join(root, "assets", "perfil.tmp.jpeg");
await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(jpegTemp);
renameSync(jpegTemp, source);

console.log(`optimized perfil.webp + perfil.jpeg (${width}px wide)`);
