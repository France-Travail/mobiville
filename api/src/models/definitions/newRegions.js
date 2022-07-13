import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'newRegions',
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
      average_delay_obtain_social_housing: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
      indexes: [{ fields: ['code'], unique: true }],
    }
  )

  Model.associate = function (models) {
    return models
  }

  return Model
}
