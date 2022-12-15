import sequelize from 'sequelize'
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
      paranoid: false,
    })

    console.log(`${result.length} lignes a mettre a jour`)
    for (let i = 0; i < result.length; i++) {
      const row = result[i]
      const pcs = await getPCSByRome(row.dataValues.rome)
      await row.update({ pcs })
    }
  }

  Model.getTauxdOpportunite = async () => {
    return Model.findAll({
      attributes: [
        'rome',
        [
          sequelize.literal(
            'CAST(sum(ind_t < 4) / count(tensions.bassin_id) AS DECIMAL(12,2))'
          ),
          'opportunite',
        ],
      ],
      include: {
        attributes: ['reg'],
        model: Model.models.bassins,
        required: true,
      },
      group: ['rome', 'bassins.reg'],
    }).then((r) =>
      r.map((v) => ({
        code_rome: v.rome,
        code_region: v.dataValues.bassins[0].reg,
        opportunite: parseFloat(v.dataValues.opportunite),
      }))
    )
  }
  return Model
}
