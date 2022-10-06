const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../common/common";
import { champSaisieMetier, champSaisieEndroit, boutoncritere1, boutoncritere2, boutoncritere3 } from "../../../support/step_definitions/formulaire-recherche";

Then("j'affiche les filtres aide", function () {
  cy.get(boutoncritere1, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere2, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere3, {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les filtres métier endroit", function () {
  cy.get(champSaisieMetier, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).should('exist');
})