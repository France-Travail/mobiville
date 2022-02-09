'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('equipments', 'total', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },

  down: async (queryInterface) => {
    queryInterface.dropColumn('equipments', 'total')
  },
}
