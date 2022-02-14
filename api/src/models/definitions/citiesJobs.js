import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'citiesJobs',
    {
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
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
      indexes: [
        { fields: ['insee_code', 'rome_id'] },
        { fields: ['rome_id'] },
        { fields: ['number'] },
      ],
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.cities, {
      foreignKey: 'insee_com',
      sourceKey: 'insee_code',
    })

    return models
  }

  return Model
}
