const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../common/common";
import { METIER, ENDROIT } from "../../../support/step_definitions/formulaire-recherche";
import { champSaisieMetier, champSaisieEndroit, boutoncritere1, boutoncritere2, boutoncritere3 } from "../../../support/step_definitions/formulaire-recherche";

const rappelCritereMetierRegion = "main[id=main] * > div > h1";
const resultatsRechercheVille = "main[id=main] * > div > h2";
const PremiereVille = "main[id=main] * > a[href*=city]:nth-child(2) * > div"; 
const rappelCritereVille = "main[id=main] * > div > h1";
const rappelCritereMetier = "main[id=main] * > div > h1 > span";
const resultatVille = "main[id=main] * > ul > li > div";
const resultatsRechercheAide = "main[id=main] > div > h1";

Then("j'affiche les filtres aide", function () {
  cy.get(boutoncritere1, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere2, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere3, {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les filtres métier endroit", function () {
  cy.get(champSaisieMetier, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche la page de résultats avec une à plusieurs villes correspondantes", function () {
  let metierCourt = METIER.split(' (')[0];
  cy.contains(rappelCritereMetierRegion, "villes pour " + metierCourt + " en " + ENDROIT,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(resultatsRechercheVille, "Classement des villes par opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations sur le métier dans la page des villes correspondantes", function () {
  cy.contains(PremiereVille, "Opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(PremiereVille, " habitants",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(PremiereVille, " offres d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche la page de la ville pour le métier", function () {
  let villeSansCP = ENDROIT.split(' (')[0];
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereVille, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(resultatVille, "Offres d’emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les aides correspondantes", function () {
  cy.contains(resultatsRechercheAide, "aides disponibles pour votre situation", {timeout: SHORT_WAIT_TIME}).should('exist');
})