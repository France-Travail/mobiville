import { CronJob } from 'cron'

const citiesCron = async (models) => {
  console.log('START CRONS : CITIES')

  // tous lundi à 0h (nuit de dimanche à lundi)
  const syncOneCity = new CronJob('0 0 0 * * 1', async function () {
    await models.cities.checkAndStartSyncCity()
  })

  await models.cities.checkAndStartSyncCity()
  syncOneCity.start()
}

export default citiesCron
