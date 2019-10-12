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
        .should('contain', 'Bethany Thornton')
        .should('contain', '(804) 849-5820')
    });
  });
})
