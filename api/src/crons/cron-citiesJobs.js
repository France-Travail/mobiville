import { CronJob } from 'cron'
import { getCitiesJobsCount } from '../utils/api'

const citiesCron = async (models) => {

    var NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV !== 'development') {
        console.log('START CRONS : citiesJobs')
        const loadAndSync = async () =>
            getCitiesJobsCount()
                .then((data) => {
                    data.forEach((row) => row.splice(1, 1)) // on rm la colonne libéllé de la ville
                    console.log('Now starting sync - citiesJobs')
                    models.citiesJobs.sync(data)
                    console.log('sync finished - citiesJobs')
                })
                .catch((err) => console.error('Error syncing citiesJobs', err))

        // check day at midnight
        const cronJob = new CronJob('0 0 * * * *', loadAndSync)

        await loadAndSync()
        cronJob.start()
    } else {
        console.log('NOT STARTED CRONS : citiesJobs ==> DEV MODE ON')
    }

}

export default citiesCron
