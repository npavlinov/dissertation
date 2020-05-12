describe('Devices', () => {
  it('User can see device statistics', () => {
    cy.loginUser()

    const statisticsRoutes = `${Cypress.env('dashboardUrl')}/statistics`
    cy.visit(statisticsRoutes)

    cy.get('[data-cy=chart-0]').should('have.attr', 'type', 'line')
  })
})
