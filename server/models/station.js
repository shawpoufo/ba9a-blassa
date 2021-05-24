'use strict'
const { Model, QueryTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class station extends Model {
    static async getStationsByCity() {
      try {
        const stationsByCity = await sequelize.query(
          'select city as `city.name`, name as `city.station.name` , id as `city.station.id` from station',
          {
            type: QueryTypes.SELECT,
            raw: true,
            nest: true,
          }
        )
        const citys = await sequelize.query(
          'select distinct city from station',
          {
            type: QueryTypes.SELECT,
            raw: true,
            nest: true,
          }
        )
        return merge(stationsByCity, citys)
      } catch {
        ;(error) => console.log(error)
      }
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      station.hasMany(models.Trip, { as: 'Start', foreignKey: 'startStation' })
      station.hasMany(models.Trip, { as: 'End', foreignKey: 'endStation' })
    }
  }
  station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'nom station obligatoire' },
          notEmpty: { msg: 'nom station obligatoire' },
          isUnique: function uniqueNameByCity(value, next) {
            station
              .count({ where: { name: value, city: this.city } })
              .then((count) => {
                if (count === 0) next()
                next(
                  "il ne doit pas y'avoire deux station avec le même nom dans la même ville"
                )
              })
              .catch((error) => next("contacter l'admin"))
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'nom station obligatoire' },
          notEmpty: { msg: 'nom station obligatoire' },
        },
      },
    },
    {
      sequelize,
      tableName: 'station',
      modelName: 'Station',
    }
  )
  return station
}

/*==========*/
const merge = (stationsByCity, citys) => {
  const merged = []
  stationsByCity.forEach((cbs) => {
    citys.forEach((c) => {
      if (cbs.city.name === c.city) {
        const index = merged.findIndex(
          (element) => element.city.name === c.city
        )

        if (index > -1) {
          merged[index].city.stations.push({
            id: cbs.city.station.id,
            name: cbs.city.station.name,
          })
        } else {
          merged.push({
            city: {
              name: c.city,
              stations: [
                { id: cbs.city.station.id, name: cbs.city.station.name },
              ],
            },
          })
        }
      }
    })
  })
  return merged
}
