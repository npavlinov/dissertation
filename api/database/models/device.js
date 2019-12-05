'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    name: DataTypes.STRING,
    allowNull: false
  }, {});
  Device.associate = function(models) {
    // associations can be defined here
  };
  return Device;
};
