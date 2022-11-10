const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../common/common";
import { METIER, ENDROIT } from '../../../support/step_definitions/formulaire-recherche';

const rappelCritereMetier = "main[id=main] * > div > h1";
const rappelCritereVille = "main[id=main] * > div > h1";
const infoHabitants = "main[id=main] * > div > p";
const infoSuperficie = "main[id=main] * > div > p";
const infoTemperature = "main[id=main] * > div > p";
const infoServices = "main[id=main] > div > h2";
const infoTransport = "main[id=main] * > div > p";
const infoEducation = "main[id=main] * > div > p";
const infoSante = "main[id=main] * > div > p";
const infoCultureLoisirs = "main[id=main] * > div > p";
const infosElus = "main[id=main] * > div > p";
const boutonContacter = "main[id=main] > div > a";
const resultatOffre = "main[id=main] * > div > h2";
const commentaireOffre = "main[id=main] * > div > p";
const nombreOffres = "main[id=main] > div:nth-child(6) > div";
const boutonVoirToutesOffres =  "main[id=main] > div > a";
const resultatEntreprise = "main[id=main] * > div > h2";
const aidesVille = "main[id=main] * > div > h2";
const nombreAides = "main[id=main] > div:nth-child(12) > div:nth-child(1) > div";
const premiereAide = "a[href*=aide-pour-la-recherche-demploi]";
const deuxiemeAide = "a[href*=subvention-mobili-pass]";
const troisiemeAide = "a[href*=garantie-visale]";
const voirPremiereAide = "main[id=main] > div:nth-child(12) > div:nth-child(1) > div > a:nth-child(1) > div > p";
const boutonVoirToutesAides = "main[id=main] * > div > a";
const servicesVille = "main[id=main] * > div > p";
const boutonVoirTousServices  =  "main[id=main] * > div > a";
const nombreBlocsEntreprises = "main[id=main] > div:nth-child(9) > div > div:nth-child(2)";

Then("j'affiche les offres d'emploi de la ville pour le métier", function () {
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.url().should('include', 'job');
  cy.contains(rappelCritereMetier, " offres pour " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les services de la ville", function () {
  let villeSansCP = ENDROIT.split(' (')[0];
  cy.url().should('include', 'life');
  cy.contains(rappelCritereVille, "Vivre à " + villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations correspondantes des services de la ville", function () {
  cy.contains(infoHabitants, "Habitants", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoSuperficie, "Superficie", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoTemperature, "Température moyenne", {timeout: SHORT_WAIT_TIME}).should('exist');

  cy.contains(infoServices, "Les services", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoTransport, "Transport", {timeout: SHORT_WAIT_TIME}).should('exist');  
  cy.contains(infoEducation, "Education", {timeout: SHORT_WAIT_TIME}).should('exist');  
  cy.contains(infoSante, "Santé", {timeout: SHORT_WAIT_TIME}).should('exist');  
  cy.contains(infoCultureLoisirs, "Culture & loisirs", {timeout: SHORT_WAIT_TIME}).should('exist');  
})

Then("j'affiche le message aux élus locaux", function () {
  cy.contains(infosElus, "Vous êtes élus, élues locaux ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(boutonContacter, "Nous contacter", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les offres d'emploi qui ont le moins de candidature", function () {
  cy.contains(resultatOffre, "Les offres d'emploi avec plus d'opportunités", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(commentaireOffre, "Offres de plus de 15 jours, comptant moins de 4 candidatures", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(nombreOffres, {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 3);
})

When("je clique sur Voir toutes les offres d’emploi", function () {
  cy.contains(boutonVoirToutesOffres, "Voir toutes les offres d’emploi", {timeout: SHORT_WAIT_TIME}).click();
})

Then("j'affiche la liste des entreprises à proximité", function () {
  cy.contains(resultatEntreprise, "Les entreprises qui recrutent à proximité", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(nombreBlocsEntreprises, {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 2);
})

Then("j'affiche les trois aides pour m'accompagner dans mon projet", function () {
  cy.contains(aidesVille, "Les aides pour vous accompagner dans votre projet", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(nombreAides, {timeout: SHORT_WAIT_TIME}).children().should('have.length', 3);
  cy.get(premiereAide, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(deuxiemeAide, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(troisiemeAide, {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le premier des trois liens Découvrir l'aide", function () {
  cy.contains(voirPremiereAide, "Découvrir l'aide", {timeout: MIDDLE_WAIT_TIME}).click({ force: true });
})

When("je clique sur Voir tous les aides", function () {
  cy.contains(boutonVoirToutesAides, "Voir toutes les aides", {timeout: SHORT_WAIT_TIME}).click();
})

Then("j'affiche la découverte des services de la ville", function () {
  cy.contains(servicesVille, "Découvrez les services de la ville", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur Voir tous les services", function () {
  cy.contains(boutonVoirTousServices, "Voir tous les services", {timeout: SHORT_WAIT_TIME}).click();
})