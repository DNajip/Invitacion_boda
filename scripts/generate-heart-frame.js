const sharp = require('sharp');
const path = require('path');

const W = 1000;
const H = 920;

// Romantic heart with wide, gentle upper curvature and shallow indentation
// Designed so the upper dip does not cut into either person's head
const heartPath = `
  M 500 135
  C 500 85, 395 45, 275 45
  C 145 45, 45 150, 45 280
  C 45 480, 260 680, 500 870
  C 740 680, 955 480, 955 280
  C 955 150, 855 45, 725 45
  C 605 45, 500 85, 500 135
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

  // Scale photo so both heads and surrounding lights have ample headroom
  // Original is 1158 x 1219 (aspect ~ 0.95)
  // We scale to 960 width x 1010 height (proportional, no distortion!)
  const photoW = 960;
  const photoH = Math.round((1219 / 1158) * photoW); // 1010

  // Resize and extract top 920px (faces are in the top-middle)
  const scaledPhoto = await sharp(inputPath)
    .resize(photoW, photoH)
    .extract({ left: 0, top: 0, width: photoW, height: 920 })
    .toBuffer();

  // Create empty transparent canvas of W x H (1000 x 920)
  // Place photo centered horizontally (left: (1000-960)/2 = 20)
  const canvasWithPhoto = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: scaledPhoto, left: 20, top: 0 }
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

  // Also write PNG for inspection
  await sharp(outPublic)
    .png()
    .toFile(outArtifact);

  console.log('New spacious heart frame generated successfully!');
}

run().catch(console.error);
