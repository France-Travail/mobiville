const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../common/common";
import { METIER } from "../../../support/step_definitions/formulaire-recherche";

const fil = "nav > div > a";
const resultatsVilles = "main[id=main] > div > h1";
const VillesSimilairesProches = "main[id=main] * div > p";
const nombreVillesSimilaires = "main[id=main] > div > div:nth-child(2)> div";
const nombreVillesProches = "main[id=main] > div > div:nth-child(3)> div";
const premiereVilleSimilaireProche = "a[href*=city]:nth-child(1)";
const rappelCritereMetier = "main[id=main] * > div > h1";
const rappelCritereMetierRegion = "main[id=main] * > div > h1";
const boutonvoirtToutesVilles  =  "main[id=main] * > div > a[href*=cities]";

And("je clique sur le lien {string}", function (lien) {
  cy.contains(fil, lien, { timeout: SHORT_WAIT_TIME }).click();
})  

Then("j'affiche les villes similaires et les villes à proximité", function () {
  cy.contains(resultatsVilles, "Elargir votre zone géographique",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(VillesSimilairesProches, "Villes similaires",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(VillesSimilairesProches, "Villes à proximité",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.wait(SHORT_WAIT_TIME);
  cy.contains(nombreVillesSimilaires, "offres", {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 6);
  cy.contains(nombreVillesProches, "offres", {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 6);
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

When("je clique sur une ville similaire/proche", function () {
  cy.wait(SHORT_WAIT_TIME);
  cy.contains(premiereVilleSimilaireProche, " offres", {timeout: SHORT_WAIT_TIME}).click();
})

Then("j'affiche la page de la ville similaire/proche pour le métier", function () {
let metierCourt = METIER.split(' (')[0].toLowerCase();
cy.wait(1000);
cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le bouton {string}", function (nomBouton) {
  cy.contains(boutonvoirtToutesVilles, nomBouton,  {timeout: SHORT_WAIT_TIME}).click();
})

Then("j'affiche la page de résultats avec une à plusieurs villes similaires/proches", function () {
  let metierCourt = METIER.split(' (')[0];
  cy.wait(1000);
  cy.contains(rappelCritereMetierRegion, "pour " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
})