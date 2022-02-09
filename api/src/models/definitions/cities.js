import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'cities',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_comm: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nom_dept: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      statut: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      z_moyen: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nom_region: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_reg: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      new_code_region: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      insee_com: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      code_dept: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      geo_point_2d_x: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      geo_point_2d_y: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      id_geofla: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_cant: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      superficie: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nom_comm: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_arr: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      population: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      distance_from_sea: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      average_temperature: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      average_houseselled: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      city_house_tension: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      average_houserent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      cache_living_environment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      photo: {
        type: Sequelize.TEXT,
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
      indexes: [
        { fields: ['insee_com'] },
        { fields: ['distance_from_sea'] },
        { fields: ['z_moyen'] },
        { fields: ['population'] },
      ],
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.bassins, {
      foreignKey: 'code_commune_insee',
      sourceKey: 'insee_com',
    })
    Model.hasOne(models.oldRegions, {
      foreignKey: 'former_code',
      sourceKey: 'code_reg',
    })
    Model.hasOne(models.newRegions, {
      foreignKey: 'code',
      sourceKey: 'new_code_region',
    })
    Model.hasMany(models.equipments, {
      foreignKey: 'depcom',
      sourceKey: 'insee_com',
    })

    return models
  }

  return Model
}
