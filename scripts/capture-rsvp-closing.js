const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/i/df2026a1b2c3d4e5f60718293a4b5c6d';
const artifactDir = 'C:\\Users\\Najip\\.gemini\\antigravity\\brain\\add89a44-31c8-4b18-99b3-21df3c1cd72a';

async function capture() {
  console.log('Launching browser to capture transition from RSVP to Closing...');
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

  // La penúltima sección debe ser RSVP y la última debe ser Closing
  const rsvpSec = sections[sections.length - 2];
  const closingSec = sections[sections.length - 1];

  if (rsvpSec && closingSec) {
    // Scroll so that the bottom of RSVP and top of Closing are visible together in the viewport
    await closingSec.scrollIntoView();
    // Scroll up slightly so the transition is perfectly centered in viewport
    await page.evaluate(() => {
      window.scrollBy({ top: -300, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));

    const transitionPath = path.join(artifactDir, 'mobile-rsvp-to-closing.png');
    await page.screenshot({ path: transitionPath });
    console.log(`Captured transition viewport -> ${transitionPath}`);

    // Capturar también la sección de despedida completa
    await closingSec.scrollIntoView();
    await new Promise(r => setTimeout(r, 800));
    const closingPath = path.join(artifactDir, 'mobile-sec-closing-clean.png');
    await closingSec.screenshot({ path: closingPath });
    console.log(`Captured closing section -> ${closingPath}`);
  }

  await browser.close();
  console.log('Done!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
