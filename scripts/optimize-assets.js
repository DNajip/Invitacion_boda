const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = 'public/assets/templates/romantic-garden';
const normalizedFiles = [
  'envelope-closed.png',
  'envelope-open-full.png',
  'envelope-pocket.png',
  'envelope-flap.png',
  'card-inner.png',
  'wax-seal.png',
  'floral-composition.png',
  'night-garden-bg.png',
  'wedding-rings.png',
  'gold-ribbon.png',
  'champagne-glasses.png',
  'gift-mailbox.png',
  'white-envelopes.png',
  'floral-arch.png'
];

async function run() {
  console.log('--- Iniciando optimización fotorrealista WebP ---');
  let totalOrig = 0;
  let totalWebp = 0;

  for (const file of normalizedFiles) {
    const inputPath = path.join(targetDir, file);
    if (!fs.existsSync(inputPath)) continue;

    const baseName = file.replace(/\.png$/, '');
    const outputPath = path.join(targetDir, `${baseName}.webp`);

    const origSize = fs.statSync(inputPath).size;
    totalOrig += origSize;

    // Calidad 88 y esfuerzo 6 para máxima fidelidad visual y compresión óptima
    await sharp(inputPath)
      .webp({ quality: 88, effort: 6, alphaQuality: 92 })
      .toFile(outputPath);

    const webpSize = fs.statSync(outputPath).size;
    totalWebp += webpSize;

    const reduction = ((1 - webpSize / origSize) * 100).toFixed(1);
    console.log(
      `✓ ${file} (${(origSize / 1024 / 1024).toFixed(2)} MB) -> ${baseName}.webp (${(webpSize / 1024).toFixed(1)} KB) [-${reduction}%]`
    );
  }

  console.log('--------------------------------------------------');
  console.log(`Peso Original Total: ${(totalOrig / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Peso Optimizado WebP: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Ahorro Global de Datos: ${((1 - totalWebp / totalOrig) * 100).toFixed(1)}%`);
}

run().catch(err => {
  console.error('Error during asset optimization:', err);
  process.exit(1);
});
