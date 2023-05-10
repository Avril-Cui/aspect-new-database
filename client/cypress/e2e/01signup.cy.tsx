describe('sign-up', () => {
  before(() => {
    cy.visit('/')
    cy.viewport(1440, 850)

  })
  it('register user', () => {
    cy.get("#log-in-btn").click()
    cy.get("#register-new-user").click()
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
})