const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputSheet = 'C:/Users/Najip/.gemini/antigravity/brain/add89a44-31c8-4b18-99b3-21df3c1cd72a/.user_uploaded/media_1795509420405.jpg';
const outDir = path.join(__dirname, '../public/images/assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function isCheckerboard(r, g, b) {
  const isNeutral = Math.abs(r - g) <= 8 && Math.abs(r - b) <= 8 && Math.abs(g - b) <= 8;
  const isWhite = isNeutral && r >= 235;
  const isGrey = isNeutral && r >= 190 && r <= 220;
  return isWhite || isGrey;
}

// Flood fill from borders to remove background without touching interior white objects
async function cleanBackground(rawBuffer, width, height, channels) {
  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);
  const queue = [];

  // Enqueue all boundary pixels that match checkerboard
  for (let x = 0; x < width; x++) {
    // top
    const idxTop = x;
    if (isCheckerboard(rawBuffer[idxTop * channels], rawBuffer[idxTop * channels + 1], rawBuffer[idxTop * channels + 2])) {
      visited[idxTop] = 1;
      isBg[idxTop] = 1;
      queue.push(idxTop);
    }
    // bottom
    const idxBottom = (height - 1) * width + x;
    if (isCheckerboard(rawBuffer[idxBottom * channels], rawBuffer[idxBottom * channels + 1], rawBuffer[idxBottom * channels + 2])) {
      visited[idxBottom] = 1;
      isBg[idxBottom] = 1;
      queue.push(idxBottom);
    }
  }

  for (let y = 0; y < height; y++) {
    // left
    const idxLeft = y * width;
    if (!visited[idxLeft] && isCheckerboard(rawBuffer[idxLeft * channels], rawBuffer[idxLeft * channels + 1], rawBuffer[idxLeft * channels + 2])) {
      visited[idxLeft] = 1;
      isBg[idxLeft] = 1;
      queue.push(idxLeft);
    }
    // right
    const idxRight = y * width + (width - 1);
    if (!visited[idxRight] && isCheckerboard(rawBuffer[idxRight * channels], rawBuffer[idxRight * channels + 1], rawBuffer[idxRight * channels + 2])) {
      visited[idxRight] = 1;
      isBg[idxRight] = 1;
      queue.push(idxRight);
    }
  }

  // BFS
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1,
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        visited[n] = 1;
        const r = rawBuffer[n * channels];
        const g = rawBuffer[n * channels + 1];
        const b = rawBuffer[n * channels + 2];
        if (isCheckerboard(r, g, b)) {
          isBg[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  // Create RGBA buffer
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    out[i * 4] = rawBuffer[i * channels];
    out[i * 4 + 1] = rawBuffer[i * channels + 1];
    out[i * 4 + 2] = rawBuffer[i * channels + 2];
    out[i * 4 + 3] = isBg[i] ? 0 : 255;
  }

  return out;
}

async function extractAndClean(crop, filename) {
  const { data, info } = await sharp(inputSheet)
    .extract(crop)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = await cleanBackground(data, info.width, info.height, info.channels);

  const targetPath = path.join(outDir, filename);
  await sharp(cleaned, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ quality: 95 })
    .toFile(targetPath);

  console.log(`Extracted: ${filename} (${info.width}x${info.height})`);
}

async function run() {
  const assets = [
    { crop: { left: 10, top: 32, width: 355, height: 226 }, filename: 'envelope-closed.png' },
    { crop: { left: 368, top: 50, width: 175, height: 175 }, filename: 'wax-seal.png' },
    { crop: { left: 558, top: 5, width: 232, height: 255 }, filename: 'envelope-open.png' },
    { crop: { left: 805, top: 5, width: 190, height: 290 }, filename: 'cotton-card.png' },
    { crop: { left: 0, top: 275, width: 360, height: 255 }, filename: 'floral-corner.png' },
    { crop: { left: 365, top: 245, width: 160, height: 155 }, filename: 'floral-small.png' },
    { crop: { left: 535, top: 270, width: 130, height: 170 }, filename: 'gold-branch.png' },
    { crop: { left: 185, top: 395, width: 325, height: 100 }, filename: 'gold-ribbon.png' },
    { crop: { left: 495, top: 420, width: 140, height: 90 }, filename: 'wedding-rings.png' },
    { crop: { left: 675, top: 270, width: 115, height: 195 }, filename: 'champagne-flutes.png' },
    { crop: { left: 775, top: 330, width: 220, height: 160 }, filename: 'gift-box.png' },
    { crop: { left: 5, top: 470, width: 460, height: 205 }, filename: 'floral-horizontal.png' },
    { crop: { left: 475, top: 515, width: 225, height: 50 }, filename: 'gold-divider-heart.png' },
    { crop: { left: 710, top: 490, width: 145, height: 95 }, filename: 'envelope-heart.png' },
    { crop: { left: 855, top: 490, width: 140, height: 95 }, filename: 'envelope-white.png' },
    { crop: { left: 695, top: 565, width: 305, height: 110 }, filename: 'fairy-lights.png' },
  ];

  for (const a of assets) {
    await extractAndClean(a.crop, a.filename);
  }
  console.log('All 16 high-res assets extracted successfully!');
}

run();
