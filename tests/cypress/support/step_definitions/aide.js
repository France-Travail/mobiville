const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";

Then("j'affiche le détail de l'aide", function () {
  cy.contains("Public concerné", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains("Est-elle cumulable ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains("Descriptif de l'aide", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains("Quand faire la demande ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains("Quelles conditions ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains("Demander l'aide", {timeout: SHORT_WAIT_TIME}).should('exist');
})