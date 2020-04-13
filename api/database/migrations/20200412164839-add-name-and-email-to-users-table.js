'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'firstName',
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Users',
          'lastName',
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Users',
          'email',
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
          },
          { transaction: t }
        ),
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'firstName', { transaction: t }),
        queryInterface.removeColumn('Users', 'lastName', { transaction: t }),
        queryInterface.removeColumn('Users', 'email', { transaction: t }),
      ])
    })
  },
}
