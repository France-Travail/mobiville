import { getPCSByRome } from '../utils/api'

export default (sequelizeInstance, Model) => {
  Model.syncTensions = async ({ tensions }) => {
    await Model.destroy({ truncate: true })

    let nbInserted = 0
    for (let i = 0; i < tensions.length; i++) {
      const tension = tensions[i]
      nbInserted++
      await Model.create(tension)
    }

    return {
      'nb read': tensions.length,
      'nb inserted': nbInserted,
    }
  }

  Model.allCitiesId = async (code_rome = []) => {
    let options = {}
    if (code_rome.length > 0) {
      options = {
        rome: code_rome,
        ...options,
      }
    }

    const listBassinId = (
      await Model.findAll({
        attributes: ['bassin_id'],
        where: {
          ...options,
        },
        raw: true,
      })
    ).map((s) => s.bassin_id)

    const inseeCode = (
      await Model.models.bassins.findAll({
        attributes: ['code_commune_insee'],
        where: {
          bassin_id: listBassinId,
        },
        raw: true,
      })
    ).map((s) => s.code_commune_insee)

    return inseeCode
  }

  Model.fetchJobList = async () => {
    if (Model.jobList) {
      return Model.jobList
    }

    const result = await Model.findAll({
      attributes: ['rome', 'rome_label'],
      group: ['rome', 'rome_label'],
      order: ['rome_label'],
    })

    Model.jobList = result.map((result) => ({
      label: result.rome_label,
      rome: result.rome,
    }))

    return Model.jobList
  }

  Model.syncPCS = async () => {
    console.log('sync datas')

    const result = await Model.findAll({
      attributes: ['id', 'rome', 'pcs', 'fap'],
      where: {
        pcs: null,
      },
    })

    for (let i = 0; i < result.length; i++) {
      const row = result[i]
      const pcs = await getPCSByRome(row.dataValues.rome, row.dataValues.fap)

      await row.update({ pcs })
    }
  }

  return Model
}
