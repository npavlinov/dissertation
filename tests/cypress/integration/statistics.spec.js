describe('Statistics', () => {
  it('User can see device statistics', () => {
    cy.loginUser()

    cy.resetInitialDevice()

    const statisticsRoutes = `${Cypress.env('dashboardUrl')}/statistics`
    cy.visit(statisticsRoutes)

    cy.get('[data-cy=chart-0]').should('have.attr', 'type', 'line')
  })

  it('User can see different statistics depending on fetch time', () => {
    cy.loginUser()

    cy.resetInitialDevice()

    const statisticsRoutes = `${Cypress.env('dashboardUrl')}/statistics`
    cy.visit(statisticsRoutes)

    cy.contains('Test Device').click()

    const fetchTimes = [
      { time: 60, expected: true },
      { time: 300, expected: true },
      { time: 21600, expected: false },
    ]

    cy.wrap(fetchTimes).each((fetchTime) => {
      cy.get(`[data-cy=time-${fetchTime.time}]`).click({ force: true })
      if (fetchTime.expected) {
        cy.get('[data-cy=chart-0]').should('have.attr', 'type', 'line')
      } else {
        cy.get('[data-cy=chart-0]').should('not.exist')
      }
    })
  })
})
