const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../../e2e/accueil/common/common";

const resultatsRechercheAide = "main[id=main] > div > h1";

Then("j'affiche les aides correspondantes", function () {
  cy.contains(resultatsRechercheAide, "aides disponibles pour votre situation", {timeout: SHORT_WAIT_TIME}).should('exist');
})