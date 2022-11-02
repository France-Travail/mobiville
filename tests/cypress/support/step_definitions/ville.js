const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../../e2e/accueil/common/common";
import { METIER, ENDROIT } from "./formulaire-recherche";

const rappelCritereVille = "main[id=main] * > div > h1";
const rappelCritereMetier = "main[id=main] * > div > h1";
const infoOpportunites = "main[id=main] * > div > p";
const infoOffres = "main[id=main] * > div > p";
const infoEntreprises = "main[id=main] * > div > p";
// const infoTauxEmbauche = "main[id=main] * > div > p";
const resultatOffre = "main[id=main] * > div > h2";
const nombreOffres = "main[id=main] > div:nth-child(5) > div";
const boutonVoirToutesOffres =  "main[id=main] > div > a";
const resultatEntreprise = "main[id=main] * > div > h2";
const servicesVille = "main[id=main] * > div > p";
const boutonVoirTousServices  =  "main[id=main] * > div > a";

Then("j'affiche la page de la ville pour le métier", function () {
  let villeSansCP = ENDROIT.split(' (')[0];
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereVille, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations correspondantes de la ville", function () {
  cy.contains(infoOpportunites, "Opportunités d'emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoOffres, "Offres d'emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoEntreprises, "Entreprises", {timeout: SHORT_WAIT_TIME}).should('exist');
  // cy.contains(infoTauxEmbauche, "Taux d'embauche", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les offres d'emploi qui ont le moins de candidature", function () {
  cy.contains(resultatOffre, "Les offres d'emploi avec plus d'opportunités", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(nombreOffres, {timeout: SHORT_WAIT_TIME}).children().should('have.length', 3);
})

When("je clique sur Voir toutes les offres d’emploi", function () {
  cy.contains(boutonVoirToutesOffres, "Voir toutes les offres d’emploi", {timeout: SHORT_WAIT_TIME}).click();
})

Then("j'affiche la liste des entreprises à proximité", function () {
  cy.contains(resultatEntreprise, "Les entreprises qui recrutent à proximité", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche la découverte des services de la ville", function () {
  cy.contains(servicesVille, "Découvrez les services de la ville", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur Voir tous les services", function () {
  cy.contains(boutonVoirTousServices, "Voir tous les services", {timeout: SHORT_WAIT_TIME}).click();
})