import Sequelize from 'sequelize'
/*
- code_comm:
- nom_dept: Nom du département,
- statut: Type de commune,
- z_moyen: Altitude moyenne,
- nom_region: Nom de région,
- new_code_region: Code de la région (Ceci est le nouveaux code des régions),
- insee_com: Identifiant europeen de la commune,
- code_dept: Code du département,
- geo_point_2d_x: Centre de la ville en longitude,
- geo_point_2d_y: Centre de la ville en latitude,
- postal_code: Code postal Français de la ville,
- id_geofla: Id de la latitude et longitude celon le code Geofla,
- code_cant: ,
- superficie: Supperficie en km2,
- nom_comm: Nom de la commune,
- code_arr:
- population: Population en milier (Info de 2017),
- distance_from_sea: Distance par rapport à la mer par rapport au centre. (Valeur à null puis un cron teste le point geographique le plus proche selon le fichier `france-shape-side-sea.geo.json`),
- average_temperature: Température moyenne de la ville sur toute l'année des 10 dernieres années avec 3 ans de retard. (Valeur à null puis un cron chercher la balise météorologie la plus proche de la ville. Les balises sont issues de `donneespubliques.meteofrance.fr`. Pour info, il n'y a pas beaucoup de balise en France, quelques centaines),
- description: Description de la ville. (Valeur à null puis un cron demande à l'api wikipedia la description),
- average_houseselled: Prix moyen du m2 des logements (Valeur à null puis un cron demande au fichier `dvf-communes-2019.csv` issue de data.gouv.fr),
- city_house_tension: Definition du niveau de tension (Valeur à null puis un cron demande au fichier `dvf-communes-2019.csv` issue de data.gouv.fr),
- average_houserent: Prix moyen du loyer des appartement au m2 (Value à null puis un demande au fichier `indicateurs-loyers-appartements.csv` issue de data.gouv.fr),
- average_houserent_f2: Prix moyen du loyer des appartement F2 du bassin rattaché (Value à null puis un demande au fichier `house-pricing.csv`),
- average_houserent_f4: Prix moyen du loyer des appartement F4 du bassin rattaché (Value à null puis un demande au fichier `house-pricing.csv`),
- photo: Url de photo de la ville. (Valeur à null puis un cron demande à l'api wikipedia la photo),

*/

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
      average_houserent_f2: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      average_houserent_f4: {
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
      total_social_housing: {
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
    Model.hasOne(models.newRegions, {
      foreignKey: 'code',
      sourceKey: 'new_code_region',
    })
    Model.hasMany(models.equipments, {
      foreignKey: 'depcom',
      sourceKey: 'insee_com',
    })
    Model.hasMany(models.citiesJobs, {
      foreignKey: 'insee_code',
      sourceKey: 'insee_com',
    })

    return models
  }

  return Model
}
