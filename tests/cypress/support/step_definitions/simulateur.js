const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";

const titreSimulateur = "main[id=main] * > p";

const donneeLoyerF2Location = "div[tag-page$=city] > div:nth-child(9) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > p";
// const donneeLoyerF4Location = "div[tag-page$=city] > div:nth-child(9) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > p";
const champSaisieBudgetLocation = "input[placeholder=\"Renseigner un budget\"]";
const ResultatSurfaceLocation = "span[data-automation-id=housing-square-meters]";

const donneePrixUniteSurfaceAchat = "div[tag-page$=city] > div:nth-child(9) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p";
const champSaisieSurfaceAchat =  "input[placeholder=\"Renseigner la surface\"]";
const ResultatPrixAchat = "span[data-automation-id=housing-cost]";

let SURFACE = 0;
let BUDGET = 0;
const SurfaceF2 = 45;
// const SurfaceF4 = 80;

Then("j'affiche le simulateur de logement", function () {
  cy.contains(titreSimulateur, "Simulateur de logement", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je saisis un budget de {int} euros pour une location", function (budget) {
  BUDGET = budget;
  cy.get(champSaisieBudgetLocation, {timeout: SHORT_WAIT_TIME}).type(budget);
  cy.wait(500);
})

Then("la surface de logement que je peux occuper s'affiche", function () {
  cy.contains("Votre pouvez occuper un logement de", { timeout: SHORT_WAIT_TIME }).should('exist');
  // cy.get(donneeLoyerF2Location, {timeout: SHORT_WAIT_TIME}).then((div) => {
  //   const text = div.text().replace('2 pièces', '').split('€')[0].replace(/,| /gi, '');
  //   const number = parseInt(text)/SurfaceF2;
  //   const division = BUDGET/number ;
  //   cy.get(ResultatSurfaceLocation, {timeout: SHORT_WAIT_TIME}).should('have.text', division.toLocaleString());
  // })
})

When("je saisis la surface de {int} m² pour un achat", function (surface) {
  SURFACE = surface;
  cy.get(champSaisieSurfaceAchat, {timeout: SHORT_WAIT_TIME}).type(surface);
  cy.wait(500);
})

Then("le prix que le logement va me coûter s'affiche", function () {
  cy.contains("Votre logement va vous coûter", { timeout: SHORT_WAIT_TIME }).should('exist');
  cy.get(donneePrixUniteSurfaceAchat, {timeout: SHORT_WAIT_TIME}).then((div) => {
    const text = div.text().split('€')[0].replace(/,| /gi, '');
    const number = parseInt(text);
    const produit = number*SURFACE;
    cy.get(ResultatPrixAchat, {timeout: SHORT_WAIT_TIME}).should('have.text', produit.toLocaleString());
  })
})
