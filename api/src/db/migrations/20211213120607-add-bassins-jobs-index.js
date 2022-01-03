module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex('bassins_jobs', ['bassin_id', 'rome_id'])
    await queryInterface.addIndex('bassins_jobs', ['rome_id'])
    await queryInterface.addIndex('bassins_jobs', ['number'])
  },
  down: async (queryInterface) => {
    await queryInterface.removeIndex('bassins_jobs', ['rome_id'])
  },
}
