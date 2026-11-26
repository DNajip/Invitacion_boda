const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/assets/templates/romantic-garden');

const mapping = {
  'Sobre Azul Marino con Sello Dorado.png': 'envelope-closed.png',
  'Solapa superior independiente para la animación 3D.png': 'envelope-flap.png',
  'Cuerpo posterior y frontal del sobre..png': 'envelope-body.png',
  'Sello de cera dorado D & F..png': 'wax-seal.png',
  'Tarjeta interior sin texto..png': 'card-inner.png',
  'Composiciones florales blancas con hojas doradas.png': 'floral-composition.png',
  'Fondo de jardín nocturno..png': 'night-garden-bg.png',
  'Anillos matrimoniales..png': 'wedding-rings.png',
  'Cinta de satén dorada..png': 'gold-ribbon.png',
  'Copas de champaña..png': 'champagne-glasses.png',
  'Buzón de regalos..png': 'gift-mailbox.png',
  'Sobres blancos.png': 'white-envelopes.png',
  'Arco floral de despedida..png': 'floral-arch.png'
};

function readPngDimensions(buffer) {
  // PNG signature is 8 bytes. IHDR chunk starts at byte 12 (0x0C)
  // Width at offset 16 (4 bytes big-endian), Height at offset 20 (4 bytes big-endian)
  if (buffer.length > 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    const colorType = buffer.readUInt8(25);
    // colorType 6 is RGBA (Truecolor with alpha), colorType 2 is RGB, colorType 4 is Grayscale with alpha
    const hasAlpha = colorType === 6 || colorType === 4;
    return { width, height, hasAlpha };
  }
  return { width: 0, height: 0, hasAlpha: false };
}

function processFiles() {
  const inventory = [];
  for (const [orig, norm] of Object.entries(mapping)) {
    const origPath = path.join(dir, orig);
    const normPath = path.join(dir, norm);
    if (fs.existsSync(origPath)) {
      const buf = fs.readFileSync(origPath);
      const { width, height, hasAlpha } = readPngDimensions(buf);
      const stats = fs.statSync(origPath);

      // Copy to clean normalized filename
      fs.copyFileSync(origPath, normPath);

      inventory.push({
        original: orig,
        normalized: norm,
        width,
        height,
        format: 'PNG',
        hasAlpha,
        sizeKB: Math.round(stats.size / 1024),
        sizeMB: (stats.size / 1024 / 1024).toFixed(2)
      });
    }
  }

  console.log(JSON.stringify(inventory, null, 2));
}

processFiles();
