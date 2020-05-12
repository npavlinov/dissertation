'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Devices', 'username', { transaction: t }),
        queryInterface.addColumn(
          'Devices',
          'userId',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'cascade',
            references: {
              model: 'Users',
              key: 'id',
            },
          },
          { transaction: t }
        ),
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Devices',
          'username',
          { allowNull: false, type: Sequelize.STRING },
          { transaction: t }
        ),
        queryInterface.removeColumn('Devices', 'userId', { transaction: t }),
      ])
    })
  },
}
