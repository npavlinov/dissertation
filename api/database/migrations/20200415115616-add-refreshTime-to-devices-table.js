'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Devices', 'fetchTime', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 300,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Devices', 'fetchTime')
  },
}
