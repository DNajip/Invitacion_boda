const sharp = require(require('path').resolve(process.cwd(), 'node_modules/sharp'));
const path = require('path');

const framesDir = path.resolve(process.cwd(), 'public/images/wedding/redesign/frames');

async function createCleanRectFrame() {
  const input = path.join(framesDir, 'frame-rect-gold.webp');
  const meta = await sharp(input).metadata();
  const width = meta.width;   // 1024
  const height = meta.height; // 1536
  const halfW = Math.floor(width / 2); // 512
  const halfH = Math.floor(height / 2); // 768

  // In frame-rect-gold, the clean corners are:
  // Top-Right: x: 512..1024, y: 0..768
  // Bottom-Left: x: 0..512, y: 768..1536

  // 1. Extract clean Top-Right quadrant, flip horizontally to make clean Top-Left quadrant
  const cleanTR = await sharp(input).extract({ left: halfW, top: 0, width: width - halfW, height: halfH }).toBuffer();
  const cleanTL = await sharp(cleanTR).flop().toBuffer();

  // 2. Extract clean Bottom-Left quadrant, flip horizontally to make clean Bottom-Right quadrant
  const cleanBL = await sharp(input).extract({ left: 0, top: halfH, width: halfW, height: height - halfH }).toBuffer();
  const cleanBR = await sharp(cleanBL).flop().toBuffer();

  // 3. Composite all 4 clean quadrants together into frame-rect-gold-clean.webp
  await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: cleanTL, left: 0, top: 0 },
    { input: cleanTR, left: halfW, top: 0 },
    { input: cleanBL, left: 0, top: halfH },
    { input: cleanBR, left: halfW, top: halfH }
  ])
  .webp({ quality: 92 })
  .toFile(path.join(framesDir, 'frame-rect-gold-clean.webp'));

  console.log('Created frame-rect-gold-clean.webp successfully!');
}

async function createCleanArchFrame() {
  const input = path.join(framesDir, 'frame-arch-gold.webp');
  const meta = await sharp(input).metadata();
  const width = meta.width;   // 1024
  const height = meta.height; // 1536
  const halfW = Math.floor(width / 2);
  const halfH = Math.floor(height / 2);

  // In frame-arch-gold:
  // Top-Right is clean arch: x: 512..1024, y: 0..768
  // Bottom-Left is clean rounded corner: x: 0..512, y: 768..1536
  const cleanTR = await sharp(input).extract({ left: halfW, top: 0, width: width - halfW, height: halfH }).toBuffer();
  const cleanTL = await sharp(cleanTR).flop().toBuffer();

  const cleanBL = await sharp(input).extract({ left: 0, top: halfH, width: halfW, height: height - halfH }).toBuffer();
  const cleanBR = await sharp(cleanBL).flop().toBuffer();

  await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: cleanTL, left: 0, top: 0 },
    { input: cleanTR, left: halfW, top: 0 },
    { input: cleanBL, left: 0, top: halfH },
    { input: cleanBR, left: halfW, top: halfH }
  ])
  .webp({ quality: 92 })
  .toFile(path.join(framesDir, 'frame-arch-gold-clean.webp'));

  console.log('Created frame-arch-gold-clean.webp successfully!');
}

async function run() {
  await createCleanRectFrame();
  await createCleanArchFrame();
}

run().catch(console.error);
