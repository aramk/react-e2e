let page;

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

function setPage(_page) {
  page = _page;
}

module.exports = {
  getElementTextBySelector,
  getElementText,
  getInputValue,
  clearInput,
  findElementByText,
  findChildElementByText,
  setPage,
}
