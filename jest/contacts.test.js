const puppeteer = require('puppeteer');

describe('Contacts', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(16000);
    await page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  // TODO Move to utility function.

  async function getElementTextBySelector(selector) {
    return await getElementText(await page.$(selector));
  }

  async function getElementText($element) {
    return await $element.evaluate(element => element.innerText);
  }

  async function getInputValue($element) {
    return await $element.evaluate(element => element.value);
  }

  async function clearInput($input) {
    await $input.evaluate(element => element.value = '');
  }

  async function findElementByText($elements, query) {
    for (const $element of $elements) {
      const text = await getElementText($element);
      if (text != null && text.includes(query)) {
        return $element;
      }
    }
    return null;
  }

  async function findChildElementByText($rootElement, text) {
    const queue = [$rootElement];
    while (queue.length > 0) {
      const $element = queue.shift();
      const text = await $element.evaluate(em => em.innerText);
      if (text != null && text.includes(text)) {
        return $element;
      } else {
        const $children = await $element.$$('> *');
        for (const $child of $children) {
          queue.push($child);
        }
      }
    }
  }

  test('load', async () => {
    const text = await getElementTextBySelector('.ContactItem');
    expect(text).toEqual(expect.stringContaining('Abdul Gonzales'));
    expect(text).toEqual(expect.stringContaining('(145) 551-5433'));
    expect(text).toEqual(expect.stringContaining('592 Nulla St.'));
    expect(text).toEqual(expect.stringContaining('Eugene'));
  });

  test('create', async () => {
    await page.click('.ContactListAdd');
    const title = await getElementTextBySelector('h1');
    expect(title).toEqual('Create Contact');
    await page.type('input[name="name"]', 'Tyrion Lannister');
    await page.type('input[name="phone"]', '(571) 438-3991');
    await page.type('input[name="street"]', '6840 Kingsroad Rd');
    await page.type('input[name="city"]', 'Casterly Rock');
    await page.click('button[type="submit"]');

    const $list = await page.$('.ContactList');
    expect($list).toBeTruthy();
    const $item = await findElementByText(await $list.$$('.ContactItem'), 'Tyrion Lannister');
    expect($item).toBeTruthy();
  });

  test('edit', async () => {
    const $item = await findElementByText(await page.$$('.ContactItem'), 'Grady Bright');
    expect($item).toBeTruthy();
    await $item.click();
    const title = await getElementTextBySelector('h1');
    expect(title).toEqual('Edit Contact');

    const $name = await page.$('input[name="name"]');
    const $phone = await page.$('input[name="phone"]');
    const $street = await page.$('input[name="street"]');
    const $city = await page.$('input[name="city"]');

    expect(await getInputValue($name)).toBe('Grady Bright');
    expect(await getInputValue($phone)).toBe('(294) 717-1874');
    expect(await getInputValue($street)).toBe('Ap #832-3864 Sit Av.');
    expect(await getInputValue($city)).toBe('Germersheim');

    clearInput($name);
    clearInput($phone);
    clearInput($street);
    clearInput($city);

    await $name.type('Tyrion Lannister');
    await $phone.type('(571) 438-3991');
    await $street.type('6840 Kingsroad Rd');
    await $city.type('Casterly Rock');
    await page.click('button[type="submit"]');
    
    const $list = await page.$('.ContactList');
    expect($list).toBeTruthy();
    const $item2 = await findElementByText(await $list.$$('.ContactItem'), 'Tyrion Lannister');
    const newText = await getElementText($item2);
    expect(newText.includes('Tyrion Lannister')).toBe(true);
    expect(newText.includes('Grady Bright')).toBe(false);
  });
});
