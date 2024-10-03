const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('<Credentials />' ,() => {

  it('should generate an api key', () => {

    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.wait(4000)

    cy.visit(`${APP_URL}/credentials`)
    cy.wait(2000)

    const oldApiKey = cy.get('#api-key').invoke('text')
    cy.get('#generate-apiKey').click()
    cy.wait(3000)

    const newApiKey = cy.get('#api-key').invoke('text')

    expect(oldApiKey).to.not.equals(newApiKey)
  })

})
