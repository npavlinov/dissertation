'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Devices', ['userId', 'ip'], {
      type: 'unique',
      name: 'unique_ip_per_user',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Devices', 'unique_ip_per_user')
  },
}
