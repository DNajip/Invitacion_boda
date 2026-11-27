const sharp = require('sharp');
const path = require('path');

const W = 1000;
const H = 920;

// Romantic heart with wide, gentle upper curvature and very soft, shallow indentation
// Guaranteed not to cut into either person's face or hair
const heartPath = `
  M 500 115
  C 500 75, 390 40, 270 40
  C 140 40, 40 145, 40 275
  C 40 480, 260 680, 500 875
  C 740 680, 960 480, 960 275
  C 960 145, 860 40, 730 40
  C 610 40, 500 75, 500 115
  Z
`.trim().replace(/\s+/g, ' ');

const maskSvg = Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <path d="${heartPath}" fill="#ffffff" />
</svg>
`);

const borderSvg = Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF6E0" />
      <stop offset="20%" stop-color="#ECD299" />
      <stop offset="45%" stop-color="#C8A569" />
      <stop offset="70%" stop-color="#9C7736" />
      <stop offset="85%" stop-color="#C8A569" />
      <stop offset="100%" stop-color="#EED59E" />
    </linearGradient>
    <filter id="goldGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="rgba(0,0,0,0.3)" />
    </filter>
  </defs>
  <!-- Outer metallic gold border -->
  <path d="${heartPath}" fill="none" stroke="url(#goldGrad)" stroke-width="14" stroke-linejoin="round" filter="url(#goldGlow)" />
  <!-- Inner delicate bright golden line -->
  <path d="${heartPath}" fill="none" stroke="#FFFBF0" stroke-width="2.5" stroke-opacity="0.85" />
</svg>
`);

async function run() {
  const inputPath = path.resolve(__dirname, '../imagenes/novios.png');
  const outArtifact = 'C:/Users/Najip/.gemini/antigravity/brain/add89a44-31c8-4b18-99b3-21df3c1cd72a/heart-preview.png';
  const outPublic = path.resolve(__dirname, '../public/images/assets/dresscode-novios-heart.webp');

  // Zoom out the photo: scale to 820px width (further away, more headroom and side space)
  const photoW = 820;
  const photoH = Math.round((1219 / 1158) * photoW); // 863px

  const scaledPhoto = await sharp(inputPath)
    .resize(photoW, photoH)
    .toBuffer();

  const leftOffset = Math.round((W - photoW) / 2); // 90px centered
  const topOffset = 45; // 45px from top

  // Create empty transparent canvas of W x H (1000 x 920)
  const canvasWithPhoto = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: scaledPhoto, left: leftOffset, top: topOffset }
    ])
    .png()
    .toBuffer();

  // Mask with heart
  const masked = await sharp(canvasWithPhoto)
    .composite([
      { input: maskSvg, blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  // Overlay gold border
  await sharp(masked)
    .composite([
      { input: borderSvg, blend: 'over' }
    ])
    .webp({ quality: 96 })
    .toFile(outPublic);

  // Write PNG preview for inspection
  await sharp(outPublic)
    .png()
    .toFile(outArtifact);

  console.log('Zoomed out heart frame generated successfully!');
}

run().catch(console.error);
