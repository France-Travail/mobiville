import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'tensions',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      libfap: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      rome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      rome_label: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fap: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bassin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bassin_lib: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      lib_rome: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      defm: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      dee: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      oee_nosais: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ind_t: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      selec_offre: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pcs: {
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
      indexes: [{ fields: ['bassin_id'] }, { fields: ['rome'] }],
    }
  )

  Model.associate = function (models) {
    Model.hasMany(models.bassins, {
      foreignKey: 'bassin_id',
      sourceKey: 'bassin_id',
    })
    return models
  }

  return Model
}
