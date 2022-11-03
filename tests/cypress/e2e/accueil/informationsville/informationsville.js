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