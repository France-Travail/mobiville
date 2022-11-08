import Router from '@koa/router'

const router = new Router({ prefix: '/helps' })

router.get('/get-previews', async ({ models, response }) => {
  response.body = await models.helps.findAll({
    attributes: [
      'id',
      'title',
      'goal',
      'who',
      'section',
      'situation',
      'count_vue',
      'slug',
      'logo',
      'type',
      'partner',
      'visibility_boost'
    ],
    raw: true,
  })
})

router.get(
  '/get-previews/:slug',
  async ({ params: { slug }, models, response }) => {
    const element = await models.helps.findOne({
      where: { slug },
    })

    if (element) {
      await element.update({ count_vue: element.dataValues.count_vue + 1 })
    }

    response.body = element
  }
)

export default router
