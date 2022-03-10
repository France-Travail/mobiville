'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('helps', 'cumulable', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('helps', 'cumulable', {
      type: Sequelize.STRING(2000),
      allowNull: true,
    })
  },
}
