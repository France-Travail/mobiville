import { CronJob } from 'cron'
import { getCitiesJobsCount } from '../utils/api'

const citiesCron = async (models) => {
  console.log('START CRONS : citiesJobs')

  const loadAndSync = async () =>
    getCitiesJobsCount()
      .then((data) => {
        console.log('Now starting sync - citiesJobs')
        models.citiesJobs.sync(data)
        console.log('sync finished - citiesJobs')
      })
      .catch((err) => console.error('Error syncing citiesJobs', err))

  // check day at midnight
  const cronJob = new CronJob('0 0 * * * *', loadAndSync)

  await loadAndSync()
  cronJob.start()
}

export default citiesCron