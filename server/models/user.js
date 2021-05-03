'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "prénom obligatoire" },
        notEmpty: { msg: "prénom obliogatoire" },
        isAlpha: { msg: "Le prénom ne doit contenire que des lettres" }

      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "nom obligatoire" },
        notEmpty: { msg: "nom obliogatoire" },
        isAlpha: { msg: "Le nom ne doit contenire que des lettres" }

      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "userName obligatoire" },
        notEmpty: { msg: "userName obliogatoire" },
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "veuiller donner email" },
        isEmail: { msg: 'format de l\'émail est incorrecte' },
      }
    },
    password: {
      type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: "le mot de passe  ne doit pas être null" }, notEmpty: { msg: "le mot de passe ne doit pas être vide" } }
    }
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};