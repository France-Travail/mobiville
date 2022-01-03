import cities from './cron-cities'
import bassinsJobsCron from './cron-bassinsJobs'

export const start = (models) => {
  cities(models)
  bassinsJobsCron(models)
}
