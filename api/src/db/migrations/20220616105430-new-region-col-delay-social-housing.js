'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'new_regions',
      'average_delay_obtain_social_housing',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'new_regions',
      'average_delay_obtain_social_housing'
    )
  },
}
