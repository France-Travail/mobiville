import Router from '@koa/router'

const router = new Router({ prefix: '/professions' })

import {
  searchJob,
  infosTravail,
  infosTensionTravail,
  searchJobCount,
} from '../utils/pe-api'
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
    return getInseeCodeUniqueForSearch(inseeCode)
  })

const getInseeCodeUniqueForSearch = (inseeCode) => {
  if (inseeCode === CODE_INSEE_LYON) return CODE_INSEE_LYON_FIRST_DISTRICT
  if (inseeCode === CODE_INSEE_PARIS) return CODE_INSEE_PARIS_FIRST_DISTRICT
  if (inseeCode === CODE_INSEE_MARSEILLE)
    return CODE_INSEE_MARSEILLE_FIRST_DISTRICT

  return inseeCode
}

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
      insee: getInseeCodesForSearch(insee)
    })
    response.body = {
      resultats: result ? result.resultats : [],
      totalOffres: result ? getTotalOffres(result) : 0,
    }
  }
)

const getTotalOffres = function (result) {
  let totalOffres = 0
  if (result && result.filtresPossibles) {
    const filtresPossibles = result.filtresPossibles
    const typesContrats = filtresPossibles.find(
      (filtrePossibles) => filtrePossibles.filtre === 'typeContrat'
    )
    typesContrats.agregation.forEach((agregat) => {
      totalOffres += agregat.nbResultats
    })
  }
  return totalOffres
}

router.post(
  '/searchCountList',
  async ({
    request: {
      body: { codeRome, inseeList },
    },
    response,
  }) => {
    async function callToSearchJobCount(insee) {
      return {
        insee: insee,
        total: getTotalOffres(
          await searchJobCount({
            codeRome,
            insee: getInseeCodesForSearch(insee),
            distance: 30,
          })
        ),
      }
    }

    let responseArray = []
    if (inseeList.length > 10) {
      // on divise par deux la taille de la liste si elle est trop grande pour limiter le nombre d'appels asynchrones
      const half = Math.ceil(inseeList.length / 2)
      responseArray.push(
        ...(await Promise.all(
          inseeList.slice(0, half).map((insee) => callToSearchJobCount(insee))
        )),
        ...(await Promise.all(
          inseeList.slice(half).map((insee) => callToSearchJobCount(insee))
        ))
      )
    } else {
      responseArray.push(
        ...(await Promise.all(
          inseeList.map((insee) => callToSearchJobCount(insee))
        ))
      )
    }

    response.body = JSON.stringify(responseArray)
  }
)

router.post(
  '/searchInseeonly',
  async ({
    request: {
      body: { insee },
    },
    response,
  }) => {
    const result = await searchJob({
      insee: getInseeCodesForSearch(insee)
    })
    if (result) {
      const total = result.resultats.length
      response.body = '{total:' + total + '}'
    } else {
      response.body = []
    }
  }
)

router.post(
  '/searchRomeonly',
  async ({
    request: {
      body: { codeRome },
    },
    response,
  }) => {
    const result = await searchJob({
      codeRome
    })
    if (result) {
      const total = result.resultats.length
      response.body = '{total:' + total + '}'
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
        include: {
          attributes: ['bassin_id'],
          model: models.cities.models.bassins,
          required: false,
          include: [
            {
              attributes: ['ind_t'],
              model: models.bassins.models.tensions,
              required: false,
              where: {
                rome: codeRome,
              },
            },
          ],
        }
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
      bassinId: city['bassin.bassin_id'],
      bassinTensionIndT: city['bassin.tensions.ind_t'],
      min,
      max,
      bassinTension,
      deptTension,
    }
  }
)

export default router
