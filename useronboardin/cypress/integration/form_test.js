// form.spec_test.js created with Cypress
// cy.visit('http://localhost:1234')
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
  })
  describe('My First Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234')
    })

    const textInput = () => cy.get('input[name=username]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const checkboxInput = () => cy.get('input[name=agree]');
    const submitBtn = () => cy.get('button[id=submitBtn]');

    it('the proper elements are showing', () => {
        textInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        submitBtn().should('exist');
    })


  })