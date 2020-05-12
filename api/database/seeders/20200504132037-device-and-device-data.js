module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert(
        'Devices',
        [
          {
            name: 'Test Device',
            ip: '192.168.0.109',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 2,
            fetchTime: 300,
          },
        ],
        { returning: true }
      )
      .then((devices) => {
        return queryInterface.bulkInsert('DeviceData', [
          {
            fetchTime: 60,
            data: JSON.stringify({
              airTemperature: 34,
              waterTemperature: 7,
              pH: 7.7,
              waterLevels: 45,
            }),
            deviceId: devices[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            fetchTime: 60,
            data: JSON.stringify({
              airTemperature: 14,
              waterTemperature: 17,
              pH: 5.7,
              waterLevels: 35,
            }),
            deviceId: devices[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            fetchTime: 60,
            data: JSON.stringify({
              airTemperature: 24,
              waterTemperature: 13,
              pH: 7.0,
              waterLevels: 45,
            }),
            deviceId: devices[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            fetchTime: 60,
            data: JSON.stringify({
              airTemperature: 20,
              waterTemperature: 10,
              pH: 8,
              waterLevels: 51,
            }),
            deviceId: devices[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
      })
  },
  down: (queryInterface, Sequelize) => {},
}
