import Sequelize from 'sequelize'
import Umzug from 'umzug'
import Bluebird from 'bluebird'
import config from 'config'

function addMethod(client) {
  const queryInterface = client.getQueryInterface()

  queryInterface.bulkInsertAutoIncrement = async (
    tableName,
    data,
    options = {}
  ) => {
    await queryInterface.bulkInsert(tableName, data, options)
    const query = `select setval('${tableName}_id_seq', (select max(id) from ${tableName}))`
    await queryInterface.sequelize.query(query)
  }

  queryInterface.findAll = async (tableName, options = {}) => {
    return queryInterface.select(null, tableName, options)
  }

  queryInterface.findOne = async (tableName, options = {}) => {
    const elems = await queryInterface.select(null, tableName, {
      ...options,
      limit: 1,
    })
    return elems[0] || null
  }

  queryInterface.lastId = async (tableName) => {
    const elem = await queryInterface.findOne(tableName, {
      order: [['id', 'DESC']],
      limit: 1,
    })
    return elem ? elem.id : 0
  }

  queryInterface.nextId = async (tableName) => {
    const lastId = await queryInterface.lastId(tableName)
    return lastId + 1
  }
}

function getUmzug(
  { tableName = 'migrations', folder = 'migrations' },
  dbInstance
) {
  const client = dbInstance

  addMethod(client)
  return new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: client,
      tableName,
    },
    logging: !!config.database.logging,
    migrations: {
      params: [client.getQueryInterface(), Sequelize, client.models],
      path: `${process.cwd()}/src/db/${folder}`,
      pattern: /^\d+[\w-]+\.js$/,
      wrap: (fun) => {
        if (fun.length === 4) {
          return Bluebird.promisify(fun)
        }
        return fun
      },
    },
  })
}

function runMigrations(dbInstance) {
  return () => {
    const client = dbInstance
    const migrator = getUmzug({}, dbInstance)
    return client.authenticate().then(() => migrator.up())
  }
}

export default {
  migrations: runMigrations,
}
