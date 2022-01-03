export default (sequelizeInstance, Model) => {
  Model.syncRegions = async (regions) => {
    await Model.destroy({ truncate: true })

    for (let i = 0; i < regions.length; i++) {
      const region = regions[i]

      await Model.create(region)
    }

    return {
      'nb read': regions.length,
    }
  }

  return Model
}
