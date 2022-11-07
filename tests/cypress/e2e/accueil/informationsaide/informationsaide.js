const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../common/common";

const infoAides = "main[id=main] * > div > p";
const boutonDemanderAide = "main[id=main] div > a[href*=actionlogement]";

Then("j'affiche le détail de l'aide", function () {
  cy.contains(infoAides, "Public concerné", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoAides, "Est-elle cumulable ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoAides, "Descriptif de l'aide", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoAides, "Quand faire la demande ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoAides, "Quelles conditions ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutonDemanderAide, {timeout: SHORT_WAIT_TIME}).should('exist');
})