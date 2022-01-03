module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex('cities', ['distance_from_sea'])
    await queryInterface.addIndex('cities', ['population'])
    await queryInterface.addIndex('cities', ['z_moyen'])
  },
  down: async (queryInterface) => {
    await queryInterface.removeIndex('cities', ['distance_from_sea'])
    await queryInterface.removeIndex('cities', ['population'])
    await queryInterface.removeIndex('cities', ['z_moyen'])
  },
}
