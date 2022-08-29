'use strict'

const report = require('multiple-cucumber-html-reporter')

// TODO complété les metadata
report.generate({
  useCDN: true,
  jsonDir: './cypress/reports/cucumber-json/',
  reportPath: './cypress/reports/cucumber-html-report/',
  metadata: {
    browser: {
      name: 'chrome',
      version: '100',
    },
    device: 'Local test machine',
    platform: {
      name: 'ubuntu',
      version: null,
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Mobiville' },
      { label: 'Release', value: 'TODO' },
    ],
  },
})
