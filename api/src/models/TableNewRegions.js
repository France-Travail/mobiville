export default (sequelizeInstance, Model) => {
  Model.syncRegions = async ({ newRegions, socialHousingData }) => {
    await Model.destroy({ truncate: true })

    for (let i = 0; i < newRegions.length; i++) {
      const region = newRegions[i]

      await Model.create(region)
    }

    for (const { socialHousingDelay, region_code } of socialHousingData) {
      await Model.update(
        { average_delay_obtain_social_housing: socialHousingDelay },
        { where: { code: region_code } }
      )
    }
    return {
      'nb read': newRegions.length,
    }
  }

  return Model
}
