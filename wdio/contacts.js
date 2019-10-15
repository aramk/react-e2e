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
      .to.include('Eugene');
  });

  it('should create a contact', () => {
    browser.url('http://localhost:3000');
    $('.ContactListAdd').click();

    expect($('h1').getText()).to.equal('Create Contact');
    $('input[name="name"]').addValue('Tyrion Lannister');
    $('input[name="phone"]').addValue('(571) 438-3991');
    $('input[name="street"]').addValue('6840 Kingsroad Rd');
    $('input[name="city"]').addValue('Casterly Rock');
    $('button[type="submit"]').click();

    // TODO Assert that the value exists.
  });
});
