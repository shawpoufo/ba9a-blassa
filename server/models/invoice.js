'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      invoice.belongsTo(models.User, { foreignKey: 'id' })
      invoice.hasMany(models.Booking, { foreignKey: 'invoiceId' })
    }
  };
  invoice.init({
    date: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: { msg: 'format de date incorrect' }
      }
    },
    total: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: { msg: 'format incorrecte' }
      }
    }
  }, {
    sequelize,
    tableName: 'Invoice',
    modelName: 'Invoice',
  });
  return invoice;
};