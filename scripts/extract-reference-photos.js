const sharp = require(require('path').resolve(process.cwd(), 'node_modules/sharp'));
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/Najip/.gemini/antigravity/brain/add89a44-31c8-4b18-99b3-21df3c1cd72a/.user_uploaded/';
const destDir = path.resolve(process.cwd(), 'public/images/wedding/redesign/photos');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function extract() {
  // Ref 6: Dresscode couple
  const ref6 = path.join(uploadDir, 'media_1795712357857.jpg');
  if (fs.existsSync(ref6)) {
    // Crop couple photo: x: 133, y: 204, width: 310, height: 326
    await sharp(ref6)
      .extract({ left: 130, top: 204, width: 316, height: 328 })
      .webp({ quality: 92 })
      .toFile(path.join(destDir, 'dresscode-couple.webp'));
    console.log('Extracted dresscode-couple.webp');
  }

  // Ref 4: Church and Reception
  const ref4 = path.join(uploadDir, 'media_1795712345865.jpg');
  if (fs.existsSync(ref4)) {
    // Church: left: 80, top: 226, width: 416, height: 134
    await sharp(ref4)
      .extract({ left: 78, top: 224, width: 420, height: 136 })
      .webp({ quality: 92 })
      .toFile(path.join(destDir, 'church-venue.webp'));
    console.log('Extracted church-venue.webp');

    // Reception: left: 80, top: 590, width: 416, height: 134
    await sharp(ref4)
      .extract({ left: 78, top: 588, width: 420, height: 136 })
      .webp({ quality: 92 })
      .toFile(path.join(destDir, 'reception-venue.webp'));
    console.log('Extracted reception-venue.webp');
  }
}

extract().catch(console.error);
