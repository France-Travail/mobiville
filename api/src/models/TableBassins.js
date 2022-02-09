export default (sequelizeInstance, Model) => {
  Model.sync = async ({ bassins }) => {
    await Model.destroy({ truncate: true })
    await Model.bulkCreate(bassins)
  }

  return Model
}
