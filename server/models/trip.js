'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static yesterday = () => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return yesterday
    }
    static associate(models) {
      // define association here
      trip.hasMany(models.StopOver, { foreignKey: 'trip', onDelete: 'cascade' })
      trip.belongsTo(models.Company)
      trip.belongsTo(models.Station, { as: "Start", foreignKey: 'startStation' })
      trip.belongsTo(models.Station, { as: "End", foreignKey: { name: 'endStation' } })
      trip.hasMany(models.Booking, { foreignKey: "tripId" })
    }
  };
  trip.init({
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "date de départ obligatoire" },
        isDate: { msg: "format incorrecte" },
        isAfter: { args: trip.yesterday().toDateString(), msg: " vous ne pouvez pas insére un voyage dans une date expiré" }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "date d'arrivée obligatoire" },
        isDate: { msg: "format incorrecte" },
        isAfter: { args: trip.yesterday().toDateString(), msg: " vous ne pouvez pas insére un voyage dans une date expiré" },
        notLowerThanStartDate(value) {
          if (value < this.startDate)
            throw new Error("la date d'arrivée doit être supérieur ou égale à la date de départ")
        }
      }
    },
    // startStation: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     notNull: { msg: "station de départ obligatoire" },
    //     isNumeric: { msg: "format ou valeur incorrecte" }
    //   }
    // },
    // endStation: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     notNull: { msg: "station d'arrivée obligatoire" },
    //     isNumeric: { msg: "format ou valeur incorrecte" }
    //   }
    // },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: "prix est obligatoire" },
        isDecimal: { msg: "format ou valeur incorrecte" },

      }
    },
    seatCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "obligatoire" },
        isNumeric: { msg: "format ou valeur incorrecte" }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "état obligatoire" },
        isIn: [["disponible", "plein", "annulée", "fini"]],
        notEmpty: { msg: "état obligatoire" }

      }
    }
  }, {
    sequelize,
    tableName: "trip",
    modelName: 'Trip',
    // validate: {
    //   notSameStation() {
    //     if (this.startStation === this.endStation)
    //       throw new Error(`la station d'arrivée doit être différente de la station de départ ${this.startStation} : ${this.endStation}`)
    //   }
    // }
  });
  return trip;
};