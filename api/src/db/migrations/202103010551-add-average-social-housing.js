module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'regions',
      'average_delay_obtain_social_housing',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn(
      'regions',
      'average_delay_obtain_social_housing'
    )
  },
}
