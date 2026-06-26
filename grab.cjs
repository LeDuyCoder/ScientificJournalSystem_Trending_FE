const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/dashboard', { waitUntil: 'networkidle0' });
  const html = await page.content();
  console.log(html);
  await browser.close();
})();
