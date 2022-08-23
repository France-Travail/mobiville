// import processParams from '../../../../../support/processor'
const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When("Je suis sur la page d'accueil mobiville", () => {
  cy.visit("/", {timeout: 15000})
})

Then('Alors le titre est {}', function (titre) {
  cy.title().should('include', titre)
})
