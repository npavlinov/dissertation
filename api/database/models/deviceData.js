'use strict'
module.exports = (sequelize, DataTypes) => {
  const DeviceData = sequelize.define(
    'DeviceData',
    {
      fetchTime: DataTypes.INTEGER,
      data: DataTypes.JSON,
      deviceId: DataTypes.INTEGER,
    },
    {}
  )
  DeviceData.associate = function (models) {
    DeviceData.belongsTo(models.Device, {
      foreignKey: 'deviceId',
    })
  }
  return DeviceData
}
