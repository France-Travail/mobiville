'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departements', {
      code: {
        type: Sequelize.STRING(3),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      rent_t2: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      rent_t4: {
        type: Sequelize.FLOAT,
        allowNull: true,
      }
    })

    await queryInterface.renameColumn('cities', 'average_houserent_f2', 'rent_t2')
    await queryInterface.renameColumn('cities', 'average_houserent_f4', 'rent_t4')
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable('departements')
    
    await queryInterface.renameColumn('cities', 'rent_t2', 'average_houserent_f2')
    await queryInterface.renameColumn('cities', 'rent_t4', 'average_houserent_f4')
  },
}
