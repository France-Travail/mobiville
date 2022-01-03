export default (sequelizeInstance, Model) => {
  // This table is preserved because the social housing data
  // is more precise with old regions than with new regions

  Model.syncRegions = async ({ regions, socialHousingData }) => {
    await Model.destroy({ truncate: true })

    for (let i = 0; i < regions.length; i++) {
      const region = regions[i]

      await Model.create(region)
    }

    for (const { socialHousingDelay, name } of socialHousingData) {
      await Model.update(
        { average_delay_obtain_social_housing: socialHousingDelay },
        { where: { former_name_normalized: name } }
      )
    }

    return {
      'nb read': regions.length,
    }
  }

  Model.getCodeRegOfOldRegion = async (new_code) => {
    const list = await Model.findAll({
      where: {
        new_code,
      },
      group: ['former_code'],
      raw: true,
    })

    return list.map((r) => r.former_code)
  }

  return Model
}
