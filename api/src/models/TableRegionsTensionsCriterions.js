import { groupBy, uniq, sortBy, toArray } from 'lodash'
import { CRITERIONS } from '../constants/criterion'

export default (sequelizeInstance, Model) => {
  // crude implementation of what was previously done at app startup, with an intermediate table.
  // Basically creates a JSON object with criterions info per region and stores it in db.
  // (The code is probably super-optimizable as it’s basically a concatenation of what was done in 2 times)
  Model.sync = async () => {
    console.log('START SYNC REGIONS TENSIONS CRITERIONS')

    const jobList = await Model.models.tensions.fetchJobList()
    const regionsList = await Model.models.oldRegions.findAll()

    const regionsTensionsTemp = []

    for (const criterion of CRITERIONS) {
      const romesByRegion = {}

      for (const job of jobList) {
        const { rome } = job
        const [searchResult] = await Model.models.cities.search({
          codeCriterion: [criterion.key],
          codeRome: [rome],
          logging: false,
        })
        const citiesGroupedByRegion = groupBy(searchResult, 'region.new_code')

        Object.keys(citiesGroupedByRegion).forEach((regionCode) => {
          if (!romesByRegion[regionCode]) {
            romesByRegion[regionCode] = []
          }

          if (romesByRegion[regionCode].includes(rome)) return

          romesByRegion[regionCode].push(rome)
        })
      }

      for (const regionCode of Object.keys(romesByRegion)) {
        const romes = romesByRegion[regionCode]

        const region = regionsList.find(
          (region) => region.new_code === regionCode
        )

        for (const rome of romes) {
          regionsTensionsTemp.push({
            rome,
            region_new_code: regionCode,
            region_new_name: region.new_name,
            criterion: criterion.key,
          })
        }
      }
    }

    const regionsTensions = uniq(regionsTensionsTemp)

    let objectByRegions = {}

    regionsTensions.forEach((row) => {
      if (!objectByRegions[row.region_new_code]) {
        objectByRegions[row.region_new_code] = {
          id: row.region_new_code,
          label: row.region_new_name,
          criterions: {
            [row.rome]: [row.criterion],
          },
        }
        return
      }

      if (!objectByRegions[row.region_new_code].criterions[row.rome]) {
        objectByRegions[row.region_new_code].criterions[row.rome] = [
          row.criterion,
        ]
        return
      }

      if (
        objectByRegions[row.region_new_code].criterions[row.rome].includes(
          row.criterion
        )
      )
        return

      objectByRegions[row.region_new_code].criterions[row.rome].push(
        row.criterion
      )
    })

    const instance = await Model.findOne()
    instance.json = sortBy(toArray(objectByRegions), 'label')
    await instance.save()

    console.log('SUCCESS : SYNC REGIONS TENSIONS CRITERIONS')
  }

  return Model
}
