const sharp = require(require('path').resolve(process.cwd(), 'node_modules/sharp'));
const path = require('path');

const framesDir = path.resolve(process.cwd(), 'public/images/wedding/redesign/frames');

async function fixSeams() {
  for (const name of ['frame-rect-gold-clean.webp', 'frame-arch-gold-clean.webp']) {
    const filePath = path.join(framesDir, name);
    const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const midY = Math.floor(height / 2);

    // In a band of 6 pixels around midY (-3 to +3), interpolate between Y = midY - 4 and Y = midY + 4
    const yTop = midY - 6;
    const yBottom = midY + 6;

    for (let x = 0; x < width; x++) {
      // Find where the alpha or golden border is on the left and right sides
      if ((x > 20 && x < 80) || (x > width - 80 && x < width - 20)) {
        for (let y = yTop; y <= yBottom; y++) {
          const factor = (y - yTop) / (yBottom - yTop);
          const idxTop = (yTop * width + x) * channels;
          const idxBottom = (yBottom * width + x) * channels;
          const idxCurr = (y * width + x) * channels;

          for (let c = 0; c < channels; c++) {
            data[idxCurr + c] = Math.round(data[idxTop + c] * (1 - factor) + data[idxBottom + c] * factor);
          }
        }
      }
    }

    const tmpPath = filePath + '.tmp.webp';
    await sharp(data, { raw: { width, height, channels } })
      .webp({ quality: 92 })
      .toFile(tmpPath);
    
    // Replace original
    const fs = require('fs');
    fs.unlinkSync(filePath);
    fs.renameSync(tmpPath, filePath);
    console.log(`Smoothed ${name}`);
  }
}

fixSeams().catch(console.error);
