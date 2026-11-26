const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/i/df2026a1b2c3d4e5f60718293a4b5c6d';

const viewports = [
  { name: 'mobile-small', width: 360, height: 740 },
  { name: 'iphone-std', width: 390, height: 844 },
  { name: 'iphone-max', width: 430, height: 932 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 }
];

async function testResponsive() {
  console.log('Testing responsive viewports...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      isMobile: vp.width < 768
    });

    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Verificar si hay overflow horizontal en el body/html
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}): Horizontal Overflow = ${hasHorizontalOverflow ? 'FAIL (has overflow)' : 'PASS (no overflow)'}`);
  }

  await browser.close();
  console.log('Responsive testing finished!');
}

testResponsive().catch(err => {
  console.error('Error during responsive testing:', err);
  process.exit(1);
});
