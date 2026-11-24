const sharp = require('sharp');
const path = require('path');

const inputMaster = 'C:/Users/Najip/.gemini/antigravity/brain/add89a44-31c8-4b18-99b3-21df3c1cd72a/.user_uploaded/media_1795509033077.jpg';
const outDir = path.join(__dirname, '../public/images/assets');

async function extractPhotos() {
  // 1. Pareja elegante Dresscode (Sección 05)
  await sharp(inputMaster)
    .extract({ left: 472, top: 445, width: 190, height: 148 })
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'dresscode-couple.webp'));

  // 2. Capilla / Iglesia (Sección 03)
  await sharp(inputMaster)
    .extract({ left: 24, top: 452, width: 110, height: 116 })
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'church-photo.webp'));

  // 3. Recepción Banquete (Sección 03)
  await sharp(inputMaster)
    .extract({ left: 24, top: 602, width: 110, height: 122 })
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'reception-photo.webp'));

  // 4. Farol colgante nocturno (Sección 02)
  await sharp(inputMaster)
    .extract({ left: 636, top: 12, width: 44, height: 95 })
    .png()
    .toFile(path.join(outDir, 'hanging-lantern.png'));

  // 5. Arco floral de despedida (Sección 08)
  await sharp(inputMaster)
    .extract({ left: 468, top: 758, width: 196, height: 250 })
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'farewell-arch.webp'));

  // 6. Distribución de mesas cenital (Sección 07)
  await sharp(inputMaster)
    .extract({ left: 362, top: 878, width: 145, height: 110 })
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'table-layout-cenital.webp'));

  console.log('Photos extracted successfully!');
}

extractPhotos();
