const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../common/common";

const titreSimulateur = "main[id=main] * > p";

const champSaisieBudgetLocation = "input[placeholder=\"Renseigner un budget\"]";
const ResultatSurfaceLocation = "span[data-automation-id=housing-square-meters]";

const donneePrixSurfaceAchat = "div[class=metrics-container] > div:nth-child(1) > b";
const champSaisieSurfaceAchat =  "input[placeholder=\"Renseigner la surface\"]";
const ResultatPrixAchat = "span[data-automation-id=housing-cost]";

let SURFACE = 0;

function calculPrixAchat(surface) {
  cy.get(donneePrixSurfaceAchat).then((div) => {
    const text = div.text().split('€')[0].replace(/,| /gi, '');
    const number = parseInt(text.trim());
    const produit = number*surface;
    cy.get(ResultatPrixAchat, {timeout: SHORT_WAIT_TIME}).should('have.text', produit.toLocaleString());
  })
}

function calculSurfaceLocation() {
  cy.get(ResultatSurfaceLocation, {timeout: SHORT_WAIT_TIME}).should('exist');
}

Then("j'affiche le simulateur de logement", function () {
  cy.contains(titreSimulateur, "Simulateur de logement", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je saisis un budget de {int} euros pour une location", function (budget) {
  cy.get(champSaisieBudgetLocation, {timeout: SHORT_WAIT_TIME}).type(budget);
  cy.wait(500);
})

Then("la surface de logement que je peux occuper s'affiche", function () {
  cy.contains("Votre pouvez occuper un logement de", { timeout: SHORT_WAIT_TIME }).should('exist');
  calculSurfaceLocation();
})

When("je saisis la surface de {int} m² pour un achat", function (surface) {
  SURFACE = surface;
  cy.get(champSaisieSurfaceAchat, {timeout: SHORT_WAIT_TIME}).type(surface);
  cy.wait(500);
})

Then("le prix que le logement va me coûter s'affiche", function () {
  cy.contains("Votre logement va vous coûter", { timeout: SHORT_WAIT_TIME }).should('exist');
  calculPrixAchat(SURFACE);
})
