// A script to execute all syncs that were previously done in the sync route
import { uniqBy } from 'lodash'
import { getAllRegions, getRegionsSocialHousing } from '../utils/api'

import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    const oldRegions = await getAllRegions()
    const newRegions = uniqBy(
      oldRegions.map((region) => ({
        code: region.new_code,
        name: region.new_name,
        name_normalized: region.new_name_normalized,
      })),
      'code'
    )

    const socialHousingData = getRegionsSocialHousing()
    await models.newRegions.syncRegions({ newRegions, socialHousingData })

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for cities. This should be almost instanteneous. Please wait for the confirmation message…'
)
doSync()
