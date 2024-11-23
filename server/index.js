const puppeteer = require('puppeteer');

const test = async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: false,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();

  await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });

  await page.type('::-p-xpath(/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea)', 'Hello World')

  await page.setViewport({ width: 1080, height: 1024 });


  await browser.close();
}

test()
