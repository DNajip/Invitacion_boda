const fs = require('fs');
const path = require('path');
const sharp = require(path.resolve(process.cwd(), 'node_modules/sharp'));

const srcDir = path.resolve(process.cwd(), 'imagenes/Rediseño Imagenes');
const baseDest = path.resolve(process.cwd(), 'public/images/wedding/redesign');

// Asset mapping: [Source filename, destination subfolder, target filename base, maxWidth/options]
const assetMappings = [
  // Backgrounds
  {
    src: 'Fondo azul noche con textura de papel premium, sin flores ni texto.png',
    dest: 'backgrounds/paper-dark-blue.webp',
    quality: 90
  },
  {
    src: 'Fondo blanco marfil con textura de papel fino, sin flores ni texto.png',
    dest: 'backgrounds/paper-ivory.webp',
    quality: 90
  },

  // Frames
  {
    src: 'Marco ornamental dorado con arco superior.png',
    dest: 'frames/frame-arch-gold.webp',
    quality: 90
  },
  {
    src: 'Marco rectangular dorado con esquinas ornamentales.png',
    dest: 'frames/frame-rect-gold.webp',
    quality: 90
  },

  // Corner floral arrangements
  {
    src: 'Composición floral para esquina superior izquierda, con rosas azules, lirios blancos, hortensias y ramas doradas.png',
    dest: 'floral/floral-corner-tl.webp',
    quality: 90
  },
  {
    src: 'Composición floral para esquina superior derecha.png',
    dest: 'floral/floral-corner-tr.webp',
    quality: 90
  },
  {
    src: 'Composición floral para esquina inferior izquierda.png',
    dest: 'floral/floral-corner-bl.webp',
    quality: 90
  },
  {
    src: 'Composición floral para esquina inferior derecha.png',
    dest: 'floral/floral-corner-br.webp',
    quality: 90
  },

  // Horizontal / Vertical floral arrangements
  {
    src: 'Composición floral horizontal con rosa azul central y ramas doradas.png',
    dest: 'floral/floral-header-horizontal.webp',
    quality: 90
  },
  {
    src: 'Composición floral vertical para decorar los bordes laterales.png',
    dest: 'floral/floral-side-vertical.webp',
    quality: 90
  },
  {
    src: 'Composición floral pequeña de rosa azul con flores blancas.png',
    dest: 'floral/floral-small-blue.webp',
    quality: 90
  },
  {
    src: 'Ornamento de esquina dorado con rosa azul.png',
    dest: 'floral/ornament-corner-blue-gold.webp',
    quality: 90
  },

  // Individual flowers & foliage
  {
    src: 'Rosa azul marino fotorrealista con hojas y tallo.png',
    dest: 'floral/rose-blue-stem.webp',
    quality: 90
  },
  {
    src: 'Rosa azul marino vista frontal, sin tallo.png',
    dest: 'floral/rose-blue-front.webp',
    quality: 90
  },
  {
    src: 'Lirio blanco fotorrealista.png',
    dest: 'floral/lily-white.webp',
    quality: 90
  },
  {
    src: 'Racimo de hortensias blancas.png',
    dest: 'floral/hydrangea-white.webp',
    quality: 90
  },

  // Gold branches & separators
  {
    src: 'Rama curva de hojas doradas para bordes laterales.png',
    dest: 'ornaments/branch-gold-curved-side.webp',
    quality: 90
  },
  {
    src: 'Rama individual de hojas doradas.png',
    dest: 'ornaments/branch-gold-single.webp',
    quality: 90
  },
  {
    src: 'Ramas doradas simétricas para acompañar títulos.png',
    dest: 'ornaments/branches-gold-symmetric.webp',
    quality: 90
  },
  {
    src: 'Separador dorado horizontal con rombo central.png',
    dest: 'ornaments/separator-gold-diamond.webp',
    quality: 90
  },
  {
    src: 'Separador floral horizontal con rosa azul y hojas doradas.png',
    dest: 'ornaments/separator-floral-blue.webp',
    quality: 90
  },
  {
    src: 'Ornamento caligráfico dorado estilo infinito..png',
    dest: 'ornaments/ornament-infinity-gold.webp',
    quality: 90
  },

  // Ribbons & Bows
  {
    src: 'Cinta ondulada de satén azul y dorado.png',
    dest: 'ornaments/ribbon-wave-blue-gold.webp',
    quality: 90
  },
  {
    src: 'Lazo de satén azul marino con bordes dorados.png',
    dest: 'ornaments/bow-blue-gold.webp',
    quality: 90
  },

  // Effects & Petals
  {
    src: 'Destello de luz dorada suave.png',
    dest: 'effects/sparkle-gold-soft.webp',
    quality: 90
  },
  {
    src: 'Pétalo individual de rosa azul.png',
    dest: 'effects/petal-blue-single.webp',
    quality: 90
  },
  {
    src: 'Conjunto de pétalos azules dispersos.png',
    dest: 'effects/petals-blue-scattered.webp',
    quality: 90
  }
];

async function main() {
  console.log('--- Optimizando los 27 recursos de rediseño a WebP ---');
  let totalOrig = 0;
  let totalWebp = 0;

  for (const item of assetMappings) {
    const srcPath = path.join(srcDir, item.src);
    const destPath = path.join(baseDest, item.dest);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARN] Archivo no encontrado: ${item.src}`);
      continue;
    }

    const origStat = fs.statSync(srcPath);
    totalOrig += origStat.size;

    await sharp(srcPath)
      .webp({ quality: item.quality || 90, effort: 6, alphaQuality: 95 })
      .toFile(destPath);

    const webpStat = fs.statSync(destPath);
    totalWebp += webpStat.size;

    const saved = ((1 - webpStat.size / origStat.size) * 100).toFixed(1);
    console.log(`✓ ${item.dest} (${(origStat.size / 1024 / 1024).toFixed(2)} MB -> ${(webpStat.size / 1024).toFixed(1)} KB, -${saved}%)`);
  }

  console.log('----------------------------------------------------');
  console.log(`Peso Original: ${(totalOrig / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Peso Optimizado: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Ahorro: ${((1 - totalWebp / totalOrig) * 100).toFixed(1)}%`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
