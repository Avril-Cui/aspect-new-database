describe('equilibrium transaction', () => {
  before(() => {
    cy.viewport(1440, 850)
    cy.visit('/auth/login')

    //log in:
    // cy.get("#user-email-login-entry").click()
    // .type('test_user@gmail.com')
    // .should('have.value','test_user@gmail.com')
    // .get("#user-email-password-entry")
    // .type('Testing123')
    // .should('have.value','Testing123')
    // cy.get("#submit-user-login").click();
    
    // sign up:
    cy.visit('/auth/signup')
    cy.get("#user-name-entry").click()
    .type('TestUser')
    .should('have.value','TestUser')
    .get("#user-email-entry")
    .type('test_user@gmail.com')
    .should('have.value','test_user@gmail.com')
    .get("#user-password-entry")
    .type('Testing123')
    .should('have.value','Testing123')
    cy.get("#submit-register-new-user").click();
  })
  it('buy stock with enough money and available shares', () => {
    cy.visit('/dashboard')
    cy.get('#company-trade-selector').select('Astral Company Limited (AST)').should('have.value', 'AST')
    cy.get('#company-trade-equilibrium-price-btn').click()
    cy.get("#company-trade-qty-input").click()
    .type('10')
    .should('have.value','10')
    cy.get("#submit-company-trade-order").click();
    // cy.get("#log-in-btn").click()
    // cy.get("#register-new-user").click()
    // cy.get("#user-name-entry").click()
    // .type('TestUser')
    // .should('have.value','TestUser')
    // .get("#user-email-entry")
    // .type('test_user@gmail.com')
    // .should('have.value','test_user@gmail.com')
    // .get("#user-password-entry")
    // .type('Testing123')
    // .should('have.value','Testing123')
    // cy.get("#submit-register-new-user").click();
  })
})