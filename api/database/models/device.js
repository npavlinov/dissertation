'use strict'
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    'Device',
    {
      name: DataTypes.STRING,
      ip: DataTypes.STRING,
      connected: DataTypes.BOOLEAN,
      username: DataTypes.STRING,
      fetchTime: DataTypes.INTEGER,
    },
    {}
  )
  Device.associate = function (models) {
    Device.hasMany(models.DeviceData, {
      foreignKey: 'deviceId',
    })
    Device.hasMany(models.DeviceSetting, {
      foreignKey: 'deviceId',
    })
  }
  return Device
}
