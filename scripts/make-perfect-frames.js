const sharp = require(require('path').resolve(process.cwd(), 'node_modules/sharp'));
const path = require('path');

const framesDir = path.resolve(process.cwd(), 'public/images/wedding/redesign/frames');

async function createPerfectFrames() {
  const rectInput = path.join(framesDir, 'frame-rect-gold.webp');
  const archInput = path.join(framesDir, 'frame-arch-gold.webp');

  // Rectangular frame
  const rMeta = await sharp(rectInput).metadata();
  const rW = rMeta.width;
  const rH = rMeta.height;
  const rHalfW = Math.floor(rW / 2);
  const rHalfH = Math.floor(rH / 2);

  // Clean quadrants:
  // TR: x: rHalfW .. rW, y: 0 .. rHalfH
  // BL: x: 0 .. rHalfW, y: rHalfH .. rH
  const rTR = await sharp(rectInput).extract({ left: rHalfW, top: 0, width: rW - rHalfW, height: rHalfH }).toBuffer();
  const rTL = await sharp(rTR).flop().toBuffer();

  const rBL = await sharp(rectInput).extract({ left: 0, top: rHalfH, width: rHalfW, height: rH - rHalfH }).toBuffer();
  const rBR = await sharp(rBL).flop().toBuffer();

  // Combine into buffer
  const rCombined = await sharp({
    create: { width: rW, height: rH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
  .composite([
    { input: rTL, left: 0, top: 0 },
    { input: rTR, left: rHalfW, top: 0 },
    { input: rBL, left: 0, top: rHalfH },
    { input: rBR, left: rHalfW, top: rHalfH }
  ])
  .raw()
  .toBuffer({ resolveWithObject: true });

  // Fix seam at rHalfH on the border columns
  const rData = rCombined.data;
  const midY = rHalfH;
  for (let x = 0; x < rW; x++) {
    if ((x > 15 && x < 85) || (x > rW - 85 && x < rW - 15)) {
      for (let y = midY - 8; y <= midY + 8; y++) {
        const factor = (y - (midY - 8)) / 16;
        const iTop = ((midY - 9) * rW + x) * 4;
        const iBot = ((midY + 9) * rW + x) * 4;
        const iCur = (y * rW + x) * 4;
        for (let c = 0; c < 4; c++) {
          rData[iCur + c] = Math.round(rData[iTop + c] * (1 - factor) + rData[iBot + c] * factor);
        }
      }
    }
  }

  await sharp(rData, { raw: { width: rW, height: rH, channels: 4 } })
    .webp({ quality: 92 })
    .toFile(path.join(framesDir, 'frame-rect-clean-perfect.webp'));

  console.log('Created frame-rect-clean-perfect.webp');

  // Arched frame
  const aMeta = await sharp(archInput).metadata();
  const aW = aMeta.width;
  const aH = aMeta.height;
  const aHalfW = Math.floor(aW / 2);
  const aHalfH = Math.floor(aH / 2);

  const aTR = await sharp(archInput).extract({ left: aHalfW, top: 0, width: aW - aHalfW, height: aHalfH }).toBuffer();
  const aTL = await sharp(aTR).flop().toBuffer();

  const aBL = await sharp(archInput).extract({ left: 0, top: aHalfH, width: aHalfW, height: aH - aHalfH }).toBuffer();
  const aBR = await sharp(aBL).flop().toBuffer();

  const aCombined = await sharp({
    create: { width: aW, height: aH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
  .composite([
    { input: aTL, left: 0, top: 0 },
    { input: aTR, left: aHalfW, top: 0 },
    { input: aBL, left: 0, top: aHalfH },
    { input: aBR, left: aHalfW, top: aHalfH }
  ])
  .raw()
  .toBuffer({ resolveWithObject: true });

  const aData = aCombined.data;
  for (let x = 0; x < aW; x++) {
    if ((x > 15 && x < 85) || (x > aW - 85 && x < aW - 15)) {
      for (let y = aHalfH - 8; y <= aHalfH + 8; y++) {
        const factor = (y - (aHalfH - 8)) / 16;
        const iTop = ((aHalfH - 9) * aW + x) * 4;
        const iBot = ((aHalfH + 9) * aW + x) * 4;
        const iCur = (y * aW + x) * 4;
        for (let c = 0; c < 4; c++) {
          aData[iCur + c] = Math.round(aData[iTop + c] * (1 - factor) + aData[iBot + c] * factor);
        }
      }
    }
  }

  await sharp(aData, { raw: { width: aW, height: aH, channels: 4 } })
    .webp({ quality: 92 })
    .toFile(path.join(framesDir, 'frame-arch-clean-perfect.webp'));

  console.log('Created frame-arch-clean-perfect.webp');
}

createPerfectFrames().catch(console.error);
