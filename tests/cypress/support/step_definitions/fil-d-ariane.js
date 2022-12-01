const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";

const filAriane = "nav > div > a";
let URL = '';

function quelleUrl() {
  switch (URL) {
    case 'Offres d’emploi':
      return 'job';
    case 'Services de la ville':
      return 'life';
    case 'Villes similaires ou à proximité':
      return 'villes-proches';
  }
}

Then("je vois le fil d'ariane sur la page", function () {
  cy.contains(filAriane, "Emploi et logement", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filAriane, "Offres d’emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filAriane, "Services de la ville", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filAriane, "Villes similaires ou à proximité", {timeout: SHORT_WAIT_TIME}).should('exist');
})

And("je clique sur {string} dans le fil d'ariane", function (lienAriane) {
  URL = lienAriane;
  cy.contains(filAriane, lienAriane, { timeout: MIDDLE_WAIT_TIME }).click();
  cy.wait(500);
})

Then("j'affiche la page sélectionnée", function () {
  cy.url().should('include', quelleUrl());
})