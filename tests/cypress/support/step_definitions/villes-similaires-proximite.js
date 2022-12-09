const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";

const resultatsVilles = "main[id=main] > div[tag-page$=city-villes-similaires] > div > h1";
const VillesSimilairesProches = "main[id=main] > div[tag-page$=city-villes-similaires] > div > div > p";
const nombreVillesSimilaires = "main[id=main] > div[tag-page$=city-villes-similaires] > div > div:nth-child(2) > div";
const nombreVillesProches = "main[id=main] > div[tag-page$=city-villes-similaires] > div > div:nth-child(3) > div";
const premiereVilleSimilaireProche = "main[id=main] > div[tag-page$=city-villes-similaires] > div > div:nth-child(2) > div > a[href*=ville]:nth-child(1)";
const boutonvoirtToutesVilles  =  "main[id=main] * > div > a[href*=villes]";

Then("j'affiche les villes similaires et les villes à proximité", function () {
  cy.url().should('include', 'villes-proches');

  cy.contains(resultatsVilles, "Elargir votre zone géographique",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(VillesSimilairesProches, "Villes similaires",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(VillesSimilairesProches, "Villes à proximité",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.wait(SHORT_WAIT_TIME);
  cy.contains(nombreVillesSimilaires, "offres", {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 6);
  cy.contains(nombreVillesProches, "offres", {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 6);
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

When("je clique sur une ville similaire/proche", function () {
  cy.wait(SHORT_WAIT_TIME);
  cy.contains(premiereVilleSimilaireProche, "offres", {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(2000);
})

When("je clique sur le bouton {string}", function (nomBouton) {
  cy.contains(boutonvoirtToutesVilles, nomBouton,  {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(1000);
})