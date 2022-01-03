module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cities', 'new_code_region', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('cities', 'code_reg', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('regions', 'former_code', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('regions', 'new_code', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.removeColumn('regions', 'deleted_at')
    await queryInterface.removeColumn('cities', 'deleted_at')
    await queryInterface.renameTable('regions', 'old_regions')

    await queryInterface.createTable(
      'new_regions',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        code: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        name_normalized: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        underscored: true,
        indexes: [
          {
            fields: ['code'],
            unique: true,
          },
        ],
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('old_regions', 'regions')
    await queryInterface.dropTable('new_regions')

    await queryInterface.removeColumn('cities', 'new_code_region')
    await queryInterface.changeColumn('cities', 'code_reg', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
    await queryInterface.changeColumn('regions', 'former_code', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
    await queryInterface.changeColumn('regions', 'new_code', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.addColumn('regions', 'deleted_at', {
      deleted_at: {
        type: Sequelize.DATE,
      },
    })
    await queryInterface.addColumn('cities', 'deleted_at', {
      deleted_at: {
        type: Sequelize.DATE,
      },
    })
  },
}
