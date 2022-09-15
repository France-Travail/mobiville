import HttpsProxyAgent from 'https-proxy-agent'

module.exports = {
  preloadSearch: false,
  database: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: false,
    },
  },
  proxyPeOverrides: {
    // proxy PE + bug d'axios voir: https://github.com/axios/axios/issues/2072#issuecomment-609650888
    ...(process.env.PE_ENV && { proxy: false }),
    ...(process.env.PE_ENV && {
      httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000'),
    }),
  },
}
