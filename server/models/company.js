'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "nom de la compagnie est obligatoire" },
        notNull: { msg: 'nom de la compagnie est obligatoire' },
      }
    }
  }, {
    sequelize,
    tableName: 'company',
    modelName: 'Company',
  });
  return company;
};