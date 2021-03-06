'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trip', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      startStation: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "station",
          key: "id"
        }
      },
      endStation: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "station",
          key: "id"
        }
      },
      CompanyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "company",
          key: "id"
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      seatCount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trip');
  }
};