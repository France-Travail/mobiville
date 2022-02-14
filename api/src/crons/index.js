import cities from './cron-cities'
import citiesJobsCron from './cron-citiesJobs'

export const start = (models) => {
  cities(models)
  citiesJobsCron(models)
}
