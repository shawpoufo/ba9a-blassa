'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RequestValidation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    RequestValidation.init({
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            validate: {
                notNull: { msg: 'Id obligatoire' },
                notEmpty: { msg: 'Id obligatoire' },
                is: { args: /^\d+$/i, msg: 'id format incorrecte' },
                isNumeric: { msg: 'Id format incorrecte' },

            }

        }
    }, {
        sequelize,
        modelName: 'requestValidation',
    });
    return RequestValidation;
};