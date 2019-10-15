/// <reference types="Cypress" />

context('Contacts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Contact List', () => {
    it('should load contacts', () => {
      cy.get('.ContactListItems')
        .find('.ContactItem')
        .first()
        .should('contain', 'Abdul Gonzales')
        .should('contain', '(145) 551-5433')
        .should('contain', '592 Nulla St.')
        .should('contain', 'Eugene');
    });

    it('should create a contact', () => {
      cy.get('.ContactListAdd').click();
      cy.get('input[name="name"]').type('Tyrion Lannister');
      cy.get('input[name="phone"]').type('(571) 438-3991');
      cy.get('input[name="street"]').type('6840 Kingsroad Rd');
      cy.get('input[name="city"]').type('Casterly Rock');
      cy.get('button[type="submit"]').click();
      cy.contains('Tyrion Lannister').should('exist');
    });
  });
});
