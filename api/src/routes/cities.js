import { CRITERIONS } from '../constants/criterion'
import { ALL_LIFE_CRITERIONS_LIST } from '../constants/lifeCriterions'
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
  '/search-by-location',
  async ({
    request: {
      body: { latitude, longitude },
    },
    models,
    response,
  }) => {
    response.body = await models.cities.searchByLocation({
      latitude,
      longitude,
    })
  }
)

router.post(
  '/search-by-name',
  async ({
    request: {
      body: { id, name },
    },
    models,
    response,
  }) => {
    let result

    if (id) {
      result = await models.cities.searchById({ id })
    } else {
      result = await models.cities.searchByName({ name })
    }

    response.body = result
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

router.get(
  '/tenement/:insee',
  async ({ params: { insee }, models, response }) => {
    const details = await models.cities.getCity({ insee })

    response.body = {
      nbSocialHousing: await models.socialhousings.getNbSocialHousing(details),
    }
  }
)

router.get(
  '/equipments/:insee',
  async ({ params: { insee }, models, response }) => {
    const cacheList =
      (await models.cities.getCacheLivingEnvironment(insee)) || {}
    const list = JSON.parse(JSON.stringify(ALL_LIFE_CRITERIONS_LIST))

    for (let i = 0; i < list.length; i++) {
      for (let x = 0; x < list[i].tab.length; x++) {
        list[i].tab[x].total =
          cacheList[list[i].key + '-' + list[i].tab[x].label] || 0
      }
      list[i].tab = list[i].tab.filter((i) => i.total)
    }

    response.body = list
  }
)

export default router
