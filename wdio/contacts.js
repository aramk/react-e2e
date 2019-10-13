const {expect} = require('chai');

describe('Contacts', () => {
  it('should load', () => {
    browser.url('http://localhost:3000');
    const result = browser.react$('ContactItem');
    const text = result.getText();
    expect(text)
      .to.include('Abdul Gonzales')
      .to.include('(145) 551-5433')
      .to.include('592 Nulla St.')
      .to.include('Eugene')
  });
});
