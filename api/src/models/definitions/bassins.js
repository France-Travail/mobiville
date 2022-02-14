import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'bassins',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_commune_insee: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      reg_credoc: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reg: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dep: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_commune: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nom_com: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bassin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bassin_name: {
        type: Sequelize.STRING(255),
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
      indexes: [{ fields: ['bassin_id'] }, { fields: ['code_commune_insee'] }],
    }
  )

  Model.associate = function (models) {
    Model.hasMany(models.tensions, {
      foreignKey: 'bassin_id',
      sourceKey: 'bassin_id',
    })

    return models
  }

  return Model
}
