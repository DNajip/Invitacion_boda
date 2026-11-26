const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generate() {
  const inputSeal = path.join(__dirname, '..', 'imagenes', 'Sello de cera dorado D & F..png');
  const publicImages = path.join(__dirname, '..', 'public', 'images');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  if (!fs.existsSync(publicImages)) {
    fs.mkdirSync(publicImages, { recursive: true });
  }

  console.log('Generating OG Image and App Icons from Gold Wax Seal...');

  // 1. OG Image (600x600 px) with deep royal blue background (#08192D)
  // WhatsApp displays square 1:1 thumbnails in chat messages!
  const canvasSize = 600;
  const sealSize = 480;

  const sealResized = await sharp(inputSeal)
    .resize(sealSize, sealSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Create deep navy background canvas
  const og600Buffer = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 8, g: 25, b: 45, alpha: 1 } // #08192D
    }
  })
  .composite([
    {
      input: sealResized,
      gravity: 'centre'
    }
  ])
  .png({ quality: 95 })
  .toBuffer();

  const ogOutputPath = path.join(publicImages, 'og-wax-seal.png');
  fs.writeFileSync(ogOutputPath, og600Buffer);
  console.log('Created:', ogOutputPath);

  // Also write to src/app/opengraph-image.png (Next.js App Router default OG)
  const appOgPath = path.join(appDir, 'opengraph-image.png');
  fs.writeFileSync(appOgPath, og600Buffer);
  console.log('Created:', appOgPath);

  // 2. Square icon with transparent background (512x512) for browser tab / PWA
  const icon512 = await sharp(inputSeal)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(appDir, 'icon.png'));
  console.log('Created: src/app/icon.png');

  // 3. Apple Touch Icon (180x180) with navy background for iOS bookmarks
  const seal150 = await sharp(inputSeal)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 8, g: 25, b: 45, alpha: 1 }
    }
  })
  .composite([{ input: seal150, gravity: 'centre' }])
  .png()
  .toFile(path.join(appDir, 'apple-icon.png'));
  console.log('Created: src/app/apple-icon.png');

  // 4. Overwrite favicon.ico with a 64x64 PNG encoded as ICO or small icon
  // In Next.js, a 48x48 / 64x64 PNG as favicon.ico works across modern browsers
  await sharp(inputSeal)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(appDir, 'favicon.ico'));
  console.log('Created: src/app/favicon.ico');

  console.log('All icons and OG images generated successfully!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
