'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('booking', {
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      tripId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'trip',
          key: 'id'
        }
      },
      invoiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'invoice',
          key: 'id'
        }
      },
      seatNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
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
    // await queryInterface.addConstraint('booking',
    //   ['clientId', 'tripId', 'invoiceId'],
    //   {
    //     type: 'PRIMARY KEY',
    //     name: "booking_pk_user_trip_invoice"
    //   })
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint('booking', 'booking_pk_user_trip_invoice')
    await queryInterface.dropTable('booking');
  }
};