import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'socialhousings',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_reg: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nb_2019: {
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
      deleted_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [{ fields: ['code_reg'] }],
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.oldRegions, {
      foreignKey: 'new_code',
      sourceKey: 'code_reg',
    })

    return models
  }

  return Model
}
