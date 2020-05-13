describe('Devices', () => {
  beforeEach(() => {
    cy.loginUser()
    const devicesRoute = `${Cypress.env('dashboardUrl')}/devices`
    cy.visit(devicesRoute)
  })

  it('User can see device', () => {
    cy.get('tr').eq(1).should('contain', 'Test Device')
  })

  it('User can create a device with correct data', () => {
    cy.resetInitialDevice()
    /**
     * Ant Design's select component is not an actual HTML select
     * element, thus cypress fails to select it and the workaround is
     * by catching the exception and waiting for the drop down to appear
     * before clicking it
     */
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.get('[data-cy=add-device]').click()
    cy.location('pathname').should('equal', '/devices/create')
    cy.get('[data-cy=device-name]').type(Cypress.env('testDeviceName'))
    cy.get('[data-cy=device-ip]').type(Cypress.env('testDeviceIP'))
    cy.get('[data-cy=device-time]').click()
    cy.contains(Cypress.env('testDeviceFetchTime')).click()
    cy.get('[data-cy=device-submit]').click()
    cy.location('pathname').should('equal', '/devices')
    cy.get('tr').last().should('contain', Cypress.env('testDeviceName'))
  })

  it('User can delete a device', () => {
    cy.get('[data-cy=delete-device-2]').click()
    cy.contains('Yes').click()
    cy.get('tr').should('not.contain', Cypress.env('testDeviceName'))
  })

  it('User can edit a device with correct data', () => {
    /**
     * Ant Design's select component is not an actual HTML select
     * element, thus cypress fails to select it and the workaround is
     * by catching the exception and waiting for the drop down to appear
     * before clicking it
     */
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.get('[data-cy=edit-device-1]').click()
    cy.location('pathname').should('equal', '/devices/1')
    cy.get('[data-cy=device-name]').clear().type(Cypress.env('testDeviceName'))
    cy.get('[data-cy=device-ip]').clear().type(Cypress.env('testDeviceIP'))
    cy.get('[data-cy=device-time]').click()
    cy.contains('1 hour').click()
    cy.get('[data-cy=device-submit]').click()
    cy.location('pathname').should('equal', '/devices')
    cy.get('tr')
      .last()
      .should('contain', Cypress.env('testDeviceName'))
      .and('contain', '1 hour')
      .and('contain', Cypress.env('testDeviceIP'))
  })
})
