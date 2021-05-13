'use strict';
const {
  Model,
  Op,
  QueryTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class stopOver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      stopOver.belongsTo(models.Trip, { foreignKey: 'trip' })
      stopOver.belongsTo(models.Station, { foreignKey: 'station' })
    }
  };
  stopOver.init({
    stopDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "la date est obligatoire" },
        isDate: { msg: "la date est obligatoire" }
      }
    },

  }, {
    sequelize,
    tableName: 'stopOver',
    modelName: 'StopOver',
    validate: {
      async betweenTripDates() {
        console.log(`Trip : ${this.trip} ; Date : ${this.stopDate} `)
        const check = await sequelize.models.Trip.count({
          where: {
            id: this.trip,
            startDate: {
              [Op.lt]: this.stopDate
            },
            endDate: {
              [Op.gt]: this.stopDate
            }
          }
        })
        if (check === 0)
          throw new Error("la date de l'escale doit situé entre la date départ et arrivée du voyage ")
      },
      async differentThanAllStopOvers() {
        const check = await sequelize.query("SELECT EXISTS(select 1 from stopover where trip = :tripId"
          + " and stopDate = :stopDate) as 'res'", {
          type: QueryTypes.SELECT,
          raw: true,
          replacements: { tripId: this.trip, stopDate: this.stopDate }

        })
        if (check[0].res === 1)
          throw new Error("la date de l'escale doit être différente des autre escale")
      },
      async differentStations() {
        const count = await sequelize.models.StopOver.count({ where: { station: this.station } })
        if (count > 0)
          throw new Error("un autre escale possède la même station choisie")
      }
    }
  });
  return stopOver;
};