'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.dropTable('old_regions')
    await queryInterface.removeColumn('cities', 'code_reg')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'old_regions',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        former_code: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        former_name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        former_name_normalized: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        new_code: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        new_name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        new_name_normalized: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        region: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        average_delay_obtain_social_housing: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      },
      {
        timestamps: true,
        paranoid: false,
        underscored: true,
        indexes: [{ fields: ['former_code'] }, { fields: ['new_code'] }],
      }
    )
    await queryInterface.addColumn('cities', 'code_reg', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },
}
