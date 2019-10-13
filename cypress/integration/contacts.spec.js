/// <reference types="Cypress" />

context('Contacts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Contact List', () => {
    it('should load contacts', () => {
      cy.get('.ContactListItems')
        .find('.ContactItem')
        .first()
        .should('contain', 'Abdul Gonzales')
        .should('contain', '(145) 551-5433')
        .should('contain', '592 Nulla St.')
        .should('contain', 'Eugene')
    });
  });
});
