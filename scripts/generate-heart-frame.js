const sharp = require('sharp');
const path = require('path');

const W = 900;
const H = 840;

// Beautiful romantic heart path with generous top lobes for two faces
// Coordinates designed for 900x840
const heartPath = 'M 450 220 C 450 140, 350 70, 240 70 C 130 70, 50 160, 50 280 C 50 460, 250 630, 450 770 C 650 630, 850 460, 850 280 C 850 160, 770 70, 660 70 C 550 70, 450 140, 450 220 Z';

const maskSvg = Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <path d="${heartPath}" fill="#ffffff" />
</svg>
`);

const borderSvg = Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5DE" />
      <stop offset="25%" stop-color="#E8CA8C" />
      <stop offset="50%" stop-color="#C8A569" />
      <stop offset="75%" stop-color="#9C7736" />
      <stop offset="100%" stop-color="#D4B376" />
    </linearGradient>
    <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.3)" />
    </filter>
  </defs>
  <!-- Outer subtle shadow border -->
  <path d="${heartPath}" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linejoin="round" filter="url(#goldGlow)" />
  <!-- Inner thin gold hairline -->
  <path d="${heartPath}" fill="none" stroke="#FFF8E8" stroke-width="2.5" stroke-opacity="0.85" />
</svg>
`);

async function run() {
  const inputPath = path.resolve(__dirname, '../imagenes/novios.png');
  const outArtifact = 'C:/Users/Najip/.gemini/antigravity/brain/add89a44-31c8-4b18-99b3-21df3c1cd72a/heart-preview.png';
  const outPublic = path.resolve(__dirname, '../public/images/assets/dresscode-novios-heart.webp');

  // We want the photo cropped and scaled so both heads fit comfortably inside the heart lobes
  // In novios.png (1158x1219), faces are around y: 150-700
  const resizedPhoto = await sharp(inputPath)
    .resize(W, H, { fit: 'cover', position: sharp.position.top })
    .toBuffer();

  const masked = await sharp(resizedPhoto)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .toBuffer();

  const finalImage = await sharp(masked)
    .composite([{ input: borderSvg, blend: 'over' }])
    .webp({ quality: 96 })
    .toFile(outPublic);

  await sharp(outPublic)
    .png()
    .toFile(outArtifact);

  console.log('Heart frame generated successfully!');
}

run().catch(console.error);
