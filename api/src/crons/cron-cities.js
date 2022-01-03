import { CronJob } from 'cron'

const citiesCron = async (models) => {
  console.log('START CRONS : CITIES')

  // check day at midnight
  const syncOneCity = new CronJob('0 0 * * * *', async function () {
    await models.cities.checkAndStartSyncCity()
  })

  await models.cities.checkAndStartSyncCity()
  syncOneCity.start()
}

export default citiesCron
