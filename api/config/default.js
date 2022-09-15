require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8080,
  EMPLOI_STORE_URL: process.env.EMPLOI_STORE_URL,
  ENTERPRISE_URL: process.env.ENTERPRISE_URL,
  EMPLOI_STORE_ID: process.env.EMPLOI_STORE_ID,
  EMPLOI_STORE_SECRET: process.env.EMPLOI_STORE_SECRET,
  PE_ENV: process.env.PE_ENV,
  preloadSearch: false,
  database: {
    url: process.env.DATABASE_URL,
    dialect: 'mariadb',
  },
  weatherFile: (code) => `https://donneespubliques.meteofrance.fr/FichesClim/FICHECLIM_${(code + '').padStart(8, '0')}.data`,
  koaKeys: ['mobiville_for_ever'],
  SESSION_CONFIG: {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false, /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
  },
  proxyPeOverrides: {}
}
