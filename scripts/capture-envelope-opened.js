const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/i/e84920fc11823a9b7cd491e02847aef1';
const artifactDir = 'C:\\Users\\Najip\\.gemini\\antigravity\\brain\\add89a44-31c8-4b18-99b3-21df3c1cd72a';

async function run() {
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
  await new Promise(r => setTimeout(r, 1500));

  const sec0 = await page.$('section');
  await sec0.screenshot({ path: path.join(artifactDir, 'sec-00-cover-closed.png') });
  console.log('Captured sec-00-cover-closed.png');

  // Click explicitly on the "Abrir Invitación" button or wax seal
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const openBtn = btns.find(b => b.textContent && b.textContent.includes('Abrir Invitación'));
    if (openBtn) {
      openBtn.click();
      return true;
    }
    return false;
  });
  console.log('Clicked Abrir Invitación button:', clicked);

  // Wait 1400ms for envelope opening and card emergence
  await new Promise(r => setTimeout(r, 1400));

  await sec0.screenshot({ path: path.join(artifactDir, 'sec-00-cover-opened.png') });
  console.log('Captured sec-00-cover-opened.png');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
