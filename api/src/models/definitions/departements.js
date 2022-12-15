import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'departements',
    {
        code: {
            type: Sequelize.STRING(3),
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            unique: true,
          },
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          rent_t2: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          rent_t4: {
            type: Sequelize.FLOAT,
            allowNull: true,
          }
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true
    }
  )

  Model.associate = function (models) {
    Model.hasMany(models.cities, {
      foreignKey: 'code_dept',
      sourceKey: 'code',
    })

    return models
  }

  return Model
}
