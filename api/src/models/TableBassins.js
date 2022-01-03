export default (sequelizeInstance, Model) => {
  Model.sync = async ({ bassins }) => {
    await Model.destroy({ truncate: true })

    let nbInserted = 0
    for (let i = 0; i < bassins.length; i++) {
      const tension = bassins[i]
      nbInserted++
      await Model.create(tension)
    }

    return {
      'nb read': bassins.length,
      'nb inserted': nbInserted,
    }
  }

  return Model
}
