'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      return Promise.all([
        queryInterface.addColumn('Devices', 'ip', {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0.0.0.0',
        }),
        queryInterface.addColumn('Devices', 'connected', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }),
        queryInterface.addColumn('Devices', 'username', {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        }),
        queryInterface.addConstraint('Devices', ['username'], {
          type: 'unique',
          name: 'unique_username_devices',
        }),
      ])
    } catch (err) {
      console.log(err)
    }
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Devices', 'ip'),
      queryInterface.removeColumn('Devices', 'connected'),
      queryInterface.removeColumn('Devices', 'username'),
    ])
  },
}
