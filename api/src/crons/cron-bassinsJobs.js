import { CronJob } from 'cron'
import { getBassinJobsCount } from '../utils/api'

const citiesCron = async (models) => {
  console.log('START CRONS : bassinsJobs')

  const loadAndSync = async () =>
    getBassinJobsCount()
      .then((data) => {
        console.log('Now starting sync - bassinsJobs')
        models.bassinsJobs.sync(data)
        console.log('sync finished - bassinsJobs')
      })
      .catch((err) => console.error('Error syncing bassinsJobs', err))

  // check day at midnight
  const cronJob = new CronJob('0 0 * * * *', loadAndSync)

  await loadAndSync()
  cronJob.start()
}

export default citiesCron
