export default (sequelizeInstance, Model) => {
  Model.sync = async (helps) => {
    console.log('START SYNC HELPS')
    await Model.destroy({ truncate: true })

    let nbInserted = 0
    console.log('START SYNC HELPS')

    await Model.bulkCreate(helps)

    console.log('END SYNC HELPS')

    return {
      'nb read': helps.length,
      'nb inserted': nbInserted,
    }
  }

  return Model
}
