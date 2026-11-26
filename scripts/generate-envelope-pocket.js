const sharp = require('sharp');

async function run() {
  const w = 803, h = 834;
  const maskSvg = Buffer.from(
    '<svg width="' + w + '" height="' + h + '">' +
    '<polygon points="0,322 300,548 503,548 ' + w + ',322 ' + w + ',' + h + ' 0,' + h + '" fill="white" />' +
    '</svg>'
  );

  await sharp('public/assets/templates/romantic-garden/envelope-open-full.png')
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .toFile('public/assets/templates/romantic-garden/envelope-pocket.png');

  console.log('envelope-pocket.png created successfully');
}

run();
