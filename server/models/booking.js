'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking.belongsTo(models.User, { foreignKey: 'clientId' })
      booking.belongsTo(models.Trip, { foreignKey: 'tripId' })
      booking.belongsTo(models.Invoice, { foreignKey: 'invoiceId' })
    }
  };
  booking.init({
    clientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    tripId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    seatNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        isNumeric: { msg: 'format incorrecte' }
      }
    }
  }, {
    sequelize,
    tableName: 'booking',
    modelName: 'Booking',
  });
  return booking;
};