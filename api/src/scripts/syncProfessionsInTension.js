// A script to execute all syncs that were previously done in the sync route
import { getAllBassins, getAllTensions, getRomeLabel } from '../utils/api'

import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    const bassins = await getAllBassins()
    await models.bassins.sync({ bassins })

    const tensions = await getAllTensions()
    for (let i = 0; i < tensions.length; i++) {
      tensions[i].rome_label = await getRomeLabel(tensions[i].rome)
    }
    await models.tensions.syncTensions({ tensions })

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for professions in tension. This should take about 2 minutes. Please wait for the confirmation message…'
)
doSync()
