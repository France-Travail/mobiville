'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.dropTable('socialhousings')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('socialhousings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_reg: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nb_2019: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    })
  },
}
