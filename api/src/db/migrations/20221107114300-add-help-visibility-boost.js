'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('helps', 'visibility_boost', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('helps', 'visibility_boost')
  },
}
