const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/i/e84920fc11823a9b7cd491e02847aef1';
const artifactDir = 'C:\\Users\\Najip\\.gemini\\antigravity\\brain\\add89a44-31c8-4b18-99b3-21df3c1cd72a';

const devices = [
  {
    name: 'iPhone 15 Pro',
    width: 390,
    height: 844,
    dpr: 3,
    output: 'mobile-test-iphone-pro.png'
  },
  {
    name: 'Samsung Galaxy / Pixel (Android)',
    width: 360,
    height: 800,
    dpr: 2,
    output: 'mobile-test-android-galaxy.png'
  },
  {
    name: 'iPhone SE (Compact Screen)',
    width: 375,
    height: 667,
    dpr: 2,
    output: 'mobile-test-iphone-se.png'
  }
];

async function run() {
  console.log('--- Iniciando Matriz de Pruebas Móviles ---');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const dev of devices) {
    console.log(`\nProbando perfil: ${dev.name} (${dev.width}x${dev.height}, DPR: ${dev.dpr})...`);
    const page = await browser.newPage();
    await page.setViewport({
      width: dev.width,
      height: dev.height,
      deviceScaleFactor: dev.dpr,
      isMobile: true,
      hasTouch: true
    });

    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));

    // Verificar desbordamiento horizontal
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;
    console.log(`- ScrollWidth: ${scrollWidth}px, ClientWidth: ${clientWidth}px -> Desbordamiento Horizontal: ${hasHorizontalOverflow ? '⚠️ SÍ (Error)' : '✅ NO (Perfecto)'}`);

    // Capturar portada de la sección 0 en este dispositivo
    const sec0 = await page.$('section');
    if (sec0) {
      await sec0.screenshot({ path: path.join(artifactDir, dev.output) });
      console.log(`- Captura guardada: ${dev.output}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('\n--- Matriz de Pruebas Móviles Completada Exitosamente ---');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
