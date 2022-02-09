import { Op, QueryTypes } from 'sequelize'
import { chunk } from 'lodash'

const PARIS_CODE = 75056
const MARSEILLE_CODE = 13055
const LYON_CODE = 69123

const PARIS_BEGINNING = '75'
const MARSEILLE_BEGINNING = '13'
const LYON_BEGINNING = '69' // eslint-disable-line

export default (sequelizeInstance, Model) => {
  Model.sync = async ({ equipments }) => {
    await Model.destroy({ truncate: true })

    let nbInserted = 0
    console.log('START SYNC EQUIPMENTS')

    // general case

    // the correct way to do this would be with a reduce + the spread operator to clone prev,
    // but everything is super slow if done that way, because the file is gigantic
    // and there are way too many clone operations done

    let dataByDepcom = {}

    equipments.forEach((equipment) => {
      dataByDepcom[equipment.depcom] = {
        ...(dataByDepcom[equipment.depcom] || {}),
        [equipment.typequ]:
          ((dataByDepcom[equipment.depcom] &&
            dataByDepcom[equipment.depcom][equipment.typequ]) ||
            0) + 1,
      }
    })

    let dataToInsert = []

    for (const [depcom, allTypeQus] of Object.entries(dataByDepcom)) {
      for (const [typequ, total] of Object.entries(allTypeQus)) {
        dataToInsert.push({ depcom, typequ, total })
      }
    }

    // using chunks to avoid going past memory limits
    for (const dataChunk of chunk(dataToInsert, 10000)) {
      await Model.bulkCreate(dataChunk)
    }

    console.log('END SYNC EQUIPMENTS')

    return {
      'nb read': equipments.length,
      'nb inserted': nbInserted,
    }
  }

  Model.syncSpecialCities = async () => {
    // for Paris, Lyon, Marseille
    console.log('START SYNC EQUIPMENTS FOR SPECIAL CITIES')
    const citiesArray = [
      {
        like: 'PARIS%ARRONDISSEMENT',
        code: PARIS_CODE,
      },
      {
        like: 'MARSEILLE%ARRONDISSEMENT',
        code: MARSEILLE_CODE,
      },
      {
        like: 'LYON%ARRONDISSEMENT',
        code: LYON_CODE,
      },
    ]

    for (const cityData of citiesArray) {
      const districts = await Model.models.cities.findAll({
        attributes: ['insee_com'],
        where: {
          nom_comm: {
            [Op.like]: cityData.like,
          },
        },
      })

      const inseeComs = districts.map(({ insee_com }) => insee_com)

      const queryResult = await sequelizeInstance.query(
        // only get first two characters of depcom to group
        // everything together for these cities and get a total
        `
      SELECT LEFT(depcom, 2) as dep, typequ, SUM(total) as total FROM equipments
      WHERE depcom IN (:inseeComs) GROUP BY dep, typequ`,
        {
          replacements: { inseeComs },
          type: QueryTypes.SELECT,
          model: Model,
          mapToModel: true,
        }
      )

      await Model.bulkCreate(
        queryResult.map((row) => ({
          depcom:
            row.dataValues.dep === PARIS_BEGINNING
              ? PARIS_CODE
              : row.dataValues.dep === MARSEILLE_BEGINNING
              ? MARSEILLE_BEGINNING
              : LYON_CODE,
          typequ: row.dataValues.typequ,
          total: row.dataValues.total,
        }))
      )

      console.log('END SYNC EQUIPMENTS FOR SPECIAL CITIES')
    }
  }

  return Model
}
