const { defineConfig } = require('cypress')
const webpack = require('@cypress/webpack-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  )

  // Make sure to return the config object as it might have been modified by the plugin.
  return config
}

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1200,
    viewportWidth: 1500,
    video: false,
    videoCompression: false,
    screenshotsFolder: 'cypress/reports/screenshots',
    baseUrl: "https://mobiville.beta.pole-emploi.fr/",
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter.json',
    },
    retries: {
      runMode: 0,
      openMode: 0,
      //retries-bug : "https://github.com/cypress-io/cypress/issues/18502",
    },
    env: {
      TAGS: 'not @ignore',
    },
    // excludeSpecPattern: '*.js',
    specPattern: '**/*.feature',
    supportFile: false,
    setupNodeEvents,
  },
})
