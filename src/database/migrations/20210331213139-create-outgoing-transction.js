'use strict';
const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Debits", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiverAccount: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      receiverName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transactionType: {
        type: Sequelize.ENUM("Transfer", "Withdrawal"),
        defaultValue: "Transfer",
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
    await queryInterface.dropTable('Debits');
  }
};