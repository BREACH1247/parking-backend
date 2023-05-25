const sequelize = require('../db');
const { DataTypes } = require("sequelize");

const VehicleModel = sequelize.define('Vehicle', {
  vehicleId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  vehicleNumber: DataTypes.STRING,
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'userId'
    }
  }
});

exports.VehicleModel = VehicleModel;
