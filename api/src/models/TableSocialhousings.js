export default (sequelizeInstance, Model) => {
  Model.getNbSocialHousing = async (city) => {
    if (city) {
      const social = await Model.findOne({
        where: {
          code_reg: city['oldRegion.new_code'],
        },
        raw: true,
      })

      if (social) {
        return social.nb_2019
      }
    }

    return 0
  }

  return Model
}
