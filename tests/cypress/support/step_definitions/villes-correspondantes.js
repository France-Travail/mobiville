const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../../e2e/accueil/common/common";
import { METIER, ENDROIT } from "./formulaire-recherche";

const rappelCritereMetierRegion = "main[id=main] * > div > h1";
const resultatsRechercheVille = "main[id=main] * > div > h2";
const InfosPremiereVille = "a[data-automation-id^=cityItem-][href*=city]:nth-child(2) * > div";

Then("j'affiche la page de résultats avec une à plusieurs villes correspondantes", function () {
  let metierCourt = METIER.split(' (')[0];
  cy.contains(rappelCritereMetierRegion, "villes pour " + metierCourt + " en " + ENDROIT,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(resultatsRechercheVille, "Classement des villes par opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations sur le métier dans la page des villes correspondantes", function () {
  cy.contains(InfosPremiereVille, "Opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(InfosPremiereVille, " habitants",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(InfosPremiereVille, " offres d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})