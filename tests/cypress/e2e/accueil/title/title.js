// import processParams from '../../../../../support/processor'
const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')


Then('le titre est {string}', function (titre) {
  cy.title().should('include', titre)
})
