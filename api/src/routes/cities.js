import { CRITERIONS } from '../constants/criterion'
import { compact } from 'lodash'
import Router from '@koa/router'

const router = new Router({ prefix: '/cities' })

router.post(
  '/search',
  async ({
    request: {
      body: {
        codeCity,
        codeRegion,
        codeEnvironment,
        codeRome,
        index,
        onlySearchInTension,
        sortBy,
      },
    },
    response,
    models,
  }) => {
    let order
    switch (sortBy) {
      case 'mer':
        order = [['distance_from_sea', 'asc']]
        break
      case 'montagne':
        order = [['z_moyen', 'desc']]
        break
      default:
        order = [['population', 'desc']]
        break
    }

    const [queryResult, totalResults] = await models.cities.search({
      codeRegion,
      codeCriterion: compact([codeCity, codeEnvironment]),
      codeRome,
      onlySearchInTension,
      order,
      offset: index,
    })

    response.body = {
      list: queryResult,
      total: totalResults,
      index,
    }
  }
)

router.post(
  '/search-close-cities',
  async ({
    request: {
      body: { latitude, longitude, codeRome, inseeCode },
    },
    models,
    response,
  }) => {
    response.body = await models.cities.searchCloseCities({
      latitude,
      longitude,
      codeRome,
      inseeCode,
    })
  }
)

router.post(
  '/search-similar-cities',
  async ({
    request: {
      body: { codeRome, city },
    },
    models,
    response,
  }) => {
    response.body = await models.cities.searchSimilarCities({
      codeRome,
      city,
    })
  }
)

router.post(
  '/search-by-skill',
  async ({
    request: {
      body: { label },
    },
    models,
    response,
  }) => {
    // Temporarily disable the search by skill to only
    // use the search by job title (OGR)
    const resultFromSkill = []
    // const resultFromSkill = await models.cities.models.romeskills.searchByLabel(label)

    const resultFromOgr = await models.romeogrs.searchByLabel(label)

    response.body = resultFromSkill.concat(resultFromOgr)
  }
)

router.post(
  '/autocomplete',
  async ({
    request: {
      body: { query },
    },
    models,
    response,
  }) => {
    response.body = await models.cities.getCitiesForAutoComplete(query)
  }
)

router.get('/criterions', async ({ models, response }) => {
  const [jobList, regionsTensionsCriterions] = await Promise.all([
    models.tensions.fetchJobList(),
    models.regionsTensionsCriterions.findOne().then((row) => row.json || []),
  ])

  response.body = {
    criterions: CRITERIONS,
    regions: regionsTensionsCriterions,
    codeRomes: jobList.map((job) => ({
      key: job.rome,
      label: job.label,
    })),
  }
})

router.get('/load/:insee', async ({ params: { insee }, models, response }) => {
  response.body = await models.cities.getCity({ insee })
})

export default router
