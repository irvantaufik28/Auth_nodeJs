'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logistic_name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      destination_name: {
        type: Sequelize.STRING
      },
      origin_name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logistics');
  }
};