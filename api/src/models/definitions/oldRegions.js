import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'oldRegions',
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

  Model.associate = function (models) {
    Model.hasOne(Model.models.socialhousings, {
      foreignKey: 'code_reg',
      sourceKey: 'new_code',
    })

    return models
  }

  return Model
}
