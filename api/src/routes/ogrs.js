import Router from '@koa/router'

const router = new Router({ prefix: '/ogrs' })

router.get('/', async ({ models, response }) => {
  response.body = await models.romeogrs.fetchAllAvailable()
})

export default router
