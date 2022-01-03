import path from 'path'
import { readdirSync, existsSync } from 'fs'
import config from 'config'
import Sequelize from 'sequelize'

import db from '../db'
import { ucFirst } from '../utils/utils'

if (!config.database.url) {
  console.error(config.database)
  throw 'No database URL'
}
const dbInstance = new Sequelize(config.database.url, {
  ...config.database,
  dialectOptions: { autoJsonMap: false }, // https://github.com/sequelize/sequelize/issues/12583
  logging: process.env.ENABLE_DB_LOGGING ? console.log : false,
})

function initModelsByPath(sequelizeInstance, folderPath, globalName) {
  if (global[globalName]) {
    return global[globalName]
  }
  const models = {}

  const folderDefPath = path.join(folderPath, 'definitions')
  readdirSync(folderDefPath).forEach(async (file) => {
    const createModel = require(path.join(folderDefPath, file)).default
    const model = createModel(sequelizeInstance)
    models[model.name] = model
    // add Controler
    const pathControler = path.join(folderPath, `Table${ucFirst(file)}`)
    if (existsSync(pathControler)) {
      const controlerModel = require(pathControler).default
      controlerModel(sequelizeInstance, model)
    }
  })

  for (const modelName in models) {
    models[modelName].models = models
    if (models[modelName].associate) {
      models[modelName].associate(models)
    }
  }

  global[globalName] = models
  return global[globalName]
}

function initModels() {
  const models = initModelsByPath(dbInstance, __dirname, 'models')

  return models
}

export default {
  instance: dbInstance,
  initModels,
  migrations: db.migrations(dbInstance),
  seeders: db.seeders(dbInstance),
}
