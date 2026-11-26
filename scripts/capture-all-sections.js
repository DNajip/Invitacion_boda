const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/i/df2026a1b2c3d4e5f60718293a4b5c6d';
const artifactDir = 'C:\\Users\\Najip\\.gemini\\antigravity\\brain\\add89a44-31c8-4b18-99b3-21df3c1cd72a';

const sectionNames = [
  'sec-00-cover',
  'sec-01-welcome',
  'sec-02-countdown',
  'sec-03-locations',
  'sec-04-details',
  'sec-05-dresscode',
  'sec-06-rsvp',
  'sec-07-closing'
];

async function capture() {
  console.log('Launching browser for individual section captures...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  // Abrir la invitación para revelar todas las secciones
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Abrir Invitación')) {
      await b.click();
      console.log('Opened invitation successfully.');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2200));

  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections on the page.`);

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    await sec.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    const name = sectionNames[i] || `sec-${i}`;
    const filename = `${name}.png`;
    const fullPath = path.join(artifactDir, filename);
    await sec.screenshot({ path: fullPath });
    console.log(`Captured Section ${i} -> ${filename}`);
  }

  await browser.close();
  console.log('All individual sections captured successfully!');
}

capture().catch(err => {
  console.error('Error during section capture:', err);
  process.exit(1);
});
