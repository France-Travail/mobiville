import Router from '@koa/router'

const router = new Router({ prefix: '/professions' })

import { searchJob, infosTravail, infosTensionTravail } from '../utils/pe-api'
import { meanBy } from 'lodash'

const CODE_INSEE_LYON_FIRST_DISTRICT = '69381'
const CODE_INSEE_PARIS_FIRST_DISTRICT = '75101'
const CODE_INSEE_MARSEILLE_FIRST_DISTRICT = '13201'

const CODE_INSEE_LYON = '69123'
const CODE_INSEE_PARIS = '75056'
const CODE_INSEE_MARSEILLE = '13055'

// we need special matchings for Marseille, Paris and Lyon, since we cannot search them directly
// and need to input the insee code of a special district
const getInseeCodesForSearch = (inseeCodes) =>
  inseeCodes.map((inseeCode) => {
    if (inseeCode === CODE_INSEE_LYON) return CODE_INSEE_LYON_FIRST_DISTRICT
    if (inseeCode === CODE_INSEE_PARIS) return CODE_INSEE_PARIS_FIRST_DISTRICT
    if (inseeCode === CODE_INSEE_MARSEILLE)
      return CODE_INSEE_MARSEILLE_FIRST_DISTRICT

    return inseeCode
  })

router.post(
  '/search',
  async ({
    request: {
      body: { codeRome, insee },
    },
    response,
  }) => {
    const result = await searchJob({
      codeRome,
      insee: getInseeCodesForSearch(insee),
      distance: 30,
    })
    if (result) {
      response.body = result.resultats
    } else {
      response.body = []
    }
  }
)
router.post(
  '/infos-travail',
  async ({
    request: {
      body: { codeRome, insee },
    },
    models,
    response,
  }) => {
    //https://dares.travail-emploi.gouv.fr/donnees/la-nomenclature-des-familles-professionnelles-fap-2009

    const [city, pcs] = await Promise.all([
      models.cities.findOne({
        where: { insee_com: insee },
        raw: true,
        include: models.cities.models.bassins,
      }),
      models.cities.models.tensions.findOne({
        where: {
          rome: codeRome,
        },
        raw: true,
      }),
    ])

    const bassinId = city && city['bassin.bassin_id']

    if (!bassinId || !pcs) {
      response.body = null
      return
    }

    const [infosResult, { bassin: bassinStatsResult, dept: deptStatsResult }] =
      await Promise.all([
        infosTravail({
          codeProfession: pcs.pcs,
          codeDept: city.code_dept,
          codeRome,
        }),
        infosTensionTravail({
          bassinId,
          codeRome,
          codeDept: city.code_dept,
        }),
      ]).catch((err) => {
        // A better handling of errors should be included, but for now we’ll do with just not screwing the whole app
        // as this previously did
        console.error(err)
        return [null, { bassin: null, dept: null }]
      })

    const bassinTension =
      (bassinStatsResult &&
        bassinStatsResult.result &&
        bassinStatsResult.result.records &&
        bassinStatsResult.result.records[0] &&
        bassinStatsResult.result.records[0].TENSION_RATIO) ||
      null

    const deptTension =
      (deptStatsResult &&
        deptStatsResult.result &&
        deptStatsResult.result.records &&
        deptStatsResult.result.records[0] &&
        deptStatsResult.result.records[0].TENSION_RATIO) ||
      null

    let min = null
    let max = null

    if (infosResult && infosResult.result && infosResult.result.records) {
      const records = infosResult.result.records.map((r) => ({
        ...r,
        MINIMUM_SALARY: +r.MINIMUM_SALARY,
        MAXIMUM_SALARY: +r.MAXIMUM_SALARY,
      }))
      min = meanBy(records, 'MINIMUM_SALARY')
      max = meanBy(records, 'MAXIMUM_SALARY')
    }

    response.body = {
      min,
      max,
      bassinTension,
      deptTension,
    }
  }
)

export default router
