import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'helps',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      goal: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      when: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      conditions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cumulable: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      who: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      section: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      situation: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      count_vue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      logo: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      partner: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
      indexes: [{ fields: ['slug'] }],
    }
  )

  Model.associate = function (models) {
    return models
  }

  return Model
}
