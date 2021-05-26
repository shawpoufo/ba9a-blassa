'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      company.hasMany(models.Trip)
    }
  }
  company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'nom de la compagnie est obligatoire' },
          notNull: { msg: 'nom de la compagnie est obligatoire' },
          isUnique: function uniqueName(value, next) {
            company
              .count({ where: { name: value } })
              .then((count) => {
                if (count === 0) next()
                next('ce nom de compagnie est déja utilisé')
              })
              .catch((error) => next("contacter l'admin"))
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'company',
      modelName: 'Company',
    }
  )
  return company
}
