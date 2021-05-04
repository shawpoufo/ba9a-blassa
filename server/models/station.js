'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  station.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'nom station obligatoire' },
        notEmpty: { msg: "nom station obligatoire" }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'nom station obligatoire' },
        notEmpty: { msg: "nom station obligatoire" }
      }
    }
  }, {
    sequelize,
    tableName: 'station',
    modelName: 'Station',
  });
  return station;
};