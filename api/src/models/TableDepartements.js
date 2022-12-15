export default (sequelizeInstance, Model) => {
    Model.sync = async ({ departements }) => {
      await Model.destroy({ truncate: true })
      await Model.bulkCreate(departements)
    }
  
    return Model
  }
  