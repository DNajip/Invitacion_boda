const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/i/e84920fc11823a9b7cd491e02847aef1';
const artifactDir = 'C:\\Users\\Najip\\.gemini\\antigravity\\brain\\add89a44-31c8-4b18-99b3-21df3c1cd72a';

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Mobile Viewport: 390x844 (iPhone 14 style, DPR 2)
  console.log('Configuring mobile view (390x844)...');
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Portada (Sección 00)
  await page.screenshot({
    path: path.join(artifactDir, 'section-00-mobile.png'),
    fullPage: false
  });
  console.log('Saved: section-00-mobile.png');

  // 2. Sección 01 y 02 (Bienvenida y Cuenta Regresiva)
  await page.evaluate(() => {
    window.scrollTo(0, 850);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, 'sections-01-02-mobile.png'),
    fullPage: false
  });
  console.log('Saved: sections-01-02-mobile.png');

  // 3. Sección 03 y 04 (Ceremonia, Recepción y Detalles)
  await page.evaluate(() => {
    window.scrollTo(0, 2000);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, 'sections-03-04-mobile.png'),
    fullPage: false
  });
  console.log('Saved: sections-03-04-mobile.png');

  // 4. Sección 05 y 06 (Dresscode y RSVP)
  await page.evaluate(() => {
    window.scrollTo(0, 3100);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, 'sections-05-06-mobile.png'),
    fullPage: false
  });
  console.log('Saved: sections-05-06-mobile.png');

  // 5. Sección 07 y 08 (Mesas y Despedida con Arco Floral)
  await page.evaluate(() => {
    window.scrollTo(0, 4200);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, 'sections-07-08-mobile.png'),
    fullPage: false
  });
  console.log('Saved: sections-07-08-mobile.png');

  // 6. Full Mobile Page
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(artifactDir, 'full-page-mobile.png'),
    fullPage: true
  });
  console.log('Saved: full-page-mobile.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
