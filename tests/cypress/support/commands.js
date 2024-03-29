// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginUser', () => {
  const loginRoute = `${Cypress.env('apiUrl')}/api/auth/login`

  cy.request({
    method: 'POST',
    url: loginRoute,
    body: {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    },
  }).then((res) => {
    cy.setCookie('token', res.body.token)
  })
})

Cypress.Commands.add('resetInitialDevice', () => {
  const deviceEditRoute = `${Cypress.env('apiUrl')}/api/devices/1`
  cy.getCookie('token').then((cookie) => {
    cy.request({
      method: 'PATCH',
      url: deviceEditRoute,
      body: {
        fetchTime: '60',
        name: 'Test Device',
        ip: '192.168.0.107',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie.value,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200)
    })
  })
})
