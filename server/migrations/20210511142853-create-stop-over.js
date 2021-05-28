'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stopOver', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stopDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      station: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'station',
          key: 'id',
        },
      },
      TripId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'trip',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stopOver')
  },
}
