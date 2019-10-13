const puppeteer = require('puppeteer');

describe('Contacts', () => {
  test('load', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000');
    await page.waitForSelector('.ContactItem');

    const html = await page.$eval('.ContactItem', e => e.innerHTML);
    expect(html).toEqual(expect.stringContaining('Abdul Gonzales'));

    browser.close();
  }, 16000);
});
