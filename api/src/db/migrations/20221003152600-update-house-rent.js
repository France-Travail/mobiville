'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cities', 'average_houserent_f2', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })

    await queryInterface.addColumn('cities', 'average_houserent_f4', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('cities', 'average_houserent_f2')
    await queryInterface.removeColumn('cities', 'average_houserent_f4')
  },
}
