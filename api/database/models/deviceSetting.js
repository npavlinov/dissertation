'use strict'
module.exports = (sequelize, DataTypes) => {
  const DeviceSetting = sequelize.define(
    'DeviceSetting',
    {
      message: DataTypes.STRING,
      deviceId: DataTypes.INTEGER,
    },
    {}
  )
  DeviceSetting.associate = function (models) {
    DeviceSetting.belongsTo(models.Device, {
      foreignKey: 'deviceId',
    })
  }
  return DeviceSetting
}
