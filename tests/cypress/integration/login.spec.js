describe('Authentication - Log in', () => {
  it('Logs in with correct data', () => {
    cy.visit(Cypress.env('dashboardUrl'))
    cy.location('pathname').should('equal', '/login')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))
    cy.contains('button', 'Log in').click()

    cy.location('pathname').should('equal', '/')
    cy.contains('Hello, Test').should('be.visible')
    cy.getCookie('token').should('exist')
  })

  it('Refuses to log in user with wrong data', () => {
    const loginRoute = `${Cypress.env('apiUrl')}/api/auth/login`
    cy.request({
      method: 'POST',
      url: loginRoute,
      failOnStatusCode: false,
      body: {
        username: 'test',
        password: 'wrongpass',
      },
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })
  })
})
