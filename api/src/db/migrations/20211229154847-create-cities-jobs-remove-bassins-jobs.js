module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cities_jobs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      insee_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      rome_id: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })

    await queryInterface.addIndex('cities_jobs', ['insee_code', 'rome_id'])
    await queryInterface.addIndex('cities_jobs', ['rome_id'])
    await queryInterface.addIndex('cities_jobs', ['number'])

    await queryInterface.dropTable('bassins_jobs')
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cities_jobs')

    await queryInterface.createTable(
      'bassins_jobs',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        bassin_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rome_id: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        paranoid: false,
        underscored: true,
        indexes: [
          { fields: ['bassin_id', 'rome_id'] },
          { fields: ['rome_id'] },
          { fields: ['number'] },
        ],
      }
    )
  },
}
