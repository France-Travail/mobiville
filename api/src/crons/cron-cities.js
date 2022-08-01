import { CronJob } from 'cron'

const citiesCron = async (models) => {

  var NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV !== 'development') {
    console.log('START CRONS : CITIES')

    // tous lundi à 0h (nuit de dimanche à lundi)
    const syncOneCity = new CronJob('0 0 0 * * 1', async function () {
      await models.cities.checkAndStartSyncCity()
    })

    await models.cities.checkAndStartSyncCity()
    syncOneCity.start()
  } else {
    console.log('NOT STARTED CRONS : CITIES ==> DEV MODE ON')
  }


}

export default citiesCron
